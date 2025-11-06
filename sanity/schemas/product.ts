import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for cards and previews',
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
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
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Souvenirs', value: 'souvenirs' },
          { title: 'Handicrafts', value: 'handicrafts' },
          { title: 'Textiles', value: 'textiles' },
          { title: 'Jewelry', value: 'jewelry' },
          { title: 'Ceramics', value: 'ceramics' },
          { title: 'Leather Goods', value: 'leather-goods' },
          { title: 'Food & Spices', value: 'food-spices' },
          { title: 'Books & Maps', value: 'books-maps' },
          { title: 'Art & Paintings', value: 'art-paintings' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Amount',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              { title: 'EUR (€)', value: 'EUR' },
              { title: 'MAD (د.م)', value: 'MAD' },
              { title: 'USD ($)', value: 'USD' },
            ],
          },
        },
        {
          name: 'originalPrice',
          title: 'Original Price (if on sale)',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'object',
      fields: [
        {
          name: 'inStock',
          title: 'In Stock',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'quantity',
          title: 'Available Quantity',
          type: 'number',
        },
        {
          name: 'preOrder',
          title: 'Pre-order Available',
          type: 'boolean',
        },
      ],
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'spec',
          title: 'Specification',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'vendor',
      title: 'Vendor/Shop',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Shop Name',
          type: 'string',
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
        },
        {
          name: 'contact',
          title: 'Contact',
          type: 'object',
          fields: [
            {
              name: 'phone',
              title: 'Phone',
              type: 'string',
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
            },
            {
              name: 'website',
              title: 'Website',
              type: 'url',
            },
          ],
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
    }),
    defineField({
      name: 'relatedPlaces',
      title: 'Related Places',
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
      description: 'Show this product in featured sections',
    }),
    defineField({
      name: 'bestSeller',
      title: 'Best Seller',
      type: 'boolean',
      description: 'Mark as best seller',
    }),
    defineField({
      name: 'newArrival',
      title: 'New Arrival',
      type: 'boolean',
      description: 'Mark as new arrival',
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
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? subtitle.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'No category',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
    {
      title: 'Price Low to High',
      name: 'priceAsc',
      by: [{ field: 'price.amount', direction: 'asc' }],
    },
  ],
})

