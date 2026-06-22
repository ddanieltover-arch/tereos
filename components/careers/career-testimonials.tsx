
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { CareerTestimonial } from '@/lib/content/careers';

interface CareerTestimonialsProps {
  title: string;
  description: string;
  testimonials: CareerTestimonial[];
}

export function CareerTestimonials({ title, description, testimonials }: CareerTestimonialsProps) {
  return (
    <section className="py-section bg-neutral-50">
      <div className="container-custom">
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-h3 font-bold text-neutral-900 mb-4">{title}</h2>
          <p className="text-neutral-600 leading-relaxed">{description}</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.05}>
              <figure className="h-full flex flex-col bg-white rounded-2xl border border-neutral-100 p-6 md:p-8">
                <Quote className="w-8 h-8 text-primary/30 mb-4 shrink-0" aria-hidden />
                <blockquote className="text-neutral-700 leading-relaxed flex-1 mb-6">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{item.name}</p>
                    <p className="text-sm text-neutral-500">{item.role}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{item.location}</p>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
