import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'place',
  title: 'Place',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Eat & Drink', value: 'eat-drink' },
          { title: 'See & Do', value: 'see-do' },
          { title: 'Accommodation', value: 'accommodation' },
          { title: 'Shopping', value: 'shopping' },
          { title: 'Services', value: 'services' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      options: {
        list: [
          // Eat & Drink
          { title: 'Rooftops', value: 'rooftops' },
          { title: 'Sea-view Cafes', value: 'sea-view-cafes' },
          { title: 'Moroccan Restaurants', value: 'moroccan-restaurants' },
          { title: 'Brunch & Breakfast', value: 'brunch-breakfast' },
          { title: 'Seafood', value: 'seafood' },
          { title: 'Vegetarian & Vegan', value: 'vegetarian-vegan' },
          // See & Do
          { title: 'Museums', value: 'museums' },
          { title: 'Photo Spots', value: 'photo-spots' },
          { title: 'Beaches', value: 'beaches' },
          { title: 'Nightlife', value: 'nightlife' },
          { title: 'Parks & Gardens', value: 'parks-gardens' },
          { title: 'Historic Sites', value: 'historic-sites' },
          // Accommodation
          { title: 'Hotels', value: 'hotels' },
          { title: 'Riads', value: 'riads' },
          { title: 'Guesthouses', value: 'guesthouses' },
          { title: 'Hostels', value: 'hostels' },
          // Shopping
          { title: 'Souks', value: 'souks' },
          { title: 'Markets', value: 'markets' },
          { title: 'Boutiques', value: 'boutiques' },
          { title: 'Malls', value: 'malls' },
          // Services
          { title: 'Transportation', value: 'transportation' },
          { title: 'Health & Wellness', value: 'health-wellness' },
          { title: 'Business Services', value: 'business-services' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
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
          description: 'Important for SEO and accessibility.',
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        }
      ],
      options: {
        layout: 'grid'
      }
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    }),
    defineField({
      name: 'priceLevel',
      title: 'Price Level',
      type: 'string',
      options: {
        list: [
          { title: 'Free', value: 'Free' },
          { title: '€', value: '€' },
          { title: '€€', value: '€€' },
          { title: '€€€', value: '€€€' },
          { title: '€€€€', value: '€€€€' }
        ]
      }
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              type: 'string',
              title: 'Day',
              options: {
                list: [
                  { title: 'Monday', value: 'Monday' },
                  { title: 'Tuesday', value: 'Tuesday' },
                  { title: 'Wednesday', value: 'Wednesday' },
                  { title: 'Thursday', value: 'Thursday' },
                  { title: 'Friday', value: 'Friday' },
                  { title: 'Saturday', value: 'Saturday' },
                  { title: 'Sunday', value: 'Sunday' },
                  { title: 'Daily', value: 'Daily' }
                ]
              }
            },
            {
              name: 'hours',
              type: 'string',
              title: 'Hours',
              placeholder: 'e.g., 9:00 AM - 5:00 PM'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'General location description'
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Full address'
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        {
          name: 'lat',
          type: 'number',
          title: 'Latitude'
        },
        {
          name: 'lng',
          type: 'number',
          title: 'Longitude'
        }
      ]
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key features and highlights of this place'
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          type: 'string',
          title: 'Phone'
        },
        {
          name: 'email',
          type: 'string',
          title: 'Email'
        },
        {
          name: 'website',
          type: 'url',
          title: 'Website'
        }
      ]
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'accessibility',
      title: 'Accessibility',
      type: 'object',
      fields: [
        {
          name: 'wheelchairAccessible',
          type: 'boolean',
          title: 'Wheelchair Accessible'
        },
        {
          name: 'parking',
          type: 'boolean',
          title: 'Parking Available'
        },
        {
          name: 'wifi',
          type: 'boolean',
          title: 'WiFi Available'
        }
      ]
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
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
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
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'City of Tangier Team'
    })
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      subcategory: 'subcategory',
      media: 'featuredImage'
    },
    prepare(selection) {
      const { title, category, subcategory } = selection
      return {
        title: title,
        subtitle: `${subcategory} • ${category}`
      }
    }
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Recently Published',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    }
  ]
})