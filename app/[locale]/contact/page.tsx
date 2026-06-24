
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { ContactForm } from '@/components/forms/contact-form';
import { PageHero } from '@/components/shared/page-hero';
import {
  BRAZIL_OFFICE_ADDRESS,
  COMPANY_PHONE,
  COMPANY_PHONE_HREF,
  THAILAND_OFFICE_ADDRESS,
} from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return { title: t('title'), description: t('description') };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      <section className="py-section bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-16">
          <FadeIn direction="left">
            <div className="space-y-8">
              {[
                { icon: Mail, label: t('email'), value: 'sales@tereosa.com' },
                { icon: Phone, label: t('phone'), value: COMPANY_PHONE, href: COMPANY_PHONE_HREF },
                { icon: MapPin, label: t('addressThailand'), value: THAILAND_OFFICE_ADDRESS },
                { icon: MapPin, label: t('addressBrazil'), value: BRAZIL_OFFICE_ADDRESS },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">{label}</h4>
                    {href ? (
                      <a href={href} className="text-neutral-600 mt-1 hover:text-primary transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-neutral-600 mt-1">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.15}>
            <ContactForm
              labels={{
                firstName: t('firstName'),
                lastName: t('lastName'),
                email: t('email'),
                phone: t('phone'),
                department: t('department'),
                subject: t('subject'),
                message: t('message'),
                attachment: t('attachment'),
                attachmentComingSoon: t('attachmentComingSoon'),
                submit: t('submit'),
                selectDepartment: t('selectDepartment'),
                successTitle: t('successTitle'),
                successMessage: t('successMessage'),
                error: t('error'),
              }}
            />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
