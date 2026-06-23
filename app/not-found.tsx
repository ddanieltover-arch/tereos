'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const i18nCopy = {
  en: {
    title: 'Page Not Found',
    description:
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    backHome: 'Back to Home',
  },
  th: {
    title: 'ไม่พบหน้า',
    description: 'หน้าที่คุณกำลังค้นหาอาจถูกย้าย เปลี่ยนชื่อ หรือไม่พร้อมใช้งานชั่วคราว',
    backHome: 'กลับหน้าแรก',
  },
  'pt-br': {
    title: 'Página não encontrada',
    description: 'A página que você procura pode ter sido removida, renomeada ou estar temporariamente indisponível.',
    backHome: 'Voltar para a página inicial',
  },
  fr: {
    title: 'Page introuvable',
    description: 'La page que vous recherchez a peut-être été supprimée, renommée ou temporairement indisponible.',
    backHome: "Retour à l'accueil",
  },
  cs: {
    title: 'Stránka nenalezena',
    description: 'Stránka, kterou hledáte, mohla být odstraněna, přejmenována nebo je dočasně nedostupná.',
    backHome: 'Zpět na úvod',
  },
  id: {
    title: 'Halaman tidak ditemukan',
    description: 'Halaman yang Anda cari mungkin telah dihapus, diganti nama, atau sementara tidak tersedia.',
    backHome: 'Kembali ke Beranda',
  },
} as const;

type SupportedLocale = keyof typeof i18nCopy;

function getLocaleFromNavigator(value?: string): SupportedLocale {
  if (!value) return 'en';
  const lower = value.toLowerCase();
  if (lower.startsWith('pt')) return 'pt-br';
  if (lower.startsWith('th')) return 'th';
  if (lower.startsWith('fr')) return 'fr';
  if (lower.startsWith('cs')) return 'cs';
  if (lower.startsWith('id')) return 'id';
  return 'en';
}

export default function GlobalNotFound() {
  const [locale, setLocale] = useState<SupportedLocale>('en');

  useEffect(() => {
    setLocale(getLocaleFromNavigator(window.navigator.language));
  }, []);

  const copy = useMemo(() => i18nCopy[locale], [locale]);

  return (
    <html lang={locale}>
      <body>
        <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#4A4A4A', marginBottom: '1rem' }}>{copy.title}</h2>
            <p style={{ color: '#737373', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
              {copy.description}
            </p>
            <Link 
              href={`/${locale}`}
              style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#E30613', color: 'white', fontWeight: '600', borderRadius: '9999px', textDecoration: 'none' }}
            >
              {copy.backHome}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
