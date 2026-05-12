import type { Metadata, Viewport } from 'next';
import './globals.css';
import { meta, site } from '@/lib/site';

export const viewport: Viewport = {
  themeColor: '#070a07',
};

export const metadata: Metadata = {
  metadataBase: new URL(meta.metadataBase),
  title: `${site.name} | ${meta.titleSuffix}`,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: `${site.name} | ${meta.titleSuffix}`,
    description: meta.openGraphDescription,
    url: '/',
    siteName: site.name,
    images: [
      {
        url: meta.openGraphImage,
        width: 1200,
        height: 630,
        alt: meta.openGraphImageAlt,
      },
    ],
    locale: meta.locale,
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
