'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PressContactFormProps {
  labels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    outlet: string;
    inquiryType: string;
    selectInquiry: string;
    deadline: string;
    subject: string;
    message: string;
    submit: string;
    successTitle: string;
    successMessage: string;
    error: string;
    inquiryInterview: string;
    inquiryRelease: string;
    inquiryAssets: string;
    inquiryEsg: string;
    inquiryEvent: string;
    inquiryOther: string;
  };
}

const inquiryOptions = [
  { value: 'interview', labelKey: 'inquiryInterview' as const },
  { value: 'release', labelKey: 'inquiryRelease' as const },
  { value: 'assets', labelKey: 'inquiryAssets' as const },
  { value: 'esg', labelKey: 'inquiryEsg' as const },
  { value: 'event', labelKey: 'inquiryEvent' as const },
  { value: 'other', labelKey: 'inquiryOther' as const },
];

export function PressContactForm({ labels }: PressContactFormProps) {
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    outlet: '',
    inquiryType: '',
    deadline: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const inquiryLabel =
      inquiryOptions.find((o) => o.value === formData.inquiryType)?.labelKey ?? 'inquiryOther';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          department: 'media',
          subject: formData.subject,
          message: [
            `Media outlet: ${formData.outlet}`,
            `Inquiry type: ${labels[inquiryLabel]}`,
            formData.deadline ? `Deadline: ${formData.deadline}` : null,
            '',
            formData.message,
          ]
            .filter(Boolean)
            .join('\n'),
          locale,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || labels.error);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-neutral-50 rounded-2xl p-10 text-center">
        <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-4" aria-hidden />
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">{labels.successTitle}</h3>
        <p className="text-neutral-600">{labels.successMessage}</p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-card"
    >
      {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {labels.firstName} *
          </label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {labels.lastName} *
          </label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {labels.email} *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">{labels.phone}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {labels.outlet} *
        </label>
        <input
          type="text"
          name="outlet"
          required
          value={formData.outlet}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {labels.inquiryType} *
          </label>
          <select
            name="inquiryType"
            required
            value={formData.inquiryType}
            onChange={handleChange}
            className={cn(inputClass, 'bg-white')}
          >
            <option value="">{labels.selectInquiry}</option>
            {inquiryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {labels[option.labelKey]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            {labels.deadline}
          </label>
          <input
            type="text"
            name="deadline"
            placeholder="e.g. 24 June 2026, 17:00 ICT"
            value={formData.deadline}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {labels.subject} *
        </label>
        <input
          type="text"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {labels.message} *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
        <Send className="w-5 h-5" />
        {loading ? '...' : labels.submit}
      </Button>
    </form>
  );
}
