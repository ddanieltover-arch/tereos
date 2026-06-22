'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CountUp } from '@/components/animations/count-up';
import { FadeIn } from '@/components/animations/fade-in';
import { cn } from '@/lib/utils';
import type { ESGTab } from '@/lib/content/pages';

interface ESGDashboardProps {
  tabs: ESGTab[];
  reports: { title: string; year: number; fileUrl?: string }[];
  labels: {
    reports: string;
    target: string;
    download: string;
  };
}

export function ESGDashboard({ tabs, reports, labels }: ESGDashboardProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 'carbon');
  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10 border-b border-neutral-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-5 py-2.5 text-sm font-semibold rounded-full transition-colors relative',
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-h3 font-bold text-neutral-900 mb-3">{current.headline}</h3>
          <p className="text-neutral-600 mb-8 max-w-2xl">{current.description}</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {current.metrics.map((metric) => (
              <div key={metric.label} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-neutral-700">{metric.label}</span>
                  <span className="text-neutral-500">
                    {labels.target}: {metric.target}
                    {metric.suffix}
                  </span>
                </div>
                <div className="h-3 bg-neutral-200 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-accent-green rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <p className="text-2xl font-bold text-neutral-900">
                  <CountUp end={metric.value} suffix={metric.suffix} />
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <FadeIn>
        <h3 className="text-h4 font-bold text-neutral-900 mb-6">{labels.reports}</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div
              key={report.title}
              className="p-5 rounded-xl border border-neutral-200 hover:border-primary/30 hover:shadow-subtle transition-all"
            >
              <p className="font-semibold text-neutral-900">{report.title}</p>
              <p className="text-sm text-neutral-500 mt-1">{report.year}</p>
              {report.fileUrl ? (
                <a
                  href={report.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary mt-4 inline-block hover:underline"
                >
                  {labels.download} →
                </a>
              ) : (
                <span className="text-sm text-neutral-400 mt-4 inline-block">{labels.download} →</span>
              )}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
