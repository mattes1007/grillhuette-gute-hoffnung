# Grillhütte Gute Hoffnung Münster – Premium-Version

Next.js-Webseite für die Grillhütte Gute Hoffnung Münster.

## Befehle

```bash
npm install
npm run dev
npm run build
```

Lokal im Browser:

```txt
http://localhost:3000
```

## Deployment

Das Projekt nutzt `output: 'export'` in `next.config.mjs` und ist damit für statisches Hosting geeignet.

Empfehlung:

- Code bei GitHub speichern
- Cloudflare Pages mit GitHub verbinden
- Build command: `npm run build`
- Output directory: `out`

## Gästebuch

Die Oberfläche ist vorbereitet. Aktuell läuft sie als lokale Demo.
Für eine echte Live-Version ist vorbereitet:

- `functions/api/guestbook.js`
- `db/schema.sql`
- `CLOUDFLARE_GAESTEBUCH.md`

Live-Idee: Cloudflare Pages Functions + D1 + moderierte Freigabe.
