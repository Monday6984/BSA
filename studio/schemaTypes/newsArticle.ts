import { defineArrayMember, defineField, defineType } from 'sanity';
import { newsCategories } from './newsCategories';

/** Alt text is required wherever an image is used. */
const altField = defineField({
  name: 'alt',
  title: 'Alternative text',
  type: 'string',
  description:
    'Describe what the image shows for people who cannot see it (e.g. "Residents collecting water at the Isale-Afon borehole").',
  validation: (rule) => rule.required().error('Alt text is required for accessibility.'),
});

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO & sharing' },
    { name: 'editorial', title: 'Editorial notes' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Use sentence case, e.g. "Isale-Afon borehole now serving residents".',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'content',
      description:
        'Forms the article address: /news/<slug>. Click "Generate" to create it from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: { list: [...newsCategories], layout: 'dropdown' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication date',
      type: 'datetime',
      group: 'content',
      description:
        'Controls ordering on the website. Articles dated in the future stay hidden until that time.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on the homepage',
      type: 'boolean',
      group: 'content',
      description:
        'The most recent featured article becomes the large story in "Latest updates". If none is featured, the newest article is used.',
      initialValue: false,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      group: 'content',
      description:
        'Use a real campaign photograph. Set the hotspot so faces stay in frame when cropped.',
      options: { hotspot: true },
      fields: [altField],
      validation: (rule) =>
        rule.required().error('Every published article needs a featured image.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'One or two sentences shown on cards and used as the default search/social description.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet list', value: 'bullet' },
            { title: 'Numbered list', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [altField, defineField({ name: 'caption', title: 'Caption', type: 'string' })],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'content',
      description: 'Optional. Shown as "By …" on the article. Leave empty rather than guessing.',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      description: 'Optional. Falls back to the article title.',
      validation: (rule) =>
        rule.max(70).warning('Search engines usually truncate titles over ~60–70 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Optional. Falls back to the excerpt.',
      validation: (rule) =>
        rule.max(160).warning('Descriptions over ~160 characters are usually truncated.'),
    }),
    defineField({
      name: 'socialImage',
      title: 'Social sharing image',
      type: 'image',
      group: 'seo',
      description:
        'Optional. Shown when the article is shared on social media. Falls back to the featured image.',
      options: { hotspot: true },
      fields: [altField],
    }),
    defineField({
      name: 'editorialNote',
      title: 'Editorial note',
      type: 'text',
      rows: 4,
      group: 'editorial',
      description:
        'Internal only — never shown on the website. Record facts that still need confirmation before publishing.',
    }),
  ],
  orderings: [
    {
      title: 'Publication date, newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      category: 'category',
      date: 'publishedAt',
      featured: 'featured',
    },
    prepare({ title, media, category, date, featured }) {
      const label = newsCategories.find((c) => c.value === category)?.title ?? 'No category';
      const when = date ? new Date(date).toLocaleDateString('en-GB') : 'No date';
      return { title, media, subtitle: `${featured ? '★ ' : ''}${label} · ${when}` };
    },
  },
});
