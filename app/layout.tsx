import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/lib/site';

export const viewport: Viewport = {
  themeColor: '#070a07',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://grillhuette-gute-hoffnung.de'),
  title: `${site.name} | Grillhütte am Waldrand`,
  description:
    'Grillhütte Gute Hoffnung Münster: Grillhütte am Waldrand für Familienfeiern, Geburtstage und Vereinsabende. Mit Außengelände, Freisitz, Spielgeräten und Seilbahn.',
  keywords: [
    'Grillhütte Gute Hoffnung',
    'Grillhütte Münster',
    'Grillhütte mieten',
    'Münster',
    'Familienfeier',
    'Geburtstag',
    'Vereinsfeier',
    'Grillplatz',
  ],
  openGraph: {
    title: `${site.name} | Grillhütte am Waldrand`,
    description:
      'Grillhütte am Waldrand in Münster für Feiern, Grillabende und Veranstaltungen. Anfrage bequem per WhatsApp oder E-Mail vorbereiten.',
    url: '/',
    siteName: site.name,
    images: [
      {
        url: '/og-grillhuette.jpg',
        width: 1200,
        height: 630,
        alt: 'Grillhütte Gute Hoffnung Münster',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
