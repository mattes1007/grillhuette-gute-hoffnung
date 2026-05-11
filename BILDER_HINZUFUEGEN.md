# Bilder zur Galerie hinzufügen

1. Bilder in diesen Ordner kopieren:

```txt
public/gallery/
```

2. `lib/site.ts` öffnen.

3. Bei `galleryImages` einen neuen Block ergänzen:

```ts
{
  src: '/gallery/mein-bild.jpg',
  title: 'Mein Bildtitel',
  alt: 'Kurze Beschreibung des Bildes',
  text: 'Kurzer Text für die Galerie.',
},
```

4. Falls `npm run dev` läuft, Browser hart neu laden:

```txt
Strg + F5
```

## Wichtig bei Linux

Groß- und Kleinschreibung zählt:

```txt
seilbahn1.jpg
```

ist nicht dasselbe wie:

```txt
seilbahn1.JPG
```
