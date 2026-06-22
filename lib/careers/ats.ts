export function getCareersAtsPortalUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_CAREERS_ATS_URL?.trim();
  if (!url) return null;
  return url.replace(/\/$/, '');
}

export function isExternalAtsEnabled(): boolean {
  return !!getCareersAtsPortalUrl();
}

export function getJobApplyUrl(job: {
  slug: string;
  externalId?: string;
  applyUrl?: string;
}): string | null {
  const portal = getCareersAtsPortalUrl();
  if (job.applyUrl) return job.applyUrl;
  if (!portal) return null;
  const jobId = job.externalId || job.slug;
  return `${portal}/jobs/${jobId}`;
}

export function getAtsPortalJobsUrl(): string | null {
  const portal = getCareersAtsPortalUrl();
  if (!portal) return null;
  return `${portal}/jobs`;
}
