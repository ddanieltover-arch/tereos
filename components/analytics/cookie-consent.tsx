'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'tereosa-cookie-consent';

interface CookieConsentProps {
  labels: {
    message: string;
    accept: string;
    decline: string;
    privacy: string;
  };
  privacyHref: string;
  onConsentChange: (accepted: boolean) => void;
}

export function CookieConsent({ labels, privacyHref, onConsentChange }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') {
      onConsentChange(true);
      return;
    }
    if (stored === 'declined') {
      onConsentChange(false);
      return;
    }
    setVisible(true);
  }, [onConsentChange]);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    onConsentChange(true);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
    onConsentChange(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 inset-x-0 z-[70] p-4 sm:p-6"
    >
      <div className="container-custom">
        <div className="mx-auto max-w-4xl rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-elevated">
          <h2 id="cookie-consent-title" className="text-sm font-bold text-neutral-900 mb-2">
            Cookies & Analytics
          </h2>
          <p id="cookie-consent-desc" className="text-sm text-neutral-600 leading-relaxed mb-4">
            {labels.message}{' '}
            <a href={privacyHref} className="text-primary underline underline-offset-2">
              {labels.privacy}
            </a>
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm" onClick={handleAccept}>
              {labels.accept}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDecline}>
              {labels.decline}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
