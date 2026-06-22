# Sanity v3 CMS Schema Reference

## Overview

This file contains production-ready Sanity v3 schema definitions for enterprise corporate websites. Read this during Phase 7 (CMS Schema).

---

## Studio Setup

```bash
# Initialize Sanity studio inside the Next.js project
npm create sanity@latest -- --project <projectId> --dataset production

# Install plugins
npm install @sanity/document-internationalization
npm install @sanity/vision
npm install sanity-plugin-media
```

---

## Schema Index (sanity.config.ts)

```typescript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';

// Import all schemas
import { siteSettings } from './schemas/siteSettings';
import { product } from './schemas/product';
import { newsArticle } from './schemas/newsArticle';
import { businessDivision } from './schemas/businessDivision';
import { downloadDocument } from './schemas/downloadDocument';
import { careerListing } from './schemas/careerListing';
import { teamMember } from './schemas/teamMember';
import { sustainabilityReport } from './schemas/sustainabilityReport';
import { page } from './schemas/page';

export default defineConfig({
  name: 'default',
  title: 'Corporate CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), internationalizedArray({ languages: ['en', 'th', 'pt-br'] })],
  schema: {
    types: [
      siteSettings, product, newsArticle, businessDivision,
      downloadDocument, careerListing, teamMember, sustainabilityReport, page
    ]
  }
});
```

---

## Core Schemas

### siteSettings (Singleton)

```typescript
// schemas/siteSettings.ts
import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Hero Tagline', type: 'internationalizedArrayString' }),
    defineField({ name: 'description', title: 'Meta Description', type: 'internationalizedArrayText' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image' }),
    defineField({ name: 'socialLinks', title: 'Social Links', type: 'object', fields: [
      defineField({ name: 'linkedin', type: 'url' }),
      defineField({ name: 'twitter', type: 'url' }),
      defineField({ name: 'facebook', type: 'url' }),
      defineField({ name: 'youtube', type: 'url' }),
    ]}),
    defineField({ name: 'contactEmail', title: 'Primary Contact Email', type: 'email' }),
    defineField({ name: 'address', title: 'HQ Address', type: 'text' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
  ]
});
```

### product

```typescript
// schemas/product.ts
export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'internationalizedArrayString', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name[0].value' }, validation: R => R.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: {
      list: ['sugar', 'bioenergy', 'agriculture', 'food-ingredients', 'renewable'],
    }}),
    defineField({ name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'description', title: 'Description', type: 'internationalizedArrayText' }),
    defineField({ name: 'longDescription', title: 'Long Description', type: 'internationalizedArrayPortableText' }),
    defineField({ name: 'specifications', title: 'Specifications', type: 'array', of: [{
      type: 'object', fields: [
        defineField({ name: 'label', type: 'string' }),
        defineField({ name: 'value', type: 'string' }),
      ]
    }]}),
    defineField({ name: 'applications', title: 'Applications', type: 'internationalizedArrayText' }),
    defineField({ name: 'downloads', title: 'Product Downloads', type: 'array', of: [{ type: 'file' }] }),
    defineField({ name: 'featured', title: 'Featured on Home', type: 'boolean', initialValue: false }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
  ],
  preview: { select: { title: 'name.0.value', media: 'image' } }
});
```

### newsArticle

```typescript
export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News & Press Releases',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'internationalizedArrayString', validation: R => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title[0].value' }, validation: R => R.required() }),
    defineField({ name: 'category', type: 'string', options: {
      list: ['press-release', 'announcement', 'news', 'media', 'sustainability', 'investor'],
    }}),
    defineField({ name: 'publishedAt', title: 'Publish Date', type: 'datetime', validation: R => R.required() }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', type: 'internationalizedArrayText' }),
    defineField({ name: 'body', type: 'internationalizedArrayPortableText' }),
    defineField({ name: 'author', type: 'string' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'seo', type: 'seoFields' }),
  ],
  orderings: [{ title: 'Published Date, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title.0.value', date: 'publishedAt', media: 'heroImage' } }
});
```

### businessDivision

```typescript
export const businessDivision = defineType({
  name: 'businessDivision',
  title: 'Business Divisions',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'internationalizedArrayString', validation: R => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name[0].value' }, validation: R => R.required() }),
    defineField({ name: 'icon', title: 'Division Icon (SVG or emoji)', type: 'string' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tagline', type: 'internationalizedArrayString' }),
    defineField({ name: 'description', type: 'internationalizedArrayText' }),
    defineField({ name: 'overview', type: 'internationalizedArrayPortableText' }),
    defineField({ name: 'markets', title: 'Markets Served', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'capabilities', type: 'array', of: [{
      type: 'object', fields: [
        defineField({ name: 'title', type: 'internationalizedArrayString' }),
        defineField({ name: 'description', type: 'internationalizedArrayText' }),
      ]
    }]}),
    defineField({ name: 'sustainabilityMetrics', type: 'array', of: [{
      type: 'object', fields: [
        defineField({ name: 'label', type: 'string' }),
        defineField({ name: 'value', type: 'string' }),
        defineField({ name: 'unit', type: 'string' }),
      ]
    }]}),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
```

### downloadDocument

```typescript
export const downloadDocument = defineType({
  name: 'downloadDocument',
  title: 'Downloads',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'internationalizedArrayString', validation: R => R.required() }),
    defineField({ name: 'category', type: 'string', options: {
      list: ['brochure', 'catalog', 'annual-report', 'sustainability-report', 'certification', 'presentation', 'ir-document'],
    }}),
    defineField({ name: 'year', type: 'number', validation: R => R.min(2000).max(2099) }),
    defineField({ name: 'language', type: 'string', options: { list: ['en', 'th', 'pt-br', 'all'] } }),
    defineField({ name: 'file', type: 'file', validation: R => R.required() }),
    defineField({ name: 'coverImage', type: 'image' }),
    defineField({ name: 'gated', title: 'Require Email to Download', type: 'boolean', initialValue: false }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
});
```

### careerListing

```typescript
export const careerListing = defineType({
  name: 'careerListing',
  title: 'Career Listings',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'internationalizedArrayString', validation: R => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title[0].value' } }),
    defineField({ name: 'department', type: 'string', options: {
      list: ['operations', 'engineering', 'finance', 'marketing', 'hr', 'it', 'sustainability', 'logistics', 'research'],
    }}),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'type', type: 'string', options: {
      list: ['full-time', 'part-time', 'contract', 'internship', 'graduate'],
    }}),
    defineField({ name: 'description', type: 'internationalizedArrayPortableText' }),
    defineField({ name: 'requirements', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'benefits', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'closingDate', type: 'date' }),
    defineField({ name: 'active', type: 'boolean', initialValue: true }),
  ],
});
```

### teamMember

```typescript
export const teamMember = defineType({
  name: 'teamMember',
  title: 'Leadership Team',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'title', type: 'internationalizedArrayString' }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', type: 'internationalizedArrayPortableText' }),
    defineField({ name: 'linkedin', type: 'url' }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'group', type: 'string', options: {
      list: ['board', 'executive', 'management'],
    }}),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
```

---

## Reusable Field Groups

### seoFields (object type)

```typescript
// schemas/objects/seoFields.ts
export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'metaTitle', type: 'string', validation: R => R.max(60) }),
    defineField({ name: 'metaDescription', type: 'text', validation: R => R.max(160) }),
    defineField({ name: 'ogImage', title: 'Social Share Image', type: 'image' }),
    defineField({ name: 'noIndex', type: 'boolean', initialValue: false }),
  ]
});
```

---

## GROQ Query Examples

```typescript
// Fetch all active career listings
const careersQuery = `*[_type == "careerListing" && active == true] | order(department asc) {
  _id, title, slug, department, location, type, closingDate
}`;

// Fetch latest 3 news articles
const newsQuery = `*[_type == "newsArticle"] | order(publishedAt desc) [0...3] {
  _id, title, slug, category, publishedAt, heroImage, excerpt
}`;

// Fetch featured products
const productsQuery = `*[_type == "product" && featured == true] {
  _id, name, slug, category, image, description
}`;

// Fetch documents by category and year
const downloadsQuery = `*[_type == "downloadDocument" && category == $category && year == $year] {
  _id, title, category, year, language, file, coverImage
}`;
```
