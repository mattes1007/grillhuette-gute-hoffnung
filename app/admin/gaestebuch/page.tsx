'use client';

import { useEffect, useMemo, useState } from 'react';

type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  date: string;
  approved: boolean;
  status?: 'approved' | 'pending';
};

const tokenStorageKey = 'grillhuette-guestbook-admin-token';
const apiPath = '/api/guestbook';

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function GuestbookAdminPage() {
  const [token, setToken] = useState('');
  const [savedToken, setSavedToken] = useState('');
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(tokenStorageKey) || '';
    setToken(stored);
    setSavedToken(stored);
  }, []);

  const pendingEntries = useMemo(() => entries.filter((entry) => !entry.approved), [entries]);
  const approvedEntries = useMemo(() => entries.filter((entry) => entry.approved), [entries]);

  async function loadEntries(currentToken = token) {
    if (!currentToken.trim()) {
      setNotice('Bitte zuerst den Admin-Token eintragen.');
      return;
    }

    setIsLoading(true);
    setNotice('');

    try {
      const response = await fetch(`${apiPath}?admin=1`, {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${currentToken.trim()}`,
        },
      });

      const data = (await response.json().catch(() => ({}))) as { entries?: GuestbookEntry[]; error?: string };
      if (!response.ok) throw new Error(data.error || 'Einträge konnten nicht geladen werden.');

      setEntries(data.entries || []);
      setNotice(`${data.entries?.filter((entry) => !entry.approved).length || 0} offene Einträge gefunden.`);
    } catch (error) {
      setEntries([]);
      setNotice(error instanceof Error ? error.message : 'Einträge konnten nicht geladen werden.');
    } finally {
      setIsLoading(false);
    }
  }

  function saveToken() {
    const nextToken = token.trim();
    window.localStorage.setItem(tokenStorageKey, nextToken);
    setSavedToken(nextToken);
    setNotice('Admin-Token lokal im Browser gespeichert.');
    void loadEntries(nextToken);
  }

  function forgetToken() {
    window.localStorage.removeItem(tokenStorageKey);
    setToken('');
    setSavedToken('');
    setEntries([]);
    setNotice('Admin-Token wurde aus diesem Browser entfernt.');
  }

  async function updateEntry(id: string, approved: boolean) {
    if (!savedToken) {
      setNotice('Admin-Token fehlt.');
      return;
    }

    setIsSaving(id);
    setNotice('');

    try {
      const response = await fetch(apiPath, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${savedToken}`,
        },
        body: JSON.stringify({ id, approved }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(data.error || 'Eintrag konnte nicht aktualisiert werden.');

      setEntries((current) => current.map((entry) => (entry.id === id ? { ...entry, approved } : entry)));
      setNotice(approved ? 'Eintrag wurde freigegeben.' : 'Eintrag wurde zurückgezogen.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Eintrag konnte nicht aktualisiert werden.');
    } finally {
      setIsSaving('');
    }
  }

  async function deleteEntry(id: string) {
    if (!savedToken) {
      setNotice('Admin-Token fehlt.');
      return;
    }

    const confirmed = window.confirm('Diesen Gästebuch-Eintrag wirklich löschen?');
    if (!confirmed) return;

    setIsSaving(id);
    setNotice('');

    try {
      const response = await fetch(apiPath, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${savedToken}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(data.error || 'Eintrag konnte nicht gelöscht werden.');

      setEntries((current) => current.filter((entry) => entry.id !== id));
      setNotice('Eintrag wurde gelöscht.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Eintrag konnte nicht gelöscht werden.');
    } finally {
      setIsSaving('');
    }
  }

  return (
    <main className="min-h-screen bg-[#070a07] px-5 py-8 text-stone-50 sm:px-8">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,.18),transparent_28rem),radial-gradient(circle_at_90%_20%,rgba(52,211,153,.12),transparent_32rem)]" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a href="/" className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-stone-200 transition hover:bg-white/15">
              ← Zur Website
            </a>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.28em] text-amber-200">Admin</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">Gästebuch freigeben</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-300">
              Neue Einträge erscheinen erst öffentlich, wenn du sie hier freigibst. Du brauchst keinen SQL-Befehl mehr.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/25 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-100">Status</p>
            <p className="mt-2 text-3xl font-black text-white">{pendingEntries.length}</p>
            <p className="text-sm text-stone-400">offene Einträge</p>
          </div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/25 backdrop-blur sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
            <label className="block">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-stone-300">Admin-Token</span>
              <input
                type="password"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                className="mt-2 w-full rounded-[1.15rem] border border-white/10 bg-black/35 px-4 py-3 font-semibold text-white outline-none transition focus:border-amber-200/70 focus:ring-4 focus:ring-amber-300/10"
                placeholder="Token aus Cloudflare einfügen"
              />
            </label>
            <button onClick={saveToken} className="rounded-full bg-amber-300 px-6 py-3 font-black text-stone-950 transition hover:bg-amber-200">
              Token speichern & laden
            </button>
            <button onClick={forgetToken} className="rounded-full border border-white/10 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/15">
              Token vergessen
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-stone-400">
              Der Token wird nur lokal in deinem Browser gespeichert. Er muss in Cloudflare als <strong>GUESTBOOK_ADMIN_TOKEN</strong> hinterlegt sein.
            </p>
            <button onClick={() => loadEntries()} disabled={isLoading || !savedToken} className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-5 py-3 font-black text-emerald-100 transition hover:bg-emerald-300 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-50">
              {isLoading ? 'Lädt ...' : 'Neu laden'}
            </button>
          </div>

          {notice ? <p className="mt-5 rounded-[1.25rem] border border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-stone-300">{notice}</p> : null}
        </section>

        <EntrySection
          title="Wartet auf Freigabe"
          emptyText="Aktuell wartet kein neuer Eintrag auf Freigabe."
          entries={pendingEntries}
          isSaving={isSaving}
          onApprove={(id) => updateEntry(id, true)}
          onUnapprove={(id) => updateEntry(id, false)}
          onDelete={deleteEntry}
        />

        <EntrySection
          title="Bereits öffentlich"
          emptyText="Noch keine freigegebenen Einträge vorhanden."
          entries={approvedEntries}
          isSaving={isSaving}
          approvedSection
          onApprove={(id) => updateEntry(id, true)}
          onUnapprove={(id) => updateEntry(id, false)}
          onDelete={deleteEntry}
        />
      </div>
    </main>
  );
}

function EntrySection({
  title,
  emptyText,
  entries,
  approvedSection = false,
  isSaving,
  onApprove,
  onUnapprove,
  onDelete,
}: {
  title: string;
  emptyText: string;
  entries: GuestbookEntry[];
  approvedSection?: boolean;
  isSaving: string;
  onApprove: (id: string) => void;
  onUnapprove: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-amber-200">{approvedSection ? 'Online sichtbar' : 'Moderation'}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white">{title}</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-stone-300">{entries.length}</span>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 text-stone-300">{emptyText}</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {entries.map((entry) => (
            <article key={entry.id} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xl font-black text-white">{entry.name}</p>
                  <p className="mt-1 text-sm text-stone-400">{formatDate(entry.date)}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${entry.approved ? 'bg-emerald-300/12 text-emerald-100' : 'bg-amber-200/12 text-amber-100'}`}>
                  {entry.approved ? 'öffentlich' : 'wartet'}
                </span>
              </div>

              <p className="mt-5 whitespace-pre-wrap leading-7 text-stone-200">„{entry.message}“</p>

              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {!entry.approved ? (
                  <button onClick={() => onApprove(entry.id)} disabled={isSaving === entry.id} className="rounded-full bg-emerald-300 px-4 py-3 font-black text-stone-950 transition hover:bg-emerald-200 disabled:opacity-50">
                    Freigeben
                  </button>
                ) : (
                  <button onClick={() => onUnapprove(entry.id)} disabled={isSaving === entry.id} className="rounded-full border border-white/10 bg-white/10 px-4 py-3 font-black text-white transition hover:bg-white/15 disabled:opacity-50">
                    Zurückziehen
                  </button>
                )}
                <button onClick={() => onDelete(entry.id)} disabled={isSaving === entry.id} className="rounded-full border border-red-300/20 bg-red-300/10 px-4 py-3 font-black text-red-100 transition hover:bg-red-300 hover:text-stone-950 disabled:opacity-50">
                  Löschen
                </button>
                <button onClick={() => navigator.clipboard?.writeText(entry.id)} className="rounded-full border border-white/10 bg-black/20 px-4 py-3 font-black text-stone-300 transition hover:bg-white/10">
                  ID kopieren
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
