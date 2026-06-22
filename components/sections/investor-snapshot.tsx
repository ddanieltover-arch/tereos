
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, FileText, BarChart3, Shield } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { cn } from '@/lib/utils';

interface InvestorSnapshotProps {
  title: string;
  description: string;
  cta: { label: string; href: string };
  reports?: Array<{ title: string; year: number; url: string }>;
}

export function InvestorSnapshot({ title, description, cta, reports = [] }: InvestorSnapshotProps) {
  const demoReports = reports.length > 0 ? reports : [
    { title: 'Annual Report 2025', year: 2025, url: '#' },
    { title: 'Q1 Financial Results', year: 2026, url: '#' },
    { title: 'Sustainability Report', year: 2025, url: '#' },
  ];

  const highlights = [
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Revenue Growth', value: '+12.5%', color: 'text-accent-green' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'EBITDA Margin', value: '18.3%', color: 'text-secondary' },
    { icon: <Shield className="w-5 h-5" />, label: 'Credit Rating', value: 'BBB+', color: 'text-primary' },
  ];

  return (
    <section className="py-section bg-neutral-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <FadeIn direction="left">
            <div>
              <span className="inline-block text-label uppercase tracking-widest text-secondary font-semibold mb-4">
                For Investors
              </span>
              <h2 className="text-h2 font-bold text-neutral-900 mb-6 text-balance">{title}</h2>
              <p className="text-body-lg text-neutral-600 leading-relaxed mb-8 text-balance">{description}</p>

              {/* Financial Highlights */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {highlights.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl border border-neutral-100">
                    <div className={cn("mb-2 flex justify-center", item.color)}>{item.icon}</div>
                    <div className="text-xl font-bold text-neutral-900">{item.value}</div>
                    <div className="text-xs text-neutral-500 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href={cta.href}
                className={cn(
                  "group inline-flex items-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary-dark",
                  "text-white font-semibold rounded-full transition-all duration-300",
                  "hover:shadow-lg hover:shadow-secondary/25 hover:-translate-y-0.5"
                )}
              >
                {cta.label}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          {/* Right - Reports List */}
          <FadeIn direction="right" delay={0.2}>
            <div className="bg-white rounded-2xl border border-neutral-100 p-8 shadow-card">
              <h3 className="text-h4 font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                Latest Publications
              </h3>
              <div className="space-y-4">
                {demoReports.map((report, index) => (
                  <motion.a
                    key={index}
                    href={report.url}
                    className={cn(
                      "group flex items-center gap-4 p-4 rounded-xl",
                      "bg-neutral-50 hover:bg-secondary/5 border border-transparent hover:border-secondary/20",
                      "transition-all duration-300"
                    )}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-12 h-16 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-secondary transition-colors truncate">
                        {report.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-0.5">{report.year}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
