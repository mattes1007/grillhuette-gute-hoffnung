import Link from 'next/link';
import { legal, site } from '@/lib/site';

export const metadata = {
  title: `${legal.datenschutz.title} | ${site.name}`,
};

export default function DatenschutzPage() {
  return (
    <main className="app-shell min-h-screen bg-[#0d120d] px-6 py-16 text-stone-100">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <Link href="/" className="text-sm font-bold text-amber-300 hover:text-amber-200">
          {legal.backLabel}
        </Link>

        <h1 className="mt-8 text-4xl font-black">{legal.datenschutz.title}</h1>
        <p className="mt-6 leading-8 text-stone-300">{legal.datenschutz.intro}</p>

        <div className="mt-8 space-y-6 leading-8 text-stone-300">
          {legal.datenschutz.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-black text-white">{section.title}</h2>
              <p className="mt-2 whitespace-pre-line">{section.text}</p>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-black text-white">Kontakt</h2>
            <p className="mt-2">
              E-Mail: <a href={`mailto:${site.email}`} className="text-amber-300 hover:text-amber-200">{site.email}</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
