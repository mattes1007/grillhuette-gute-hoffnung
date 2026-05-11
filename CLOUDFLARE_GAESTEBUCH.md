# Cloudflare-Gästebuch vorbereiten

Diese Version enthält bereits eine vorbereitete Cloudflare Pages Function unter:

```txt
functions/api/guestbook.js
```

Und das Datenbank-Schema für Cloudflare D1 unter:

```txt
db/schema.sql
```

## Idee

- `GET /api/guestbook` zeigt nur freigegebene Einträge.
- `POST /api/guestbook` speichert neue Einträge mit `approved = 0`.
- Erst nach Freigabe werden Einträge öffentlich sichtbar.

## Später in Cloudflare nötig

1. Cloudflare Pages Projekt erstellen.
2. D1 Datenbank erstellen.
3. Binding-Name setzen: `GUESTBOOK_DB`.
4. `db/schema.sql` in der D1 Datenbank ausführen.
5. Frontend von Demo/localStorage auf `/api/guestbook` umstellen.

Bis dahin läuft die Seite vollständig statisch und lokal testbar.
