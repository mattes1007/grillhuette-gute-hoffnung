function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function cleanText(value, maxLength) {
  return String(value || '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function getBearerToken(request) {
  const auth = request.headers.get('authorization') || '';
  if (auth.toLowerCase().startsWith('bearer ')) return auth.slice(7).trim();
  return request.headers.get('x-admin-token') || '';
}

function requireAdmin(request, env) {
  const expected = env.GUESTBOOK_ADMIN_TOKEN;
  const provided = getBearerToken(request);

  if (!expected) {
    return { ok: false, response: json({ error: 'GUESTBOOK_ADMIN_TOKEN fehlt in Cloudflare.' }, 500) };
  }

  if (!provided || provided !== expected) {
    return { ok: false, response: json({ error: 'Nicht berechtigt.' }, 401) };
  }

  return { ok: true };
}

function normalizeEntry(entry) {
  return {
    id: entry.id,
    name: entry.name,
    message: entry.message,
    date: entry.created_at || entry.date,
    approved: Number(entry.approved) === 1,
    status: Number(entry.approved) === 1 ? 'approved' : 'pending',
  };
}

async function ensureDb(env) {
  if (!env.DB) {
    return json({ error: 'D1 binding DB fehlt.' }, 500);
  }
  return null;
}

export async function onRequestGet({ request, env }) {
  const dbError = await ensureDb(env);
  if (dbError) return dbError;

  const url = new URL(request.url);
  const isAdmin = url.searchParams.get('admin') === '1';

  if (isAdmin) {
    const admin = requireAdmin(request, env);
    if (!admin.ok) return admin.response;

    const { results } = await env.DB.prepare(
      `SELECT id, name, message, approved, created_at
       FROM guestbook_entries
       ORDER BY approved ASC, created_at DESC
       LIMIT 200`
    ).all();

    const entries = (results || []).map(normalizeEntry);

    return json({
      entries,
      pendingCount: entries.filter((entry) => !entry.approved).length,
      approvedCount: entries.filter((entry) => entry.approved).length,
    });
  }

  const { results } = await env.DB.prepare(
    `SELECT id, name, message, approved, created_at
     FROM guestbook_entries
     WHERE approved = 1
     ORDER BY created_at DESC
     LIMIT 50`
  ).all();

  return json({ entries: (results || []).map(normalizeEntry) });
}

export async function onRequestPost({ request, env }) {
  const dbError = await ensureDb(env);
  if (dbError) return dbError;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }

  // Honeypot gegen einfache Spam-Bots: echte Besucher sehen dieses Feld nicht.
  if (cleanText(body.website, 200)) {
    return json({ ok: true, entry: null });
  }

  const name = cleanText(body.name, 60);
  const message = cleanText(body.message, 800);

  if (name.length < 2 || message.length < 5) {
    return json({ error: 'Bitte Name und Nachricht ausfüllen.' }, 400);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO guestbook_entries (id, name, message, approved, created_at)
     VALUES (?, ?, ?, 0, ?)`
  )
    .bind(id, name, message, createdAt)
    .run();

  return json({
    ok: true,
    entry: {
      id,
      name,
      message,
      date: createdAt,
      approved: false,
      status: 'pending',
    },
  }, 201);
}

export async function onRequestPatch({ request, env }) {
  const dbError = await ensureDb(env);
  if (dbError) return dbError;

  const admin = requireAdmin(request, env);
  if (!admin.ok) return admin.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }

  const id = cleanText(body.id, 80);
  const approved = body.approved ? 1 : 0;

  if (!id) return json({ error: 'ID fehlt.' }, 400);

  const result = await env.DB.prepare(
    `UPDATE guestbook_entries
     SET approved = ?
     WHERE id = ?`
  )
    .bind(approved, id)
    .run();

  if (!result.success) return json({ error: 'Eintrag konnte nicht aktualisiert werden.' }, 500);

  return json({ ok: true, id, approved: Boolean(approved) });
}

export async function onRequestDelete({ request, env }) {
  const dbError = await ensureDb(env);
  if (dbError) return dbError;

  const admin = requireAdmin(request, env);
  if (!admin.ok) return admin.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }

  const id = cleanText(body.id, 80);
  if (!id) return json({ error: 'ID fehlt.' }, 400);

  const result = await env.DB.prepare(`DELETE FROM guestbook_entries WHERE id = ?`).bind(id).run();
  if (!result.success) return json({ error: 'Eintrag konnte nicht gelöscht werden.' }, 500);

  return json({ ok: true, id });
}
