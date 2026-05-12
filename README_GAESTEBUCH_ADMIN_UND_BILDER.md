# Upgrade: Gästebuch-Admin + Bildoptimierung

Dieses Paket enthält komplette fertige Dateien für:

- echtes moderiertes Gästebuch über Cloudflare D1
- Admin-Seite `/admin/gaestebuch` mit Freigeben/Löschen-Buttons
- Bildoptimierungs-Script gegen extrem große Galerie-Bilder
- Google-Kalender bleibt im Website-Style gerahmt

## Dateien kopieren

Im Projektordner:

```bash
cd "/home/mattes/Downloads/grillhuette-gute-hoffnung-premium-cms-ready"

cp app/page.tsx app/page.tsx.backup-before-guestbook-admin
cp app/globals.css app/globals.css.backup-before-guestbook-admin

cp -r ~/Downloads/grillhuette-guestbook-admin-final/app/* app/
cp -r ~/Downloads/grillhuette-guestbook-admin-final/functions .
cp -r ~/Downloads/grillhuette-guestbook-admin-final/db .
cp -r ~/Downloads/grillhuette-guestbook-admin-final/scripts .
```

Wenn du die ZIP direkt entpackst:

```bash
unzip -o ~/Downloads/grillhuette-guestbook-admin-final.zip
```

## Lokal testen

```bash
npm run dev
```

Website:

```txt
http://localhost:3000
```

Admin-Seite:

```txt
http://localhost:3000/admin/gaestebuch
```

Lokal kann die Admin-Seite die Cloudflare-D1-Daten noch nicht laden. Das funktioniert nach dem Deployment auf Cloudflare.

## Cloudflare einrichten

### 1. D1-Datenbank

Cloudflare Dashboard:

`Storage & Databases` → `D1 SQL Database` → `Create database`

Name zum Beispiel:

```txt
grillhuette-guestbook
```

Dann in der D1-Konsole den Inhalt ausführen aus:

```txt
db/schema.sql
```

### 2. D1-Binding im Pages-Projekt

Cloudflare Dashboard:

`Workers & Pages` → `grillhuette-gute-hoffnung` → `Settings` → `Bindings`

D1-Binding hinzufügen:

```txt
Variable name: DB
D1 database: grillhuette-guestbook
```

### 3. Admin-Token setzen

Cloudflare Dashboard:

`Workers & Pages` → `grillhuette-gute-hoffnung` → `Settings` → `Variables`

Variable hinzufügen:

```txt
GUESTBOOK_ADMIN_TOKEN
```

Als Wert nimmst du ein langes Passwort, z. B. mindestens 32 Zeichen.

Danach neu deployen.

## Neu deployen

Nach Dateiänderungen lokal:

```bash
git add .
git commit -m "Gaestebuch Admin und Bildoptimierung"
git push
```

Cloudflare deployed automatisch.

Wenn du nur Cloudflare-Einstellungen geändert hast:

`Workers & Pages` → Projekt → `Deployments` → letztes Deployment → `Retry deployment`

## Gästebuch freigeben

Nach dem Deployment:

```txt
https://DEINE-SEITE.pages.dev/admin/gaestebuch
```

Dort Admin-Token einfügen und speichern.

Dann kannst du:

- neue Einträge sehen
- Einträge freigeben
- Einträge löschen
- freigegebene Einträge wieder zurückziehen

## Bilder optimieren

Deine Bilder sind aktuell viel zu groß. 40 MB pro Bild ist für eine Website extrem langsam.

Installieren:

```bash
sudo apt update
sudo apt install imagemagick
```

Dann im Projektordner:

```bash
python3 scripts/optimize-site-images.py
```

Das Script:

- erstellt WebP-Dateien mit maximal 1920 px
- nutzt Qualität 78
- schreibt `content/site.json` automatisch auf die optimierten Dateien um
- erstellt vorher ein Backup

Danach testen:

```bash
npm run dev
```

Dann hochladen:

```bash
git add .
git commit -m "Bilder fuer Web optimieren"
git push
```
