import { defineType, defineField } from 'sanity'

export const beach = defineType({
  name: 'beach',
  title: 'Beach',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Beach Name',
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
      description: 'e.g., "Golden Sands & Clear Waters"'
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
      name: 'beachType',
      title: 'Beach Type',
      type: 'string',
      options: {
        list: [
          { title: 'Sandy Beach', value: 'sandy' },
          { title: 'Rocky Beach', value: 'rocky' },
          { title: 'Pebble Beach', value: 'pebble' },
          { title: 'Private Beach Club', value: 'private-club' },
          { title: 'Public Beach', value: 'public' }
        ]
      }
    }),
    defineField({
      name: 'accessibility',
      title: 'Accessibility',
      type: 'string',
      options: {
        list: [
          { title: 'Easy Access', value: 'easy' },
          { title: 'Moderate Access', value: 'moderate' },
          { title: 'Difficult Access', value: 'difficult' }
        ]
      },
      description: 'How easy it is to reach the beach'
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'object',
      fields: [
        { name: 'showers', type: 'boolean', title: 'Showers' },
        { name: 'lockers', type: 'boolean', title: 'Lockers' },
        { name: 'parking', type: 'boolean', title: 'Parking' },
        { name: 'sunbeds', type: 'boolean', title: 'Sunbeds Available' },
        { name: 'umbrellas', type: 'boolean', title: 'Umbrellas Available' },
        { name: 'restrooms', type: 'boolean', title: 'Restrooms' },
        { name: 'changeRooms', type: 'boolean', title: 'Change Rooms' }
      ]
    }),
    defineField({
      name: 'waterSports',
      title: 'Water Sports & Activities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Surfing, Swimming, Jet Ski, Paddle Boarding',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'lifeguard',
      title: 'Lifeguard on Duty',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'blueFlag',
      title: 'Blue Flag Certified',
      type: 'boolean',
      description: 'International eco-label for beaches',
      initialValue: false
    }),
    defineField({
      name: 'restaurants',
      title: 'Beach Restaurants & Clubs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Name' },
          { name: 'type', type: 'string', title: 'Type', placeholder: 'e.g., Restaurant, Café, Beach Club' },
          { name: 'description', type: 'text', title: 'Description', rows: 2 }
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'type'
          }
        }
      }]
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'text',
      rows: 2,
      description: 'When is the best time to visit this beach?'
    }),
    defineField({
      name: 'wavesInfo',
      title: 'Wave Conditions',
      type: 'string',
      options: {
        list: [
          { title: 'Calm Waters', value: 'calm' },
          { title: 'Moderate Waves', value: 'moderate' },
          { title: 'Strong Waves', value: 'strong' }
        ]
      }
    }),
    defineField({
      name: 'familyFriendly',
      title: 'Family Friendly',
      type: 'boolean',
      description: 'Is this beach suitable for families with children?',
      initialValue: true
    }),
    defineField({
      name: 'parking',
      title: 'Parking Information',
      type: 'object',
      fields: [
        { name: 'available', type: 'boolean', title: 'Parking Available' },
        { name: 'cost', type: 'string', title: 'Parking Cost', placeholder: 'e.g., Free, 20 MAD/day' },
        { name: 'notes', type: 'text', title: 'Additional Notes', rows: 2 }
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
      subtitle: 'beachType',
      media: 'heroImage'
    }
  }
})


