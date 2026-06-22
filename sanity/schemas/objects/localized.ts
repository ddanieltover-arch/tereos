import { defineField, defineType } from 'sanity';

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'th', title: 'Thai', type: 'string' }),
    defineField({ name: 'ptBr', title: 'Portuguese (BR)', type: 'string' }),
  ],
});

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
    defineField({ name: 'th', title: 'Thai', type: 'text', rows: 4 }),
    defineField({ name: 'ptBr', title: 'Portuguese (BR)', type: 'text', rows: 4 }),
  ],
});
