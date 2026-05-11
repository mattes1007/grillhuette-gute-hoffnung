# TinaCMS – nächster Ausbauschritt

Diese Datei beschreibt, was als Nächstes eingebaut wird, sobald GitHub/Cloudflare steht.

## Ziel

- `/admin/index.html` als Bearbeitungsoberfläche
- Inhalte aus `content/site.json` bearbeiten
- Änderungen als Git-Commit speichern
- Cloudflare Pages deployed danach automatisch neu

## Geplante CMS-Felder

- Allgemein: Name, Standort, Preis, Kontakt
- Hero: Claim, Subclaim, Hero-Fakten
- Erlebnis: Karten mit Titel und Text
- Ausstattung: Icon, Titel, Text
- Galerie: Bild, Alt-Text, Titel, Beschreibung
- Anfrage: Texte, Kalender-Link, Kontaktwege
- Gästebuch: Beispieltexte; echtes Live-Gästebuch später über Cloudflare D1
- FAQ: Fragen und Antworten

## Grobe technische Schritte

```bash
npm install tinacms @tinacms/cli
npx @tinacms/cli init
```

Danach wird eine `tina/config.ts` angelegt, die genau die Felder aus `content/site.json` als CMS-Formular beschreibt.

Für Produktion werden danach GitHub/Tina-Zugangsdaten als Umgebungsvariablen in Cloudflare Pages gesetzt.
