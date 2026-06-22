'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import type { JobPosting } from '@/types';

interface JobApplyModalProps {
  job: JobPosting | null;
  onClose: () => void;
  labels: {
    title: string;
    description: string;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
}

export function JobApplyModal({ job, onClose, labels }: JobApplyModalProps) {
  const locale = useLocale();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          department: 'careers',
          subject: `Application: ${job.title}`,
          message: `Position: ${job.title} (${job.slug})\nLocation: ${job.location}\n\n${form.message}`,
          locale,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(labels.error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setSubmitted(false);
      setForm({ firstName: '', lastName: '', email: '', message: '' });
      setError('');
    }
  };

  return (
    <Modal open={!!job} onOpenChange={handleOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{labels.title}</ModalTitle>
          <ModalDescription>
            {job?.title} — {labels.description}
          </ModalDescription>
        </ModalHeader>
        {submitted ? (
          <p className="text-primary font-medium py-4">{labels.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                name="firstName"
                placeholder={labels.firstName}
                value={form.firstName}
                onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                className="px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary"
              />
              <input
                required
                name="lastName"
                placeholder={labels.lastName}
                value={form.lastName}
                onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                className="px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <input
              required
              type="email"
              name="email"
              placeholder={labels.email}
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary"
            />
            <textarea
              required
              name="message"
              rows={4}
              placeholder={labels.message}
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary resize-none"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {labels.submit}
            </Button>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
