import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
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
          { title: 'Music', value: 'music' },
          { title: 'Art & Culture', value: 'art-culture' },
          { title: 'Food & Drink', value: 'food-drink' },
          { title: 'Sports', value: 'sports' },
          { title: 'Business', value: 'business' },
          { title: 'Education', value: 'education' },
          { title: 'Community', value: 'community' },
          { title: 'Festival', value: 'festival' }
        ],
        layout: 'radio'
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
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Event venue or location'
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Full address of the event location'
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
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          type: 'number',
          title: 'Amount'
        },
        {
          name: 'currency',
          type: 'string',
          title: 'Currency',
          options: {
            list: [
              { title: 'MAD (Moroccan Dirham)', value: 'MAD' },
              { title: 'EUR (Euro)', value: 'EUR' },
              { title: 'USD (US Dollar)', value: 'USD' }
            ]
          }
        },
        {
          name: 'isFree',
          type: 'boolean',
          title: 'Free Event'
        }
      ]
    }),
    defineField({
      name: 'organizer',
      title: 'Organizer',
      type: 'object',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Organizer Name'
        },
        {
          name: 'email',
          type: 'string',
          title: 'Contact Email'
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Contact Phone'
        },
        {
          name: 'website',
          type: 'url',
          title: 'Website'
        }
      ]
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key features and highlights of this event'
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
      subtitle: 'category',
      media: 'featuredImage',
      startDate: 'startDate'
    },
    prepare(selection) {
      const { title, subtitle, startDate } = selection
      const date = startDate ? new Date(startDate).toLocaleDateString() : 'No date'
      return {
        title: title,
        subtitle: `${subtitle} • ${date}`
      }
    }
  },
  orderings: [
    {
      title: 'Start Date (Earliest First)',
      name: 'startDateAsc',
      by: [
        { field: 'startDate', direction: 'asc' }
      ]
    },
    {
      title: 'Start Date (Latest First)',
      name: 'startDateDesc',
      by: [
        { field: 'startDate', direction: 'desc' }
      ]
    },
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
        { field: 'startDate', direction: 'asc' }
      ]
    }
  ]
})
