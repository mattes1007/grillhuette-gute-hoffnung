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

export async function onRequestGet({ env }) {
  if (!env.DB) {
    return json({ entries: [], error: 'D1 binding DB fehlt.' }, 500);
  }

  const { results } = await env.DB.prepare(
    `SELECT id, name, message, created_at AS date
     FROM guestbook_entries
     WHERE approved = 1
     ORDER BY created_at DESC
     LIMIT 50`
  ).all();

  return json({
    entries: (results || []).map((entry) => ({
      id: entry.id,
      name: entry.name,
      message: entry.message,
      date: entry.date,
      status: 'approved',
    })),
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) {
    return json({ error: 'D1 binding DB fehlt.' }, 500);
  }

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

  if (name.length < 2) {
    return json({ error: 'Bitte einen Namen angeben.' }, 400);
  }

  if (message.length < 4) {
    return json({ error: 'Bitte eine Nachricht eingeben.' }, 400);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO guestbook_entries (id, name, message, approved, created_at)
     VALUES (?, ?, ?, 0, ?)`
  ).bind(id, name, message, createdAt).run();

  return json({
    ok: true,
    entry: {
      id,
      name,
      message,
      date: createdAt,
      status: 'pending',
    },
  }, 201);
}
