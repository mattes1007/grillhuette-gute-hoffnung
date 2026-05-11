# Inhalte bequem bearbeiten – ohne im Code zu suchen

Diese Version ist für ein CMS vorbereitet: Alle normalen Website-Inhalte liegen zentral in:

```txt
content/site.json
```

Das Design bleibt weiterhin im Code geschützt. Dadurch kann man Texte und Bilder ändern, ohne das mobile Layout, Abstände, Farben oder Animationen versehentlich kaputtzumachen.

## Was editierbar ist

- Name, Standort, Preis, Telefon, E-Mail, WhatsApp
- Hauptüberschrift und Beschreibung
- Fakten-Karten im Hero-Bereich
- Erlebnis-Texte
- Ausstattung
- Galerie-Bilder und Bildtexte
- Anfrage-Schritte
- Beispiel-Gästebucheinträge
- FAQ-Fragen und Antworten
- Kontaktzeiten
- Google-Kalender-Link

## Nächster Schritt: TinaCMS anschließen

Für echtes WYSIWYG-/CMS-Bearbeiten wird TinaCMS angebunden. Dann öffnest du später z. B.:

```txt
https://deine-domain.de/admin/index.html
```

Dort kannst du Inhalte in einer Oberfläche bearbeiten. Tina speichert Änderungen dann in GitHub; Cloudflare Pages baut die Seite automatisch neu.

## Warum nicht komplett freies Drag-and-drop?

Bei einer mobilen Premium-Seite ist komplett freies Drag-and-drop gefährlich: Man kann schnell Abstände, Lesbarkeit oder Handy-Layout zerstören.

Besser ist:

```txt
Design geschützt im Code
Inhalte bequem im CMS
```

So bleibt die Seite immer hochwertig und mobil sauber.
