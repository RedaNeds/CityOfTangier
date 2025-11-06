import { defineType, defineField } from 'sanity'

export const itinerary = defineType({
  name: 'itinerary',
  title: 'Itinerary',
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
      name: 'duration',
      title: 'Duration',
      type: 'string',
      options: {
        list: [
          { title: 'Half Day (2-4 hours)', value: 'half-day' },
          { title: 'Full Day (6-8 hours)', value: 'full-day' },
          { title: 'Weekend (2-3 days)', value: 'weekend' },
          { title: 'Week (5-7 days)', value: 'week' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Moderate', value: 'moderate' },
          { title: 'Challenging', value: 'challenging' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'budget',
      title: 'Budget',
      type: 'string',
      options: {
        list: [
          { title: 'Budget (€0-50)', value: 'budget' },
          { title: 'Mid-range (€50-150)', value: 'mid-range' },
          { title: 'Luxury (€150+)', value: 'luxury' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'totalStops',
      title: 'Total Stops',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'totalDuration',
      title: 'Total Duration',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'periods',
      title: 'Itinerary Periods',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'period',
          title: 'Period',
          fields: [
            {
              name: 'title',
              title: 'Period Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'stops',
              title: 'Stops',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'stop',
                  title: 'Stop',
                  fields: [
                    {
                      name: 'title',
                      title: 'Stop Title',
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
                      name: 'duration',
                      title: 'Duration',
                      type: 'string',
                    },
                    {
                      name: 'place',
                      title: 'Related Place',
                      type: 'reference',
                      to: [{ type: 'place' }],
                    },
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
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tips',
      title: 'Travel Tips',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tip',
          title: 'Tip',
          fields: [
            {
              name: 'title',
              title: 'Tip Title',
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
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Transportation', value: 'transportation' },
                  { title: 'Food', value: 'food' },
                  { title: 'Safety', value: 'safety' },
                  { title: 'Culture', value: 'culture' },
                  { title: 'Budget', value: 'budget' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'transportation',
      title: 'Transportation',
      type: 'object',
      fields: [
        {
          name: 'primary',
          title: 'Primary Transportation',
          type: 'string',
          options: {
            list: [
              { title: 'Walking', value: 'walking' },
              { title: 'Public Transport', value: 'public-transport' },
              { title: 'Taxi', value: 'taxi' },
              { title: 'Car', value: 'car' },
              { title: 'Mixed', value: 'mixed' },
            ],
          },
        },
        {
          name: 'notes',
          title: 'Transportation Notes',
          type: 'text',
          rows: 3,
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
      description: 'Show this itinerary in featured sections',
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
      subtitle: 'duration',
      media: 'featuredImage',
    },
  },
  orderings: [
    {
      title: 'Published Date',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})



