'use client';

import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#4A4A4A', marginBottom: '1rem' }}>Page Not Found</h2>
            <p style={{ color: '#737373', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link 
              href="/en" 
              style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#E30613', color: 'white', fontWeight: '600', borderRadius: '9999px', textDecoration: 'none' }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
