'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PRODUCT_CATEGORIES } from '@/lib/content/pages';
import { getTaxonomyForProduct } from '@/lib/content/taxonomy';

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryLabel: string;
  image: string;
}

interface ProductCatalogProps {
  locale: string;
  products: CatalogProduct[];
  initialCategory?: string;
  initialMarket?: string;
  initialLine?: string;
  labels: {
    search: string;
    all: string;
    learnMore: string;
    noResults: string;
  };
}

export function ProductCatalog({
  locale,
  products,
  initialCategory = 'all',
  initialMarket,
  initialLine,
  labels,
}: ProductCatalogProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const taxonomy = getTaxonomyForProduct(p.slug);
      const matchMarket =
        !initialMarket || taxonomy.marketSlugs.includes(initialMarket as never);
      const matchLine =
        !initialLine || taxonomy.productLineSlugs.includes(initialLine as never);
      const matchCat =
        category === 'all' ||
        p.category === category ||
        p.categoryLabel.toLowerCase().includes(category.replace('-', ' '));
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch && matchMarket && matchLine;
    });
  }, [products, category, search, initialMarket, initialLine]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="search"
            placeholder={labels.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                category === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              )}
            >
              {cat.id === 'all' ? labels.all : cat.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-neutral-500 py-16">{labels.noResults}</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <FadeIn key={product.slug} delay={i * 0.03}>
              <Link
                href={`/${locale}/products/${product.slug}`}
                className="group block bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all"
              >
                <div className="relative h-48">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary">{product.categoryLabel}</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{product.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-all">
                    {labels.learnMore} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
