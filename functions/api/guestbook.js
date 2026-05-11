// Cloudflare Pages Function: /api/guestbook
// Vorbereitung für ein echtes moderiertes Gästebuch mit Cloudflare D1.
// Zum Aktivieren in Cloudflare Pages eine D1-Datenbank als Binding GUESTBOOK_DB verbinden
// und die Tabelle aus db/schema.sql anlegen.

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...(init.headers || {}),
    },
  });
}

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

export async function onRequestGet({ env }) {
  if (!env.GUESTBOOK_DB) {
    return json({ entries: [], mode: 'demo', message: 'D1 Binding GUESTBOOK_DB fehlt noch.' });
  }

  const { results } = await env.GUESTBOOK_DB.prepare(
    `SELECT id, name, message, created_at AS date
     FROM guestbook_entries
     WHERE approved = 1
     ORDER BY created_at DESC
     LIMIT 24`
  ).all();

  return json({ entries: results || [], mode: 'live' });
}

export async function onRequestPost({ request, env }) {
  if (!env.GUESTBOOK_DB) {
    return json({ ok: false, message: 'D1 Binding GUESTBOOK_DB fehlt noch.' }, { status: 501 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const name = clean(body.name, 60);
  const message = clean(body.message, 280);

  if (name.length < 2 || message.length < 8) {
    return json({ ok: false, message: 'Name oder Nachricht ist zu kurz.' }, { status: 400 });
  }

  await env.GUESTBOOK_DB.prepare(
    `INSERT INTO guestbook_entries (name, message, approved, created_at)
     VALUES (?, ?, 0, datetime('now'))`
  ).bind(name, message).run();

  return json({ ok: true, message: 'Danke! Dein Eintrag wartet auf Freigabe.' });
}
