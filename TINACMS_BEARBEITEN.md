# TinaCMS benutzen

Diese Version hat TinaCMS eingebaut. Damit kannst du Inhalte über eine Admin-Oberfläche bearbeiten, ohne in `app/page.tsx` zu suchen.

## Lokal starten

```bash
cd "/pfad/zum/grillhuette-gute-hoffnung"
rm -f package-lock.json
npm install
npm run dev
```

Dann öffnen:

```txt
http://localhost:3000/admin/index.html
```

In TinaCMS gehst du zu:

```txt
Website Inhalte → site
```

Dort kannst du bearbeiten:

- Grunddaten und Kontakt
- Navigation
- Hero-Kennzahlen
- Erlebnis-Karten
- Ausstattung
- Galerie
- Anfrage-Ablauf
- Gästebuch-Beispiele
- FAQ

Beim Speichern schreibt TinaCMS direkt in:

```txt
content/site.json
```

Die Webseite selbst bleibt optisch gleich, weil das Design weiterhin im Code geschützt ist.

## Normale Webseite öffnen

```txt
http://localhost:3000
```

## Nur Next.js ohne Tina starten

Falls du nur schnell die Webseite starten willst:

```bash
npm run dev:next
```

Dann ist der Admin-Editor aber nicht aktiv.

## Online mit Cloudflare Pages

Damit `/admin/index.html` auch online gebaut wird, muss Cloudflare diesen Build-Befehl nutzen:

```txt
npm run build
```

Output-Verzeichnis bleibt:

```txt
out
```

Nicht mehr `npx next build` verwenden, wenn der Tina-Admin online verfügbar sein soll.

## TinaCloud später aktivieren

Für echtes Online-Bearbeiten im Browser brauchst du später ein TinaCloud-Projekt und diese Environment Variables in Cloudflare:

```txt
NEXT_PUBLIC_TINA_CLIENT_ID
TINA_TOKEN
NEXT_PUBLIC_TINA_BRANCH=main
```

Lokal funktioniert TinaCMS ohne Login im Local Mode. Online braucht TinaCloud die GitHub-Verbindung, damit Änderungen als Commit im Repository gespeichert werden.
