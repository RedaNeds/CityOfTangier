import { defineType, defineField } from 'sanity'

export const museum = defineType({
  name: 'museum',
  title: 'Museum',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Museum Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g., "Museum of Mediterranean Cultures"'
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true }
      }],
      validation: Rule => Rule.max(12)
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'address', type: 'string', title: 'Address' },
        { name: 'city', type: 'string', title: 'City', initialValue: 'Tangier' },
        { name: 'lat', type: 'number', title: 'Latitude' },
        { name: 'lng', type: 'number', title: 'Longitude' }
      ]
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'day', type: 'string', title: 'Day' },
          { name: 'hours', type: 'string', title: 'Hours' },
          { name: 'isOpen', type: 'boolean', title: 'Open?', initialValue: true }
        ]
      }]
    }),
    defineField({
      name: 'ticketPrices',
      title: 'Ticket Prices',
      type: 'object',
      fields: [
        { name: 'adult', type: 'string', title: 'Adult' },
        { name: 'student', type: 'string', title: 'Student' },
        { name: 'child', type: 'string', title: 'Child (under 12)' },
        { name: 'groupNote', type: 'text', title: 'Group Rates Note', rows: 2 }
      ]
    }),
    defineField({
      name: 'collections',
      title: 'Collections & Exhibitions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 2 },
          { name: 'image', type: 'image', title: 'Image' }
        ],
        preview: {
          select: {
            title: 'title',
            media: 'image'
          }
        }
      }],
      validation: Rule => Rule.max(6)
    }),
    defineField({
      name: 'history',
      title: 'History Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title', initialValue: 'A Palace Transformed' },
        { name: 'description', type: 'text', title: 'Description', rows: 4 },
        {
          name: 'timeline',
          type: 'array',
          title: 'Historical Timeline',
          of: [{
            type: 'object',
            fields: [
              { name: 'year', type: 'string', title: 'Year' },
              { name: 'event', type: 'string', title: 'Event' }
            ]
          }]
        }
      ]
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'website', type: 'url', title: 'Website' }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage'
    }
  }
})
