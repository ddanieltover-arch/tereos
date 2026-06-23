import { defineField, defineType } from 'sanity';

export const downloadDocument = defineType({
  name: 'downloadDocument',
  title: 'Download Documents',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localizedString', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Brochure', value: 'brochure' },
          { title: 'Catalog', value: 'catalog' },
          { title: 'Annual Report', value: 'annual-report' },
          { title: 'Sustainability Report', value: 'sustainability-report' },
          { title: 'Certification', value: 'certification' },
          { title: 'Presentation', value: 'presentation' },
          { title: 'IR Document', value: 'ir-document' },
        ],
      },
    }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: { list: ['en', 'fr', 'pt-br', 'cs', 'th', 'id', 'all'] },
    }),
    defineField({ name: 'file', title: 'File', type: 'file' }),
    defineField({
      name: 'fileUrl',
      title: 'File URL (fallback)',
      type: 'url',
      description: 'Public path e.g. /downloads/annual-report-2024-25.pdf when not using Sanity file upload',
    }),
    defineField({
      name: 'documentKey',
      title: 'Document registry key',
      type: 'string',
      description: 'Optional id matching lib/content/documents.ts',
    }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image' }),
    defineField({ name: 'imageUrl', title: 'Cover Image URL (fallback)', type: 'url' }),
    defineField({ name: 'gated', title: 'Require Email to Download', type: 'boolean', initialValue: false }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title.en', year: 'year' },
  },
});
