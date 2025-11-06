import { defineType, defineField } from 'sanity'

export const market = defineType({
  name: 'market',
  title: 'Market',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Market Name',
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
      description: 'e.g., "Traditional Moroccan Souk"'
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
      name: 'marketType',
      title: 'Market Type',
      type: 'string',
      options: {
        list: [
          { title: 'Traditional Souk', value: 'souk' },
          { title: 'Farmers Market', value: 'farmers-market' },
          { title: 'Flea Market', value: 'flea-market' },
          { title: 'Artisan Market', value: 'artisan-market' },
          { title: 'Fish Market', value: 'fish-market' },
          { title: 'Night Market', value: 'night-market' }
        ]
      }
    }),
    defineField({
      name: 'marketDays',
      title: 'Market Days',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Days when the market operates',
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
          { title: 'Daily', value: 'daily' }
        ]
      }
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
      description: 'e.g., Early morning, Late afternoon, Evening',
      options: {
        list: [
          { title: 'Early Morning', value: 'early-morning' },
          { title: 'Morning', value: 'morning' },
          { title: 'Afternoon', value: 'afternoon' },
          { title: 'Late Afternoon', value: 'late-afternoon' },
          { title: 'Evening', value: 'evening' }
        ]
      }
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What the market is known for',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'vendors',
      title: 'Vendor Information',
      type: 'object',
      fields: [
        { name: 'approximateNumber', type: 'number', title: 'Approximate Number of Vendors' },
        { name: 'types', type: 'array', title: 'Vendor Types', of: [{ type: 'string' }] }
      ]
    }),
    defineField({
      name: 'bargaining',
      title: 'Bargaining Information',
      type: 'object',
      fields: [
        { name: 'expected', type: 'boolean', title: 'Bargaining Expected', initialValue: true },
        { name: 'tips', type: 'text', title: 'Bargaining Tips', rows: 3, 
          placeholder: 'e.g., Start at 50% of asking price, be friendly, know when to walk away' }
      ]
    }),
    defineField({
      name: 'priceLevel',
      title: 'Price Level',
      type: 'string',
      options: {
        list: [
          { title: '€ - Budget Friendly', value: '€' },
          { title: '€€ - Moderate', value: '€€' },
          { title: '€€€ - Premium', value: '€€€' }
        ]
      }
    }),
    defineField({
      name: 'indoorOutdoor',
      title: 'Indoor/Outdoor',
      type: 'string',
      options: {
        list: [
          { title: 'Indoor', value: 'indoor' },
          { title: 'Outdoor', value: 'outdoor' },
          { title: 'Mixed (Indoor & Outdoor)', value: 'mixed' }
        ]
      }
    }),
    defineField({
      name: 'crowdLevel',
      title: 'Typical Crowd Level',
      type: 'string',
      options: {
        list: [
          { title: 'Quiet', value: 'quiet' },
          { title: 'Moderate', value: 'moderate' },
          { title: 'Busy', value: 'busy' },
          { title: 'Very Busy', value: 'very-busy' }
        ]
      }
    }),
    defineField({
      name: 'localTips',
      title: 'Local Tips',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Insider tips for visitors',
      options: {
        layout: 'tags'
      }
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
      subtitle: 'marketType',
      media: 'heroImage'
    }
  }
})


