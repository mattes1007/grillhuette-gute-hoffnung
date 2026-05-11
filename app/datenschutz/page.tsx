import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = {
  title: `Datenschutz | ${site.name}`,
};

export default function DatenschutzPage() {
  return (
    <main className="app-shell min-h-screen bg-[#0d120d] px-6 py-16 text-stone-100">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <Link href="/" className="text-sm font-bold text-amber-300 hover:text-amber-200">
          ← Zurück zur Startseite
        </Link>

        <h1 className="mt-8 text-4xl font-black">Datenschutzerklärung</h1>
        <p className="mt-6 leading-8 text-stone-300">
          Bitte vor Veröffentlichung prüfen und anpassen. Diese Seite ist ein vorbereiteter Platzhalter und keine Rechtsberatung.
        </p>

        <div className="mt-8 space-y-6 leading-8 text-stone-300">
          <section>
            <h2 className="text-xl font-black text-white">Verantwortliche Stelle</h2>
            <p className="mt-2">
              Verantwortliche Person / Verein ergänzen<br />
              Kontakt: <a href={`mailto:${site.email}`} className="text-amber-300 hover:text-amber-200">{site.email}</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">Eingebundene Dienste</h2>
            <p className="mt-2">
              Auf dieser Website wird ein Google Kalender eingebunden. Beim Laden des Kalenders können Daten an Google übertragen werden.
              Zusätzlich sind Links zu WhatsApp, E-Mail und Facebook eingebunden. Diese Dienste werden erst geöffnet, wenn Besucher aktiv darauf klicken.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">Kontaktaufnahme</h2>
            <p className="mt-2">
              Bei Kontaktaufnahme per Telefon, WhatsApp oder E-Mail werden die übermittelten Angaben verarbeitet, um die Anfrage zu beantworten und die Nutzung der Grillhütte abzustimmen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">Gästebuch-Demo</h2>
            <p className="mt-2">
              Einträge im vorbereiteten Gästebuch werden aktuell nur lokal im Browser des jeweiligen Besuchers gespeichert. Sie werden nicht automatisch an den Betreiber der Website übertragen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">Hosting</h2>
            <p className="mt-2">
              Die Website kann statisch über Cloudflare Pages, Netlify oder einen vergleichbaren Anbieter gehostet werden. Bitte den final verwendeten Hosting-Anbieter in der Datenschutzerklärung ergänzen.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
