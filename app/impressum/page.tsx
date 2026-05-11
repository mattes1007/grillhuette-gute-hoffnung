import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = {
  title: `Impressum | ${site.name}`,
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#0d120d] px-6 py-16 text-stone-100">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/30">
        <Link href="/" className="text-sm font-bold text-amber-300 hover:text-amber-200">← Zurück zur Startseite</Link>
        <h1 className="mt-8 text-4xl font-black">Impressum</h1>
        <p className="mt-6 leading-8 text-stone-300">
          Bitte vor Veröffentlichung die vollständigen rechtlichen Angaben ergänzen. Diese Seite ist als Platzhalter vorbereitet.
        </p>

        <div className="mt-8 space-y-6 leading-8 text-stone-300">
          <section>
            <h2 className="text-xl font-black text-white">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">
              Grillhütte „Gute Hoffnung“ Münster<br />
              Verantwortliche Person / Verein ergänzen<br />
              Straße und Hausnummer ergänzen<br />
              PLZ und Ort ergänzen
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">Kontakt</h2>
            <p className="mt-2">
              Telefon: <a href={`tel:${site.phone}`} className="text-amber-300 hover:text-amber-200">{site.phoneDisplay}</a><br />
              E-Mail: <a href={`mailto:${site.email}`} className="text-amber-300 hover:text-amber-200">{site.email}</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white">Haftung für Inhalte</h2>
            <p className="mt-2">
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
