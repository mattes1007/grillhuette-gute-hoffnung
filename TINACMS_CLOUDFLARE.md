# Cloudflare Pages mit TinaCMS

## Build-Einstellungen

In Cloudflare Pages unter Settings → Builds & deployments:

```txt
Build command: npm run build
Build output directory: out
Root directory: /
```

Der bisherige Befehl `npx next build` baut nur die Webseite. `npm run build` baut zuerst TinaCMS und danach Next.js.

## Environment Variables für TinaCloud

Für den Online-Editor später unter Settings → Environment variables eintragen:

```txt
NEXT_PUBLIC_TINA_CLIENT_ID=aus TinaCloud
TINA_TOKEN=aus TinaCloud
NEXT_PUBLIC_TINA_BRANCH=main
```

Danach ein neues Deployment starten.

## Lokal testen

```bash
npm run dev
```

Editor:

```txt
http://localhost:3000/admin/index.html
```

Webseite:

```txt
http://localhost:3000
```
