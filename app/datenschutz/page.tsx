import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutz | Grillhüttenverein Gute Hoffnung 76 e.V.',
  description: 'Datenschutzerklärung des Grillhüttenverein Gute Hoffnung 76 e.V.',
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

function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function DatenschutzPage() {
  return (
    <LegalPageShell>
      <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-200">Datenschutzerklärung</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Datenschutz</h1>
      <p className="mt-4 text-stone-400">Stand: {updatedAt}</p>

      <LegalSection title="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p>
          <strong className="text-white">Grillhüttenverein Gute Hoffnung 76 e.V.</strong>
          <br />
          Oberpforte 44
          <br />
          35321 Laubach
          <br />
          Deutschland
        </p>
        <p>
          Vertreten durch den 1. Vorsitzenden Jens Sieg.
          <br />
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

      <LegalSection title="2. Allgemeine Hinweise zur Datenverarbeitung">
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies für den Betrieb dieser Website, die
          Bearbeitung von Anfragen, die Verwaltung des Gästebuchs oder die Darstellung externer Dienste
          erforderlich ist. Personenbezogene Daten sind alle Informationen, mit denen eine Person direkt oder
          indirekt identifiziert werden kann.
        </p>
        <p>
          Rechtsgrundlagen der Verarbeitung sind insbesondere Art. 6 Abs. 1 lit. a DSGVO, sofern eine
          Einwilligung erteilt wurde, Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Bearbeitung
          einer Anfrage oder vorvertraglicher Maßnahmen erforderlich ist, sowie Art. 6 Abs. 1 lit. f DSGVO
          auf Grundlage unseres berechtigten Interesses an einem sicheren und funktionsfähigen Webangebot.
        </p>
      </LegalSection>

      <LegalSection title="3. Hosting über Cloudflare Pages">
        <p>
          Diese Website wird über Cloudflare Pages bereitgestellt. Anbieter ist Cloudflare, Inc.,
          101 Townsend St, San Francisco, CA 94107, USA.
        </p>
        <p>
          Beim Aufruf der Website können technisch notwendige Zugriffsdaten verarbeitet werden. Dazu können
          insbesondere IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Datei, übertragene Datenmenge,
          Browsertyp, Betriebssystem und Referrer-URL gehören. Diese Daten sind erforderlich, um die Website
          auszuliefern, die Sicherheit des Angebots zu gewährleisten und technische Fehler zu erkennen.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren,
          schnellen und zuverlässigen Bereitstellung unserer Website.
        </p>
      </LegalSection>

      <LegalSection title="4. Anfrage per WhatsApp oder E-Mail">
        <p>
          Auf der Website befindet sich ein Anfrageformular. Die eingegebenen Daten werden auf der Website
          genutzt, um daraus eine Nachricht für WhatsApp oder E-Mail vorzubereiten. Die Anfrage wird erst
          versendet, wenn Sie den jeweiligen WhatsApp- oder E-Mail-Link aktiv nutzen.
        </p>
        <p>
          Je nach Eingabe können folgende Daten verarbeitet werden:
        </p>
        <LegalList
          items={[
            'Name',
            'Telefonnummer',
            'E-Mail-Adresse',
            'Wunschtermin',
            'Zeitraum oder Uhrzeit',
            'Personenzahl',
            'Anlass',
            'Nachricht beziehungsweise weitere Angaben',
          ]}
        />
        <p>
          Zweck der Verarbeitung ist die Bearbeitung Ihrer Anfrage zur Nutzung der Grillhütte. Rechtsgrundlage
          ist Art. 6 Abs. 1 lit. b DSGVO.
        </p>
        <p>
          Bei Nutzung von WhatsApp verlassen Sie unsere Website. Anbieter von WhatsApp ist WhatsApp Ireland
          Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Für die dortige Verarbeitung
          personenbezogener Daten gelten die Datenschutzinformationen von WhatsApp.
        </p>
      </LegalSection>

      <LegalSection title="5. Gästebuch">
        <p>
          Die Website bietet ein Gästebuch. Wenn Sie einen Gästebuch-Eintrag absenden, werden die von Ihnen
          eingegebenen Daten gespeichert und zunächst moderiert. Einträge werden erst nach Freigabe öffentlich
          angezeigt.
        </p>
        <p>
          Verarbeitet werden können:
        </p>
        <LegalList items={['Name', 'Gästebuch-Nachricht', 'Datum des Eintrags', 'Freigabestatus des Eintrags']} />
        <p>
          Zweck der Verarbeitung ist die Bereitstellung und Moderation des Gästebuchs. Die Veröffentlichung
          erfolgt nur nach Freigabe. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO, soweit Sie den Eintrag
          freiwillig absenden und veröffentlichen lassen möchten, sowie Art. 6 Abs. 1 lit. f DSGVO für die
          technische Moderation und den Schutz vor Missbrauch.
        </p>
        <p>
          Sie können die Löschung Ihres Gästebuch-Eintrags jederzeit über die oben genannten Kontaktdaten
          verlangen.
        </p>
      </LegalSection>

      <LegalSection title="6. Google Kalender">
        <p>
          Auf der Website kann ein Google Kalender eingebunden sein, um freie und belegte Zeiten anzuzeigen.
          Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
        </p>
        <p>
          Beim Laden des eingebetteten Kalenders können Daten an Google übertragen werden, insbesondere
          technische Zugriffsdaten wie IP-Adresse, Browserinformationen und Zeitpunkt des Aufrufs. Wenn Sie
          gleichzeitig bei Google angemeldet sind, kann Google den Aufruf gegebenenfalls Ihrem Google-Konto
          zuordnen.
        </p>
        <p>
          Rechtsgrundlage für die Einbindung ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse
          liegt in der nutzerfreundlichen Darstellung der Terminverfügbarkeit.
        </p>
      </LegalSection>

      <LegalSection title="7. Google Maps">
        <p>
          Auf der Website kann Google Maps eingebunden sein, um die Lage der Grillhütte darzustellen. Anbieter
          ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
        </p>
        <p>
          Beim Laden der Karte können Daten an Google übertragen werden, insbesondere IP-Adresse,
          Browserinformationen und Standort-/Kartennutzungsdaten, soweit diese durch Ihre Browsereinstellungen
          oder Nutzung übermittelt werden.
        </p>
        <p>
          Rechtsgrundlage für die Einbindung ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse
          liegt in einer einfachen und verständlichen Darstellung der Anfahrt.
        </p>
      </LegalSection>

      <LegalSection title="8. Facebook-Link">
        <p>
          Unsere Website kann auf eine Facebook-Seite verlinken. Wenn Sie den Link anklicken, verlassen Sie
          unsere Website. Für die Verarbeitung personenbezogener Daten auf Facebook ist der jeweilige Anbieter
          verantwortlich. Eine Datenübertragung an Facebook erfolgt grundsätzlich erst, wenn Sie den externen
          Link aktiv anklicken.
        </p>
      </LegalSection>

      <LegalSection title="9. Cookies und lokale Speicherung">
        <p>
          Die Website kann technisch notwendige lokale Speicherfunktionen des Browsers nutzen, zum Beispiel
          zur Anzeige von Formularzuständen oder temporären Gästebuch-Hinweisen. Soweit externe Dienste wie
          Google oder WhatsApp genutzt werden, können diese Anbieter eigene Cookies oder ähnliche Technologien
          einsetzen. Darauf haben wir keinen unmittelbaren Einfluss.
        </p>
      </LegalSection>

      <LegalSection title="10. Speicherdauer">
        <p>
          Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen Zwecke erforderlich
          ist oder gesetzliche Aufbewahrungspflichten bestehen. Anfragen werden gelöscht, sobald sie nicht mehr
          benötigt werden, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen. Gästebuch-Einträge
          bleiben bis zum Widerruf oder bis zur Entfernung durch den Verantwortlichen gespeichert.
        </p>
      </LegalSection>

      <LegalSection title="11. Ihre Rechte">
        <p>
          Sie haben im Rahmen der gesetzlichen Voraussetzungen folgende Rechte:
        </p>
        <LegalList
          items={[
            'Recht auf Auskunft über die verarbeiteten personenbezogenen Daten',
            'Recht auf Berichtigung unrichtiger Daten',
            'Recht auf Löschung',
            'Recht auf Einschränkung der Verarbeitung',
            'Recht auf Datenübertragbarkeit',
            'Recht auf Widerspruch gegen bestimmte Verarbeitungen',
            'Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft',
          ]}
        />
        <p>
          Zur Ausübung Ihrer Rechte genügt eine Nachricht an die im Abschnitt „Verantwortlicher“ genannten
          Kontaktdaten.
        </p>
      </LegalSection>

      <LegalSection title="12. Beschwerderecht bei einer Aufsichtsbehörde">
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht
          sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht verstößt.
        </p>
        <p>
          Zuständig kann insbesondere die Datenschutzaufsichtsbehörde des Bundeslandes Hessen sein.
        </p>
      </LegalSection>

      <LegalSection title="13. Änderungen dieser Datenschutzerklärung">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich rechtliche Vorgaben,
          technische Funktionen oder eingesetzte Dienste ändern.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
