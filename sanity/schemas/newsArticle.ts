import { defineField, defineType } from 'sanity';

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News & Press Releases',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localizedString', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Press Release', value: 'press-release' },
          { title: 'Announcement', value: 'announcement' },
          { title: 'News', value: 'news' },
          { title: 'Media', value: 'media' },
          { title: 'Sustainability', value: 'sustainability' },
          { title: 'Investor', value: 'investor' },
          { title: 'Community', value: 'community' },
        ],
      },
    }),
    defineField({ name: 'publishedAt', title: 'Publish Date', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageUrl', title: 'Image URL (fallback)', type: 'url' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'localizedText' }),
    defineField({ name: 'body', title: 'Body', type: 'localizedText' }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'pdfFile', title: 'Press release PDF', type: 'file' }),
    defineField({
      name: 'pdfUrl',
      title: 'Press release PDF URL (fallback)',
      type: 'url',
      description: 'Public path e.g. /downloads/press-annual-results-2025-26.pdf',
    }),
  ],
  orderings: [
    { title: 'Published Date, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title.en', date: 'publishedAt', media: 'heroImage' },
  },
});
