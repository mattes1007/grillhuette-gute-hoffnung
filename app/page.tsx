'use client';

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  contactContent,
  faqs,
  features,
  footerContent,
  galleryImages,
  guestbookContent,
  guestbookSamples,
  hero,
  heroStats,
  inquiryContent,
  mapSection,
  moments,
  navItems,
  processSteps,
  sections,
  site,
  trustItems,
  ui,
} from '@/lib/site';

type InquiryForm = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  people: string;
  occasion: string;
  message: string;
};

type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  date: string;
  status?: 'approved' | 'pending' | 'sample';
};

const initialInquiry: InquiryForm = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  people: '',
  occasion: '',
  message: '',
};

const guestbookApiPath = '/api/guestbook';

function getWebpSource(src?: string) {
  if (!src) return '';
  return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

function formatGuestbookDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

export default function Home() {
  return (
    <main className="site-shell min-h-screen overflow-x-clip bg-[#070a07] pb-28 text-stone-50 md:pb-0">
      <BackgroundFX />
      <Header />
      <Hero />
      <TrustStrip />
      <Experience />
      <Gallery />
      <FeatureGrid />
      <MapLocation />
      <Inquiry />
      <Guestbook />
      <Faq />
      <Contact />
      <Footer />
      <MobileActionBar />
    </main>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="absolute right-[-14rem] top-[20rem] h-[32rem] w-[32rem] rounded-full bg-emerald-400/12 blur-3xl" />
      <div className="absolute bottom-[-18rem] left-[-10rem] h-[34rem] w-[34rem] rounded-full bg-lime-300/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.08),transparent_38rem)]" />
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-4 ${
          scrolled
            ? 'border-white/12 bg-black/68 shadow-2xl shadow-black/30 backdrop-blur-2xl'
            : 'border-white/10 bg-black/28 backdrop-blur-xl'
        }`}
      >
        <a href="#start" className="group flex min-w-0 items-center gap-2 rounded-full pr-2 font-black text-white">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-lime-300 text-sm text-stone-950 shadow-lg shadow-amber-400/20 transition group-hover:scale-105">
            {site.logoText}
          </span>
          <span className="hidden truncate sm:inline">{site.shortName}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-stone-200 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-black text-emerald-100 transition hover:bg-emerald-300 hover:text-stone-950 sm:inline-flex"
          >
            {ui.headerWhatsapp}
          </a>
          <a
            href="#anfrage"
            className="rounded-full bg-amber-300 px-5 py-2.5 text-sm font-black text-stone-950 shadow-lg shadow-amber-400/20 transition hover:-translate-y-0.5 hover:bg-amber-200"
          >
            {ui.headerInquiry}
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="start" className="relative isolate min-h-[100svh] overflow-hidden pt-24 sm:pt-28">
      <picture>
        <source srcSet={hero.imageWebp || getWebpSource(hero.image)} type="image/webp" />
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-68"
          loading="eager"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,6,4,.96),rgba(4,6,4,.72),rgba(4,6,4,.18)),linear-gradient(0deg,#070a07_0%,rgba(7,10,7,.55)_28%,rgba(7,10,7,.12)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-[#070a07] to-transparent" />

      <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl items-center gap-10 px-5 pb-16 pt-8 lg:grid-cols-[1.08fr_.92fr] lg:px-6">
        <div className="reveal max-w-5xl">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-100 shadow-2xl shadow-black/20 backdrop-blur sm:px-4">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,.9)]" />
            <span className="truncate">{site.location} · {site.price} {hero.priceSuffix}</span>
          </div>

          <h1 className="hero-headline font-black text-white">
            {hero.titleLine1}<br />
            <span className="hero-gradient">{hero.titleLine2}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-balance text-lg leading-8 text-stone-200 sm:text-xl">
            {site.subclaim}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ActionLink href="#anfrage" variant="primary">{ui.heroPrimaryButton}</ActionLink>
            <ActionLink href={`https://wa.me/${site.whatsappNumber}`} external variant="whatsapp">{ui.heroWhatsappButton}</ActionLink>
            <ActionLink href="#galerie" variant="ghost">{ui.heroGalleryButton}</ActionLink>
          </div>
        </div>

        <div className="reveal reveal-delay-2 grid gap-4 sm:grid-cols-2">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6 sm:col-span-2">
            <div className="absolute right-[-4rem] top-[-5rem] h-40 w-40 rounded-full bg-amber-300/25 blur-3xl" />
            <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-200">{hero.cardKicker}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">{hero.cardTitle}</h2>
            <p className="mt-4 leading-7 text-stone-300">{hero.cardText}</p>
          </div>

          {heroStats.map((stat) => (
            <div key={stat.label} className="stat-card rounded-[1.75rem] p-5">
              <p className="text-4xl font-black tracking-tight text-amber-200">{stat.value}</p>
              <p className="mt-2 font-black text-white">{stat.label}</p>
              <p className="mt-1 text-sm text-stone-400">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-6">
      <div className="grid gap-3 rounded-[2rem] border border-white/10 bg-white/[0.055] p-3 shadow-2xl shadow-black/20 backdrop-blur md:grid-cols-4">
        {trustItems.map((item) => (
          <TrustItem key={item.title} icon={item.icon} title={item.title} text={item.text} />
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="erlebnis" className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
      <SectionHeading {...sections.experience} />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {moments.map((moment, index) => (
          <article key={moment.title} className="moment-card group rounded-[2.25rem] p-6 sm:p-7">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-200">{moment.kicker}</p>
            <h3 className="mt-5 text-2xl font-black tracking-tight text-white">{moment.title}</h3>
            <p className="mt-4 leading-7 text-stone-300">{moment.text}</p>
            <div className="mt-8 h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-200 to-emerald-300" style={{ width: `${48 + index * 22}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const visibleGalleryImages = galleryImages.filter((image) => image?.src);

  return (
    <section id="galerie" className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading {...sections.gallery} />
        <a href="#anfrage" className="hidden rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/15 lg:inline-flex">
          {ui.galleryInquiryButton}
        </a>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {visibleGalleryImages.map((image, index) => (
          <article
            key={`${image.src}-${index}`}
            className={`group overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20 ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
          >
            <div className="relative overflow-hidden rounded-[1.45rem]">
              <picture>
                <source srcSet={getWebpSource(image.src)} type="image/webp" />
                <img
                  src={image.src}
                  alt={image.alt || image.title || site.name}
                  className={`w-full object-cover transition duration-700 group-hover:scale-105 ${index === 0 ? 'h-[29rem]' : 'h-72'}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-black text-white">{image.title}</h3>
              <p className="mt-2 leading-7 text-stone-300">{image.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="ausstattung" className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
      <SectionHeading {...sections.features} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item) => (
          <article key={item.title} className="feature-card rounded-[2rem] p-6">
            <div className="text-4xl">{item.icon}</div>
            <h3 className="mt-5 text-2xl font-black text-white">{item.title}</h3>
            <p className="mt-3 leading-7 text-stone-300">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MapLocation() {
  if (!mapSection.enabled) return null;

  return (
    <section id="anfahrt" className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div className="glass-panel rounded-[2.35rem] p-6 sm:p-8">
          <SectionHeading eyebrow={mapSection.eyebrow} title={mapSection.title} text={mapSection.text} />
          <div className="mt-8 space-y-4 text-stone-300">
            {mapSection.address ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-200">{mapSection.addressLabel}</p>
                <p className="mt-2 whitespace-pre-line text-lg font-bold text-white">{mapSection.address}</p>
              </div>
            ) : null}
            {mapSection.parkingNote ? <InfoBox title={mapSection.parkingTitle} text={mapSection.parkingNote} /> : null}
            {mapSection.accessNote ? <InfoBox title={mapSection.accessTitle} text={mapSection.accessNote} /> : null}
          </div>
          {mapSection.mapLink ? (
            <a href={mapSection.mapLink} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-amber-300 px-6 py-4 font-black text-stone-950 transition hover:bg-amber-200">
              {mapSection.mapButtonLabel}
            </a>
          ) : null}
        </div>
        <div className="overflow-hidden rounded-[2.35rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30">
          {mapSection.embedSrc ? (
            <iframe
              src={mapSection.embedSrc}
              title={mapSection.iframeTitle}
              className="h-[34rem] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="grid h-[34rem] place-items-center p-8 text-center text-stone-300">
              <div>
                <p className="text-5xl">📍</p>
                <p className="mt-4 text-2xl font-black text-white">{mapSection.placeholderTitle}</p>
                <p className="mt-3">{mapSection.placeholderText}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Inquiry() {
  const [form, setForm] = useState<InquiryForm>(initialInquiry);
  const inquiryText = useMemo(() => buildInquiryText(form), [form]);
  const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(inquiryText)}`;
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(inquiryContent.emailSubject)}&body=${encodeURIComponent(inquiryText)}`;
  const completion = getCompletion(form);
  const canSend = Object.values(form).every((value) => value.trim().length > 0);

  function updateField(field: keyof InquiryForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <section id="anfrage" className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
      <SectionHeading {...sections.inquiry} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-[2.35rem] p-4 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-amber-200">{inquiryContent.calendarKicker}</p>
              <h3 className="mt-2 text-2xl font-black text-white">{inquiryContent.calendarTitle}</h3>
              <p className="mt-3 max-w-xl leading-7 text-stone-300">Verfügbarkeit direkt im Google Kalender – eingerahmt im Stil der Website.</p>
            </div>
            <a href={site.googleCalendarSrc} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-center font-black text-white transition hover:bg-white/15">
              {inquiryContent.calendarButton}
            </a>
          </div>

          <div className="calendar-shell">
            <div className="calendar-shell__toolbar">
              <div className="calendar-shell__dots">
                <span />
                <span />
                <span />
              </div>
              <p className="calendar-shell__title">Google Kalender · Live-Ansicht</p>
            </div>
            <div className="calendar-shell__window">
              <iframe
                src={site.googleCalendarSrc}
                title={inquiryContent.calendarIframeTitle}
                className="hidden h-[660px] w-full rounded-[1.35rem] md:block"
                frameBorder="0"
                scrolling="no"
              />
              <div className="grid min-h-[290px] place-items-center rounded-[1.35rem] bg-stone-100 p-6 text-center text-stone-950 md:hidden">
                <div>
                  <p className="text-5xl">{inquiryContent.calendarMobileIcon}</p>
                  <h4 className="mt-4 text-2xl font-black">{inquiryContent.calendarMobileTitle}</h4>
                  <p className="mt-3 text-stone-700">{inquiryContent.calendarMobileText}</p>
                  <a href={site.googleCalendarSrc} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-stone-950 px-6 py-3 font-black text-white">
                    {inquiryContent.calendarMobileButton}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={(event) => event.preventDefault()} className="glass-panel rounded-[2.35rem] p-5 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-amber-200">{inquiryContent.formKicker}</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-white">{inquiryContent.formTitle}</h3>
              <p className="mt-3 max-w-xl leading-7 text-stone-300">{inquiryContent.formText}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4 text-sm text-stone-300">
              <p className="font-black text-white">{inquiryContent.progressTitle}</p>
              <div className="mt-3 h-2 w-32 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-200 to-emerald-300 transition-all" style={{ width: `${completion}%` }} />
              </div>
              <p className="mt-2">{completion}% {inquiryContent.progressSuffix}</p>
            </div>
          </div>

          <div className="field-hint-box mt-7">
            <p className="field-hint-box__eyebrow">Pflichtangaben</p>
            <p className="field-hint-box__text">
              Bitte alle Felder ausfüllen. Für eine verbindliche Anfrage brauchen wir <strong>Name</strong>, <strong>Telefon</strong>, <strong>E-Mail</strong>, <strong>Wunschtermin</strong>, <strong>Zeitraum</strong>, <strong>Personenzahl</strong>, <strong>Anlass</strong> und eine kurze <strong>Nachricht</strong>.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <FormField label={inquiryContent.fields.name.label} htmlFor="inquiry-name" required>
              <input id="inquiry-name" required value={form.name} onChange={(event) => updateField('name', event.target.value)} className="form-input" placeholder={inquiryContent.fields.name.placeholder} autoComplete="name" />
            </FormField>

            <FormField label={inquiryContent.fields.phone.label} htmlFor="inquiry-phone" required>
              <input id="inquiry-phone" type="tel" required value={form.phone} onChange={(event) => updateField('phone', event.target.value)} className="form-input" placeholder={inquiryContent.fields.phone.placeholder} autoComplete="tel" />
            </FormField>

            <FormField label={inquiryContent.fields.email.label} htmlFor="inquiry-email" required>
              <input id="inquiry-email" type="email" required value={form.email} onChange={(event) => updateField('email', event.target.value)} className="form-input" placeholder={inquiryContent.fields.email.placeholder} autoComplete="email" />
            </FormField>

            <FormField label={inquiryContent.fields.date.label} htmlFor="inquiry-date" required>
              <input id="inquiry-date" type="date" required value={form.date} onChange={(event) => updateField('date', event.target.value)} className="form-input" />
            </FormField>

            <FormField label={inquiryContent.fields.time.label} htmlFor="inquiry-time" required>
              <input id="inquiry-time" required value={form.time} onChange={(event) => updateField('time', event.target.value)} className="form-input" placeholder={inquiryContent.fields.time.placeholder} />
            </FormField>

            <FormField label={inquiryContent.fields.people.label} htmlFor="inquiry-people" required>
              <input id="inquiry-people" inputMode="numeric" required value={form.people} onChange={(event) => updateField('people', event.target.value)} className="form-input" placeholder={inquiryContent.fields.people.placeholder} />
            </FormField>
          </div>

          <FormField label={inquiryContent.fields.occasion.label} htmlFor="inquiry-occasion" className="mt-4" required>
            <input id="inquiry-occasion" required value={form.occasion} onChange={(event) => updateField('occasion', event.target.value)} className="form-input" placeholder={inquiryContent.fields.occasion.placeholder} />
          </FormField>

          <FormField label={inquiryContent.fields.message.label} htmlFor="inquiry-message" className="mt-4" required>
            <textarea id="inquiry-message" required value={form.message} onChange={(event) => updateField('message', event.target.value)} className="form-input min-h-32 resize-y" placeholder={inquiryContent.fields.message.placeholder} />
          </FormField>

          {!canSend ? (
            <p className="mt-5 rounded-[1.25rem] border border-amber-200/20 bg-amber-200/10 px-4 py-3 text-sm font-semibold text-amber-100">
              Bitte alle Pflichtfelder ausfüllen. Erst danach werden WhatsApp- und E-Mail-Anfrage aktiviert.
            </p>
          ) : null}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={whatsappHref} target="_blank" rel="noreferrer" aria-disabled={!canSend} className={`rounded-full px-6 py-4 text-center font-black shadow-xl transition ${canSend ? 'bg-emerald-300 text-stone-950 shadow-emerald-400/20 hover:-translate-y-0.5 hover:bg-emerald-200' : 'pointer-events-none bg-white/10 text-stone-500 shadow-none'}`}>
              {inquiryContent.whatsappButton}
            </a>
            <a href={mailHref} aria-disabled={!canSend} className={`rounded-full px-6 py-4 text-center font-black shadow-xl transition ${canSend ? 'bg-amber-300 text-stone-950 shadow-amber-400/20 hover:-translate-y-0.5 hover:bg-amber-200' : 'pointer-events-none bg-white/10 text-stone-500 shadow-none'}`}>
              {inquiryContent.emailButton}
            </a>
          </div>

          <details className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
            <summary className="cursor-pointer font-black text-white">{inquiryContent.previewSummary}</summary>
            <pre className="mt-4 max-h-[360px] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-7 text-stone-200">{inquiryText}</pre>
          </details>
        </form>
      </div>
    </section>
  );
}

function Guestbook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [remoteEntries, setRemoteEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadEntries() {
      setIsLoading(true);
      try {
        const response = await fetch(guestbookApiPath, { cache: 'no-store' });
        if (!response.ok) throw new Error('Guestbook API not available');
        const data = (await response.json()) as { entries?: GuestbookEntry[] };
        if (!cancelled) {
          setRemoteEntries((data.entries || []).map((entry) => ({ ...entry, status: 'approved' })));
          setNotice('');
        }
      } catch {
        if (!cancelled) {
          setRemoteEntries([]);
          setNotice('');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadEntries();
    return () => {
      cancelled = true;
    };
  }, []);

  const approvedEntries = remoteEntries.filter((entry) => entry.status !== 'pending');
  const entries: GuestbookEntry[] = [
    ...approvedEntries,
    ...(approvedEntries.length === 0
      ? guestbookSamples.map((entry) => ({ ...entry, status: 'sample' as const }))
      : []),
  ];

  async function submitEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (website.trim()) {
      setNotice('Danke. Dein Eintrag wurde vorgemerkt.');
      return;
    }

    if (!name.trim() || !message.trim()) {
      setNotice(guestbookContent.validationMessage);
      return;
    }

    setIsSubmitting(true);
    setNotice('');

    try {
      const response = await fetch(guestbookApiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, website }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(data.error || 'Der Eintrag konnte nicht gespeichert werden.');

      setName('');
      setMessage('');
      setWebsite('');
      setNotice('Danke! Dein Eintrag wurde gespeichert. Er erscheint im Gästebuch, sobald er freigegeben wurde.');
    } catch {
      setNotice('Der Eintrag konnte gerade nicht gespeichert werden. Bitte versuche es später noch einmal.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="gaestebuch" className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Gästebuch"
            title="Stimmen von schönen Tagen."
            text="Hier ist Platz für Erinnerungen, Grüße und ein kleines Dankeschön nach eurer Feier in der Grillhütte. Jeder Eintrag wird vor der Veröffentlichung kurz geprüft."
          />

          <form onSubmit={submitEntry} className="mt-8 rounded-[2.2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/25 backdrop-blur sm:p-6">
            <div className="rounded-[1.55rem] border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-stone-200">
              <p className="font-black text-emerald-100">Moderiertes Gästebuch</p>
              <p className="mt-1">Dein Eintrag wird gespeichert und erscheint erst nach Freigabe öffentlich. So bleibt das Gästebuch freundlich und sauber.</p>
            </div>

            <input
              aria-hidden="true"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              className="hidden"
              name="website"
            />

            <label className="mt-5 block text-sm font-black text-stone-200">
              {guestbookContent.nameLabel}
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-input mt-2"
                placeholder={guestbookContent.namePlaceholder}
                maxLength={60}
              />
            </label>

            <label className="mt-4 block text-sm font-black text-stone-200">
              {guestbookContent.messageLabel}
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="form-input mt-2 min-h-32 resize-y"
                placeholder={guestbookContent.messagePlaceholder}
                maxLength={800}
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full rounded-full bg-amber-300 px-5 py-4 font-black text-stone-950 shadow-xl shadow-amber-400/20 transition hover:-translate-y-0.5 hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-stone-500 disabled:shadow-none"
            >
              {isSubmitting ? 'Eintrag wird gespeichert ...' : guestbookContent.submitButton}
            </button>

            <p className="mt-3 text-sm leading-6 text-stone-400">Keine Sorge: Nicht freigegebene Einträge sind für andere Besucher nicht sichtbar.</p>
            {notice ? <p className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-stone-300">{notice}</p> : null}
          </form>
        </div>

        <div className="grid gap-4">
          <div className="relative overflow-hidden rounded-[2.15rem] border border-amber-200/15 bg-[linear-gradient(135deg,rgba(251,191,36,.13),rgba(16,185,129,.08),rgba(255,255,255,.045))] p-6 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="absolute right-[-5rem] top-[-5rem] h-44 w-44 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-amber-100">Freigegebene Einträge</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-white">Was Gäste über die Hütte sagen</h3>
                <p className="mt-3 max-w-2xl leading-7 text-stone-300">Alle sichtbaren Einträge wurden vorher geprüft. Neue Einträge landen zuerst im Admin-Bereich.</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-black/24 px-5 py-4 text-center">
                <p className="text-3xl font-black text-amber-200">{entries.length}</p>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-stone-400">sichtbar</p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="guest-card rounded-[2rem] p-6 text-stone-300">Gästebuch wird geladen ...</div>
          ) : null}

          {!isLoading && entries.length === 0 ? (
            <div className="guest-card rounded-[2rem] p-6">
              <p className="text-xl font-black text-white">Noch keine freigegebenen Einträge.</p>
              <p className="mt-3 leading-7 text-stone-300">Sobald der erste Eintrag freigegeben wurde, erscheint er hier.</p>
            </div>
          ) : null}

          {entries.map((entry) => (
            <article key={entry.id} className="guest-card rounded-[2rem] p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-amber-200">{guestbookContent.stars}</span>
                {entry.status === 'sample' ? <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-stone-300">Beispiel</span> : null}
                {entry.status === 'approved' ? <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-100">Freigegeben</span> : null}
              </div>
              <p className="leading-7 text-stone-200">{guestbookContent.quoteOpen}{entry.message}{guestbookContent.quoteClose}</p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="font-black text-white">{entry.name}</p>
                <p className="text-sm text-stone-400">{formatGuestbookDate(entry.date)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
      <SectionHeading {...sections.faq} />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {faqs.map((item) => (
          <details key={item.question} className="group rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 open:bg-white/[0.09]">
            <summary className="cursor-pointer list-none text-lg font-black text-white">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-300/15 text-amber-200 transition group-open:rotate-45">{ui.faqOpenIcon}</span>
              </span>
            </summary>
            <p className="mt-4 leading-7 text-stone-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="kontakt" className="mx-auto max-w-7xl px-5 py-20 lg:px-6">
      <div className="relative overflow-hidden rounded-[2.65rem] border border-white/10 bg-[linear-gradient(135deg,rgba(251,191,36,.16),rgba(16,185,129,.10),rgba(255,255,255,.055))] p-6 shadow-2xl shadow-black/30 sm:p-10">
        <div className="absolute right-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-amber-300/25 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <SectionHeading {...sections.contact} />
          <div className="grid gap-3 sm:grid-cols-3">
            <ContactButton href={`tel:${site.phone}`} label={contactContent.callLabel} value={site.phoneDisplay} />
            <ContactButton href={`https://wa.me/${site.whatsappNumber}`} label={contactContent.whatsappLabel} value={contactContent.whatsappValue} external />
            <ContactButton href={`mailto:${site.email}`} label={contactContent.emailLabel} value={site.email} />
          </div>
        </div>

        <div className="relative mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6">
            <h3 className="text-xl font-black text-white">{contactContent.hoursTitle}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {site.contactTimes.map((time) => (
                <div key={time} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 font-semibold text-stone-200">{time}</div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-400">{contactContent.hoursText}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6">
            <h3 className="text-xl font-black text-white">{contactContent.fastTitle}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <a href="#anfrage" className="rounded-2xl bg-amber-300 px-4 py-4 text-center font-black text-stone-950 transition hover:bg-amber-200">{contactContent.fastInquiryLabel}</a>
              <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noreferrer" className="rounded-2xl bg-emerald-300 px-4 py-4 text-center font-black text-stone-950 transition hover:bg-emerald-200">{contactContent.fastWhatsappLabel}</a>
              <a href={site.facebookUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-center font-black text-white transition hover:bg-white/[0.1]">{contactContent.fastFacebookLabel}</a>
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-400">{contactContent.fastText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 text-center text-sm text-stone-400">
      <p>{footerContent.copyrightPrefix} {new Date().getFullYear()} {site.name}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-5">
        <a href={site.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-amber-200">{footerContent.facebookLabel}</a>
        <a href="/impressum/" className="hover:text-amber-200">{footerContent.impressumLabel}</a>
        <a href="/datenschutz/" className="hover:text-amber-200">{footerContent.datenschutzLabel}</a>
      </div>
    </footer>
  );
}

function MobileActionBar() {
  return (
    <div className="mobile-action-bar fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/72 px-3 pt-3 shadow-2xl shadow-black backdrop-blur-2xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a href={`tel:${site.phone}`} className="rounded-2xl border border-white/10 bg-white/10 px-3 py-3 text-center text-xs font-black text-white">{ui.mobileCall}</a>
        <a href="#anfrage" className="rounded-2xl bg-amber-300 px-3 py-3 text-center text-xs font-black text-stone-950">{ui.mobileInquiry}</a>
        <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noreferrer" className="rounded-2xl bg-emerald-300 px-3 py-3 text-center text-xs font-black text-stone-950">{ui.mobileWhatsapp}</a>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-200">{eyebrow}</p>
      <h2 className="section-title mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h2>
      {text ? <p className="mt-5 text-lg leading-8 text-stone-300">{text}</p> : null}
    </div>
  );
}

function ActionLink({ href, children, external = false, variant }: { href: string; children: ReactNode; external?: boolean; variant: 'primary' | 'whatsapp' | 'ghost' }) {
  const classes = {
    primary: 'bg-amber-300 text-stone-950 shadow-amber-400/25 hover:bg-amber-200',
    whatsapp: 'bg-emerald-300 text-stone-950 shadow-emerald-400/20 hover:bg-emerald-200',
    ghost: 'border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/15',
  }[variant];

  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={`rounded-full px-7 py-4 text-center font-black shadow-xl transition hover:-translate-y-0.5 ${classes}`}>
      {children}
    </a>
  );
}

function TrustItem({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] bg-black/20 p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-xl">{icon}</span>
        <div>
          <p className="font-black text-white">{title}</p>
          <p className="text-sm text-stone-400">{text}</p>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-200">{title}</p>
      <p className="mt-2 leading-7 text-stone-200">{text}</p>
    </div>
  );
}

function FormField({ label, htmlFor, className = '', required = false, badge, children }: { label: string; htmlFor: string; className?: string; required?: boolean; badge?: string; children: ReactNode }) {
  return (
    <label className={`block ${className}`} htmlFor={htmlFor}>
      <span className="flex flex-wrap items-center gap-2 text-sm font-bold text-stone-200">
        {label}
        {required ? <span className="rounded-full bg-amber-200/12 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.18em] text-amber-100">Pflicht</span> : null}
        {!required && badge ? <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.18em] text-stone-300">{badge}</span> : null}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function ContactButton({ href, label, value, external = false }: { href: string; label: string; value: string; external?: boolean }) {
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5 transition hover:-translate-y-0.5 hover:bg-black/32">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-100">{label}</p>
      <p className="mt-2 break-all font-black text-white">{value}</p>
    </a>
  );
}

function getCompletion(form: InquiryForm) {
  const values = Object.values(form);
  const filled = values.filter((value) => value.trim()).length;
  return Math.round((filled / values.length) * 100);
}

function buildInquiryText(form: InquiryForm) {
  const formatDate = form.date
    ? new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(`${form.date}T12:00:00`))
    : '';

  return [
    inquiryContent.messageIntro,
    '',
    `${inquiryContent.messageLabels.name}: ${form.name || '-'}`,
    `${inquiryContent.messageLabels.phone}: ${form.phone || '-'}`,
    `${inquiryContent.messageLabels.email}: ${form.email || '-'}`,
    `${inquiryContent.messageLabels.date}: ${formatDate || '-'}`,
    `${inquiryContent.messageLabels.time}: ${form.time || '-'}`,
    `${inquiryContent.messageLabels.people}: ${form.people || '-'}`,
    `${inquiryContent.messageLabels.occasion}: ${form.occasion || '-'}`,
    '',
    `${inquiryContent.messageLabels.message}:`,
    form.message || '-',
  ].join('\n');
}
