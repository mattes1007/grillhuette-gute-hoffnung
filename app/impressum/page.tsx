import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | Grillhüttenverein Gute Hoffnung 76 e.V.',
  description: 'Impressum des Grillhüttenverein Gute Hoffnung 76 e.V.',
};

const updatedAt = '12.05.2026';

function LegalPageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#070a07] px-5 py-24 text-stone-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,.18),transparent_30rem),radial-gradient(circle_at_92%_18%,rgba(16,185,129,.13),transparent_32rem),linear-gradient(180deg,#030503,#070a07)]" />
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="mb-8 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[0.1]"
        >
          ← Zurück zur Startseite
        </a>

        <article className="rounded-[2.35rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-10">
          {children}
        </article>
      </div>
    </main>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-white/10 pt-8">
      <h2 className="text-2xl font-black tracking-tight text-white">{title}</h2>
      <div className="mt-4 space-y-3 leading-7 text-stone-300">{children}</div>
    </section>
  );
}

export default function ImpressumPage() {
  return (
    <LegalPageShell>
      <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-200">Anbieterkennzeichnung</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Impressum</h1>
      <p className="mt-4 text-stone-400">Stand: {updatedAt}</p>

      <LegalSection title="Angaben gemäß § 5 DDG">
        <p>
          <strong className="text-white">Grillhüttenverein Gute Hoffnung 76 e.V.</strong>
          <br />
          Oberpforte 44
          <br />
          35321 Laubach
          <br />
          Deutschland
        </p>
      </LegalSection>

      <LegalSection title="Vertreten durch">
        <p>
          1. Vorsitzender
          <br />
          <strong className="text-white">Jens Sieg</strong>
        </p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Telefon:{' '}
          <a className="font-bold text-amber-200 hover:text-amber-100" href="tel:+4964056666">
            06405 6666
          </a>
          <br />
          E-Mail:{' '}
          <a className="font-bold text-amber-200 hover:text-amber-100" href="mailto:jens.sieg@gmx.de">
            jens.sieg@gmx.de
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Registereintrag">
        <p>
          Vereinsregister: Amtsgericht Gießen
          <br />
          Registernummer: VR 9988664447777
        </p>
      </LegalSection>

      <LegalSection title="Umsatzsteuer">
        <p>Eine Umsatzsteuer-Identifikationsnummer ist nicht vorhanden.</p>
      </LegalSection>

      <LegalSection title="Inhaltlich verantwortlich nach § 18 Abs. 2 MStV">
        <p>
          Jens Sieg
          <br />
          Oberpforte 44
          <br />
          35321 Laubach
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Inhalte">
        <p>
          Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        </p>
        <p>
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach
          den allgemeinen Gesetzen bleiben hiervon unberührt.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Links">
        <p>
          Unsere Website enthält Links zu externen Websites Dritter. Auf deren Inhalte haben wir keinen
          Einfluss. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die
          Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </p>
      </LegalSection>

      <LegalSection title="Urheberrecht">
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem
          deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
          bedürfen der schriftlichen Zustimmung des jeweiligen Autors beziehungsweise Erstellers.
        </p>
      </LegalSection>

      <LegalSection title="Online-Streitbeilegung und Verbraucherstreitbeilegung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit. Wir sind nicht
          verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
