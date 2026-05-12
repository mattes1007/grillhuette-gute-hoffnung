# Upgrade: Alles in TinaCMS editierbar

Dieses Paket macht die sichtbaren Inhalte der Webseite in TinaCMS editierbar:

- Startbereich / Hero
- Buttons und kurze UI-Texte
- Abschnittsüberschriften
- Erlebnis-Karten
- Galerie
- Ausstattung
- Anfahrt / Google Maps
- Kalender- und Anfrageformular-Texte
- Gästebuch-Oberfläche
- FAQ
- Kontaktbereich
- Footer
- SEO-Texte
- Impressum und Datenschutz-Platzhalter

## Installation im bestehenden Projekt

Im Projektordner ausführen:

```bash
cp content/site.json content/site.json.backup
unzip -o ~/Downloads/grillhuette-gute-hoffnung-all-tina-upgrade.zip
python3 scripts/merge-all-tina-content.py
rm -rf node_modules package-lock.json
npm install --no-audit --no-fund
npm run dev
```

Danach öffnen:

```txt
http://localhost:3000
http://localhost:3000/admin/index.html
```

## Google Maps eintragen

In TinaCMS:

```txt
Website Inhalte → site → Anfahrt / Google Maps
```

Dort kannst du eintragen:

- Adresse
- Parkhinweis
- Zufahrtshinweis
- Google Maps Link
- Google Maps Embed src

Für den Embed-Link in Google Maps:

```txt
Teilen → Karte einbetten → HTML kopieren
```

Aus dem HTML nur den Wert aus `src="..."` übernehmen.

## Hochladen

Wenn lokal alles läuft:

```bash
git add .
git commit -m "Alle Inhalte in TinaCMS editierbar machen"
git push
```
