
import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Users, Globe, GraduationCap, Heart } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { JobListings } from '@/components/careers/job-listings';
import { CareerValues } from '@/components/careers/career-values';
import { CareerTestimonials } from '@/components/careers/career-testimonials';
import { AtsPortalBanner } from '@/components/careers/ats-portal-banner';
import { FadeIn } from '@/components/animations/fade-in';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  getAtsPortalJobsUrl,
  isExternalAtsEnabled,
} from '@/lib/careers/ats';
import {
  careerStats,
  careerTestimonials,
  careerValues,
} from '@/lib/content/careers';
import { JOB_DEPARTMENT_LABELS, fallbackJobs } from '@/lib/content/sprint4';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.careers' });
  return { title: t('title'), description: t('description') };
}

const BENEFIT_ICONS = [Globe, GraduationCap, Heart, Users];

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.careers' });
  const useExternalAts = isExternalAtsEnabled();
  const atsPortalUrl = getAtsPortalJobsUrl();

  const benefits = [
    { title: t('benefit1Title'), description: t('benefit1Desc') },
    { title: t('benefit2Title'), description: t('benefit2Desc') },
    { title: t('benefit3Title'), description: t('benefit3Desc') },
    { title: t('benefit4Title'), description: t('benefit4Desc') },
  ];

  const stats = careerStats.map((stat) => ({
    value: stat.value,
    label: t(stat.labelKey),
  }));

  return (
    <>
      <PageHero eyebrow="Tereos" title={t('title')} description={t('description')} />

      <section className="py-section bg-neutral-50">
        <div className="container-custom">
          <FadeIn className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-h3 font-bold text-neutral-900 mb-4">{t('whyTitle')}</h2>
            <p className="text-neutral-600">{t('whyDescription')}</p>
          </FadeIn>

          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-6 bg-white rounded-2xl border border-neutral-100">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-neutral-500 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <FadeIn key={benefit.title} delay={i * 0.05}>
                  <div className="p-6 bg-white rounded-2xl border border-neutral-100 h-full">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                      <Icon className="w-6 h-6" aria-hidden />
                    </div>
                    <h3 className="font-bold text-neutral-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-neutral-500">{benefit.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <CareerValues
        title={t('valuesTitle')}
        description={t('valuesDescription')}
        values={careerValues}
      />

      <CareerTestimonials
        title={t('testimonialsTitle')}
        description={t('testimonialsDescription')}
        testimonials={careerTestimonials}
      />

      <section className="py-section bg-white">
        <div className="container-custom">
          <h2 className="text-h3 font-bold text-neutral-900 mb-2">{t('openingsTitle')}</h2>
          <p className="text-neutral-600 mb-10">{t('openingsDescription')}</p>

          {useExternalAts && atsPortalUrl && (
            <AtsPortalBanner
              portalUrl={atsPortalUrl}
              title={t('atsTitle')}
              description={t('atsDescription')}
              ctaLabel={t('atsCta')}
            />
          )}

          <JobListings
            jobs={fallbackJobs}
            locale={locale}
            useExternalAts={useExternalAts}
            departmentLabels={JOB_DEPARTMENT_LABELS}
            labels={{
              all: t('all'),
              apply: t('apply'),
              applyExternal: t('applyExternal'),
              noResults: t('noResults'),
              fullTime: t('fullTime'),
              partTime: t('partTime'),
              contract: t('contract'),
              internship: t('internship'),
              applyTitle: t('applyTitle'),
              applyDescription: t('applyDescription'),
              firstName: t('firstName'),
              lastName: t('lastName'),
              email: t('email'),
              message: t('message'),
              submit: t('submit'),
              success: t('applySuccess'),
              error: t('applyError'),
            }}
          />
        </div>
      </section>

      <section className="py-section bg-primary text-white">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-h3 font-bold mb-4">{t('graduateTitle')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('graduateDescription')}</p>
            {useExternalAts && atsPortalUrl ? (
              <Link
                href={atsPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'secondary' }))}
              >
                {t('graduateCta')}
              </Link>
            ) : (
              <Link href={`/${locale}/contact`} className={cn(buttonVariants({ variant: 'secondary' }))}>
                {t('graduateCta')}
              </Link>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
