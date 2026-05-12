# Gästebuch mit Cloudflare D1 aktivieren

Dieses Paket ersetzt das bisherige lokale Demo-Gästebuch durch ein echtes, moderiertes Gästebuch über Cloudflare Pages Functions + Cloudflare D1.

## Dateien kopieren

- `page.tsx` nach `app/page.tsx`
- `globals.css` nach `app/globals.css`
- Ordner `functions/` ins Projekt-Hauptverzeichnis
- Ordner `db/` ins Projekt-Hauptverzeichnis

## D1 Datenbank anlegen

Cloudflare Dashboard:

`Storage & Databases` → `D1 SQL Database` → `Create database`

Name zum Beispiel:

`grillhuette-guestbook`

Danach in der Datenbank unter `Console` den Inhalt aus `db/schema.sql` ausführen.

## D1 mit Pages verbinden

Cloudflare Dashboard:

`Workers & Pages` → `grillhuette-gute-hoffnung` → `Settings` → `Functions` → `D1 database bindings`

Binding hinzufügen:

- Variable name: `DB`
- D1 database: `grillhuette-guestbook`

Danach neu deployen.

## Neue Einträge freigeben

Neue Gästebuch-Einträge sind nach dem Absenden nicht sofort öffentlich. Sie haben `approved = 0`.

Offene Einträge anzeigen:

```sql
SELECT id, name, message, created_at
FROM guestbook_entries
WHERE approved = 0
ORDER BY created_at DESC;
```

Eintrag freigeben:

```sql
UPDATE guestbook_entries
SET approved = 1
WHERE id = 'HIER-DIE-ID-EINFUEGEN';
```

Eintrag löschen:

```sql
DELETE FROM guestbook_entries
WHERE id = 'HIER-DIE-ID-EINFUEGEN';
```

## Lokal testen

Mit normalem `npm run dev` läuft die Seite lokal weiter. Die Cloudflare-Funktion ist lokal dabei noch nicht aktiv; das Formular zeigt dann eine lokale Vormerkung. Online auf Cloudflare speichert es in D1.

Für echten lokalen Function-Test kann später Wrangler genutzt werden, ist für den Start aber nicht nötig.
