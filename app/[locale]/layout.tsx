
import { Inter, JetBrains_Mono, Noto_Sans_Thai } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { OPEN_GRAPH_LOCALE, HTML_LANG } from '@/lib/i18n/locale-meta';
import { getAlternateLanguages, getCanonicalUrl } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/schemas';
import { getSiteUrl, OG_IMAGE } from '@/lib/site';
import { JsonLd } from '@/components/seo/json-ld';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollProgress } from '@/components/animations/scroll-progress';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  variable: '--font-thai',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: '%s | Tereos Açúcar e Energia S.A.',
      default: t('title'),
    },
    description: t('description'),
    keywords: [
      'Tereos', 'sugar', 'bioenergy', 'agriculture', 'Thailand',
      'renewable energy', 'sustainability', 'food ingredients',
      'corporate', 'investor relations', 'ESG'
    ],
    authors: [{ name: 'Tereos Açúcar e Energia S.A.' }],
    creator: 'Tereos Açúcar e Energia S.A.',
    publisher: 'Tereos Açúcar e Energia S.A.',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: OPEN_GRAPH_LOCALE[locale as Locale] ?? 'en_US',
      url: getCanonicalUrl(locale),
      siteName: 'Tereos Açúcar e Energia S.A.',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: `${siteUrl}${OG_IMAGE.path}`,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: OG_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${siteUrl}${OG_IMAGE.path}`],
    },
    alternates: {
      canonical: getCanonicalUrl(locale),
      languages: getAlternateLanguages(),
    },
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <html
      lang={HTML_LANG[locale as Locale] ?? locale}
      className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansThai.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={[generateOrganizationSchema(), generateWebSiteSchema(locale)]} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#E30613" />
      </head>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers
            cookieLabels={{
              message: tCommon('cookieMessage'),
              accept: tCommon('cookieAccept'),
              decline: tCommon('cookieDecline'),
              privacy: tCommon('cookiePrivacy'),
            }}
          >
            <div className="flex min-h-screen flex-col">
              <ScrollProgress />
              <Header />
              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
