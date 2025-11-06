import { defineType, defineField } from 'sanity'

export const nature = defineType({
  name: 'nature',
  title: 'Nature & Parks',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Place Name',
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
      description: 'e.g., "Nature Reserve & Bird Sanctuary"'
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
        { name: 'lng', type: 'number', title: 'Longitude' },
        { name: 'area', type: 'number', title: 'Area (in hectares)' }
      ]
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      description: 'Leave empty if open 24/7',
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
      name: 'terrainType',
      title: 'Terrain Type',
      type: 'string',
      options: {
        list: [
          { title: 'Park', value: 'park' },
          { title: 'Garden', value: 'garden' },
          { title: 'Nature Reserve', value: 'nature-reserve' },
          { title: 'Forest', value: 'forest' },
          { title: 'Mountain', value: 'mountain' },
          { title: 'Valley', value: 'valley' }
        ]
      }
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Hiking, Bird watching, Picnicking, Photography',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Moderate', value: 'moderate' },
          { title: 'Challenging', value: 'challenging' }
        ]
      }
    }),
    defineField({
      name: 'trails',
      title: 'Trails',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Trail Name' },
          { name: 'distance', type: 'string', title: 'Distance', placeholder: 'e.g., 3.5 km' },
          { name: 'duration', type: 'string', title: 'Duration', placeholder: 'e.g., 1.5 hours' },
          { name: 'difficulty', type: 'string', title: 'Difficulty', options: {
            list: ['Easy', 'Moderate', 'Challenging']
          }}
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'distance'
          }
        }
      }]
    }),
    defineField({
      name: 'flora',
      title: 'Notable Flora',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Plant species that can be seen here',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'fauna',
      title: 'Wildlife',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Animals and birds that can be spotted',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'bestSeason',
      title: 'Best Season to Visit',
      type: 'string',
      description: 'e.g., Spring, Summer, Year-round'
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Parking, Restrooms, Picnic areas, Visitor center',
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
      subtitle: 'terrainType',
      media: 'heroImage'
    }
  }
})


