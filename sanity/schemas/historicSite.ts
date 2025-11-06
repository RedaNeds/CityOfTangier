import { defineType, defineField } from 'sanity'

export const historicSite = defineType({
  name: 'historicSite',
  title: 'Historic Site',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Name',
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
      description: 'e.g., "17th Century Portuguese Fort"'
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
      name: 'historicalPeriod',
      title: 'Historical Period',
      type: 'string',
      description: 'e.g., "17th Century", "Medieval", "Art Deco Era"'
    }),
    defineField({
      name: 'architecturalStyle',
      title: 'Architectural Style',
      type: 'string',
      description: 'e.g., "Moorish", "Art Deco", "Portuguese Colonial"'
    }),
    defineField({
      name: 'significance',
      title: 'Historical Significance',
      type: 'text',
      rows: 4,
      description: 'Why this site is historically important'
    }),
    defineField({
      name: 'history',
      title: 'History Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title', initialValue: 'History' },
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
      name: 'restorationInfo',
      title: 'Restoration Information',
      type: 'object',
      fields: [
        { name: 'hasBeenRestored', type: 'boolean', title: 'Has Been Restored' },
        { name: 'restorationYear', type: 'string', title: 'Year of Restoration' },
        { name: 'details', type: 'text', title: 'Restoration Details', rows: 3 }
      ]
    }),
    defineField({
      name: 'UNESCO',
      title: 'UNESCO World Heritage Site',
      type: 'boolean',
      description: 'Is this a UNESCO World Heritage Site?',
      initialValue: false
    }),
    defineField({
      name: 'guidedToursRequired',
      title: 'Guided Tours Required',
      type: 'boolean',
      description: 'Are guided tours required to visit?',
      initialValue: false
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
      subtitle: 'historicalPeriod',
      media: 'heroImage'
    }
  }
})


