# START HIER – Grillhütte Gute Hoffnung Premium

## Lokal testen

```bash
cd "/home/mattes/Dokumente/Webseite Grillhütte/grillhuette-gute-hoffnung"
npm install
npm run dev
```

Dann im Browser öffnen:

```txt
http://localhost:3000
```

## Produktions-Build testen

```bash
npm run build
```

Der statische Export landet im Ordner:

```txt
out/
```

## Änderungen später hochladen

```bash
git status
git add .
git commit -m "Webseite aktualisiert"
git push
```

## Was ist neu?

- komplett überarbeitete Premium-Mobile-Startseite
- große Hero-Sektion mit moderner Typografie
- bessere Anfrage-UX mit Pflichtfeld-Logik und Fortschrittsanzeige
- neue Erlebnis-, Galerie-, Ausstattung- und Kontaktbereiche
- Gästebuch-Oberfläche als Demo, vorbereitet für Cloudflare D1
- WebP-Versionen der Bilder ergänzt
- Cloudflare Pages Function vorbereitet unter `functions/api/guestbook.js`
- D1-Datenbank-Schema unter `db/schema.sql`

## Gästebuch

Aktuell ist das Gästebuch eine lokale Demo. Einträge werden nur im Browser gespeichert.
Für live/öffentlich siehe:

```txt
CLOUDFLARE_GAESTEBUCH.md
```
