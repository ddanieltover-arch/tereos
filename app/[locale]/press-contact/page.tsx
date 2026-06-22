
import Link from 'next/link';
import { Mail, Phone, Clock, ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { PressContactForm } from '@/components/press/press-contact-form';
import { FadeIn } from '@/components/animations/fade-in';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import {
  PRESS_CONTACT,
  pressInquiries,
  pressIntro,
  pressResources,
  pressTeam,
} from '@/lib/content/press';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.pressContact' });
  return { title: t('title'), description: t('description') };
}

export default async function PressContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.pressContact' });
  const tNews = await getTranslations({ locale, namespace: 'pages.news' });

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(locale, [
          { name: tNews('title'), url: '/news-media' },
          { name: t('title'), url: '/press-contact' },
        ])}
      />
      <PageHero eyebrow="Tereos Açúcar e Energia" title={t('title')} description={t('description')} />

      <section className="py-section bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-16">
          <FadeIn direction="left">
            <div className="space-y-8">
              {pressIntro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-neutral-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 space-y-5">
                <a
                  href={`mailto:${PRESS_CONTACT.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{t('emailLabel')}</h3>
                    <p className="text-primary group-hover:underline mt-1">{PRESS_CONTACT.email}</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{t('phoneLabel')}</h3>
                    <p className="text-neutral-600 mt-1">{PRESS_CONTACT.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-5 h-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{t('hoursLabel')}</h3>
                    <p className="text-neutral-600 mt-1">{PRESS_CONTACT.hours}</p>
                    <p className="text-sm text-neutral-500 mt-2">{PRESS_CONTACT.responseTime}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-h4 font-bold text-neutral-900 mb-4">{t('teamTitle')}</h3>
                <ul className="space-y-4">
                  {pressTeam.map((member) => (
                    <li
                      key={member.id}
                      className="p-5 rounded-xl border border-neutral-100 bg-white"
                    >
                      <p className="font-semibold text-neutral-900">{member.name}</p>
                      <p className="text-sm text-neutral-500 mt-1">{member.role}</p>
                      <p className="text-xs text-neutral-400 mt-1">{member.region}</p>
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-block text-sm text-primary font-medium mt-3 hover:underline"
                      >
                        {member.email}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <h2 className="text-h4 font-bold text-neutral-900 mb-6">{t('formTitle')}</h2>
            <PressContactForm
              labels={{
                firstName: t('firstName'),
                lastName: t('lastName'),
                email: t('email'),
                phone: t('phone'),
                outlet: t('outlet'),
                inquiryType: t('inquiryType'),
                selectInquiry: t('selectInquiry'),
                deadline: t('deadline'),
                subject: t('subject'),
                message: t('message'),
                submit: t('submit'),
                successTitle: t('successTitle'),
                successMessage: t('successMessage'),
                error: t('error'),
                inquiryInterview: t('inquiryInterview'),
                inquiryRelease: t('inquiryRelease'),
                inquiryAssets: t('inquiryAssets'),
                inquiryEsg: t('inquiryEsg'),
                inquiryEvent: t('inquiryEvent'),
                inquiryOther: t('inquiryOther'),
              }}
            />
          </FadeIn>
        </div>
      </section>

      <section className="py-section bg-neutral-50">
        <div className="container-custom">
          <FadeIn className="mb-10">
            <h2 className="text-h3 font-bold text-neutral-900 mb-2">{t('inquiriesTitle')}</h2>
            <p className="text-neutral-600">{t('inquiriesDescription')}</p>
          </FadeIn>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {pressInquiries.map((item, index) => (
              <FadeIn key={item} delay={index * 0.04}>
                <li className="p-4 bg-white rounded-xl border border-neutral-100 text-sm text-neutral-700">
                  {item}
                </li>
              </FadeIn>
            ))}
          </ul>

          <FadeIn>
            <h2 className="text-h3 font-bold text-neutral-900 mb-2">{t('resourcesTitle')}</h2>
            <p className="text-neutral-600 mb-8">{t('resourcesDescription')}</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressResources.map((resource, index) => (
              <FadeIn key={resource.id} delay={index * 0.05}>
                <Link
                  href={`/${locale}${resource.href}`}
                  className="group block h-full p-5 bg-white rounded-2xl border border-neutral-100 hover:shadow-card hover:-translate-y-1 transition-all"
                >
                  <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-2 leading-relaxed">{resource.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-all">
                    {t('viewResource')} <ArrowRight className="w-4 h-4" aria-hidden />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
