
import { Leaf, Handshake, Lightbulb, Shield, Users, TrendingUp } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { CareerValue } from '@/lib/content/careers';

const VALUE_ICONS = [Leaf, Handshake, Lightbulb, Shield, Users, TrendingUp];

interface CareerValuesProps {
  title: string;
  description: string;
  values: CareerValue[];
}

export function CareerValues({ title, description, values }: CareerValuesProps) {
  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-h3 font-bold text-neutral-900 mb-4">{title}</h2>
          <p className="text-neutral-600 leading-relaxed">{description}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = VALUE_ICONS[index] ?? Leaf;
            return (
              <FadeIn key={value.id} delay={index * 0.05}>
                <article className="h-full p-6 rounded-2xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:shadow-card transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    <Icon className="w-6 h-6" aria-hidden />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{value.description}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
