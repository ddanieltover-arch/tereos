'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Send, CheckCircle, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const departments = [
  { value: 'sales', label: 'Sales & Trading', email: 'sales@tereosa.com' },
  { value: 'export', label: 'Export Inquiries', email: 'sales@tereosa.com' },
  { value: 'investor', label: 'Investor Relations', email: 'sales@tereosa.com' },
  { value: 'sustainability', label: 'Sustainability', email: 'sales@tereosa.com' },
  { value: 'media', label: 'Media & Press', email: 'sales@tereosa.com' },
  { value: 'careers', label: 'Careers', email: 'sales@tereosa.com' },
  { value: 'general', label: 'General Inquiry', email: 'sales@tereosa.com' },
];

interface ContactFormProps {
  labels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    subject: string;
    message: string;
    attachment: string;
    submit: string;
    selectDepartment: string;
    successTitle: string;
    successMessage: string;
    error: string;
  };
}

export function ContactForm({ labels }: ContactFormProps) {
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
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
        <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">{labels.successTitle}</h3>
        <p className="text-neutral-600">{labels.successMessage}</p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors';

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-card">
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
      )}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="contact-firstName" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {labels.firstName} *
          </label>
          <input
            id="contact-firstName"
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-lastName" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {labels.lastName} *
          </label>
          <input
            id="contact-lastName"
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
          <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {labels.email} *
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
            {labels.phone}
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="contact-department" className="block text-sm font-medium text-neutral-700 mb-1.5">
          {labels.department} *
        </label>
        <select
          id="contact-department"
          name="department"
          required
          value={formData.department}
          onChange={handleChange}
          className={cn(inputClass, 'bg-white')}
        >
          <option value="">{labels.selectDepartment}</option>
          {departments.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="contact-subject" className="block text-sm font-medium text-neutral-700 mb-1.5">
          {labels.subject} *
        </label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-700 mb-1.5">
          {labels.message} *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={cn(inputClass, 'resize-none')}
        />
      </div>
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm text-neutral-500 cursor-pointer">
          <Paperclip className="w-4 h-4" />
          <span>{labels.attachment}</span>
          <input type="file" className="hidden" accept=".pdf,.doc,.docx" disabled title="Coming soon" />
        </label>
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
        <Send className="w-5 h-5" />
        {loading ? '...' : labels.submit}
      </Button>
    </form>
  );
}
