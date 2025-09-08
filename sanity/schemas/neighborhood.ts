import { defineType, defineField } from 'sanity'

export const neighborhood = defineType({
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'coordinates',
          title: 'Coordinates',
          type: 'object',
          fields: [
            {
              name: 'lat',
              title: 'Latitude',
              type: 'number',
            },
            {
              name: 'lng',
              title: 'Longitude',
              type: 'number',
            },
          ],
        },
        {
          name: 'bounds',
          title: 'Map Bounds',
          type: 'object',
          fields: [
            {
              name: 'north',
              title: 'North',
              type: 'number',
            },
            {
              name: 'south',
              title: 'South',
              type: 'number',
            },
            {
              name: 'east',
              title: 'East',
              type: 'number',
            },
            {
              name: 'west',
              title: 'West',
              type: 'number',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'characteristics',
      title: 'Characteristics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'characteristic',
          title: 'Characteristic',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: '🏛️ Historic', value: 'historic' },
                  { title: '🏖️ Beach', value: 'beach' },
                  { title: '🛍️ Shopping', value: 'shopping' },
                  { title: '🍽️ Food', value: 'food' },
                  { title: '🎭 Culture', value: 'culture' },
                  { title: '🌃 Nightlife', value: 'nightlife' },
                  { title: '🏠 Residential', value: 'residential' },
                  { title: '🏢 Business', value: 'business' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'places',
      title: 'Notable Places',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'place' }],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this neighborhood in featured sections',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'featuredImage',
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Published Date',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})



