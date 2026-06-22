import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'localizedString', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sugar', value: 'sugar' },
          { title: 'Bioenergy', value: 'bioenergy' },
          { title: 'Agriculture', value: 'agriculture' },
          { title: 'Food Ingredients', value: 'food-ingredients' },
          { title: 'Renewable Solutions', value: 'renewable' },
        ],
      },
    }),
    defineField({ name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageUrl', title: 'Image URL (fallback)', type: 'url' }),
    defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
    defineField({ name: 'featured', title: 'Featured on Home', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'name.en', media: 'image' },
  },
});
