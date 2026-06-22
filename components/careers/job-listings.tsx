'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin, Clock, Briefcase, ExternalLink } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JobApplyModal } from '@/components/careers/job-apply-modal';
import { getJobApplyUrl } from '@/lib/careers/ats';
import { cn } from '@/lib/utils';
import type { JobPosting } from '@/types';

interface JobListingsProps {
  jobs: JobPosting[];
  departmentLabels: Record<string, string>;
  locale: string;
  useExternalAts: boolean;
  labels: {
    all: string;
    apply: string;
    applyExternal: string;
    noResults: string;
    fullTime: string;
    partTime: string;
    contract: string;
    internship: string;
    applyTitle: string;
    applyDescription: string;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
}

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function JobListings({ jobs, departmentLabels, locale, useExternalAts, labels }: JobListingsProps) {
  const departments = useMemo(
    () => ['all', ...Array.from(new Set(jobs.map((j) => j.department)))],
    [jobs]
  );
  const [department, setDepartment] = useState('all');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  const filtered = useMemo(() => {
    if (department === 'all') return jobs;
    return jobs.filter((j) => j.department === department);
  }, [jobs, department]);

  const getTypeLabel = (type: JobPosting['type']) => {
    const map: Record<JobPosting['type'], string> = {
      'full-time': labels.fullTime,
      'part-time': labels.partTime,
      contract: labels.contract,
      internship: labels.internship,
    };
    return map[type];
  };

  const handleApply = (job: JobPosting) => {
    if (useExternalAts && getJobApplyUrl(job)) return;
    setSelectedJob(job);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() => setDepartment(dept)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              department === dept
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            )}
          >
            {dept === 'all' ? labels.all : departmentLabels[dept] || dept}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-neutral-500 text-center py-16">{labels.noResults}</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((job, i) => {
            const applyUrl = getJobApplyUrl(job);
            const externalApply = useExternalAts && applyUrl;

            return (
              <FadeIn key={job.id} delay={i * 0.05}>
                <article className="p-6 bg-white rounded-2xl border border-neutral-100 hover:shadow-card transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="secondary">{departmentLabels[job.department] || job.department}</Badge>
                        <Badge variant="outline">{getTypeLabel(job.type)}</Badge>
                      </div>
                      <h2 className="text-h4 font-bold text-neutral-900 mb-2">{job.title}</h2>
                      <p className="text-sm text-neutral-500 mb-3 line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-4 h-4" aria-hidden /> {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-4 h-4" aria-hidden /> {formatDate(job.postedAt, locale)}
                        </span>
                      </div>
                    </div>
                    {externalApply ? (
                      <Button variant="primary" asChild>
                        <Link href={applyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                          {labels.applyExternal}
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={() => handleApply(job)}>
                        <Briefcase className="w-4 h-4" />
                        {labels.apply}
                      </Button>
                    )}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      )}

      {!useExternalAts && (
        <JobApplyModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          labels={{
            title: labels.applyTitle,
            description: labels.applyDescription,
            firstName: labels.firstName,
            lastName: labels.lastName,
            email: labels.email,
            message: labels.message,
            submit: labels.submit,
            success: labels.success,
            error: labels.error,
          }}
        />
      )}
    </>
  );
}
