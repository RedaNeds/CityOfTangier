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
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'mainDescription',
      title: 'Main Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
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
        }
      ],
      description: 'Main descriptive content about this place'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Restaurants & Cafes', value: 'restaurants' },
          { title: 'Attractions', value: 'attractions' },
          { title: 'Accommodation', value: 'accommodation' },
          { title: 'Shopping', value: 'shopping' },
          { title: 'Services', value: 'services' },
          // Legacy values for backward compatibility
          { title: 'Eat & Drink (Legacy)', value: 'eat-drink' },
          { title: 'See & Do (Legacy)', value: 'see-do' }
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
          { title: 'Art Galleries', value: 'art-galleries' },
          { title: 'Cultural Centers', value: 'cultural-centers' },
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
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'heroTitle',
          type: 'string',
          title: 'Hero Title Override',
          description: 'Leave empty to use the main title'
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          title: 'Hero Subtitle',
          rows: 2,
          description: 'Displayed below the hero title'
        },
        {
          name: 'heroBackground',
          type: 'image',
          title: 'Hero Background Image',
          description: 'Override the featured image for hero background',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Text Section',
          fields: [
            {
              name: 'sectionTitle',
              type: 'string',
              title: 'Section Title'
            },
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
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
                      { title: 'Emphasis', value: 'em' }
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
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'sectionTitle'
            },
            prepare(selection) {
              return {
                title: selection.title || 'Untitled Section'
              }
            }
          }
        },
        {
          type: 'object',
          name: 'imageGallery',
          title: 'Image Gallery Section',
          fields: [
            {
              name: 'sectionTitle',
              type: 'string',
              title: 'Section Title',
              initialValue: 'Gallery'
            },
            {
              name: 'images',
              type: 'array',
              title: 'Images',
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
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'sectionTitle',
              media: 'images.0'
            },
            prepare(selection) {
              return {
                title: selection.title || 'Image Gallery',
                media: selection.media
              }
            }
          }
        },
        {
          type: 'object',
          name: 'tipsSection',
          title: 'Tips & Recommendations',
          fields: [
            {
              name: 'sectionTitle',
              type: 'string',
              title: 'Section Title',
              initialValue: 'Tips & Recommendations'
            },
            {
              name: 'tips',
              type: 'array',
              title: 'Tips',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'tipTitle',
                      type: 'string',
                      title: 'Tip Title'
                    },
                    {
                      name: 'tipContent',
                      type: 'text',
                      title: 'Tip Content',
                      rows: 2
                    },
                    {
                      name: 'tipType',
                      type: 'string',
                      title: 'Tip Type',
                      options: {
                        list: [
                          { title: 'General Tip', value: 'general' },
                          { title: 'Best Time to Visit', value: 'timing' },
                          { title: 'What to Bring', value: 'preparation' },
                          { title: 'Photography', value: 'photography' },
                          { title: 'Local Insights', value: 'local' }
                        ]
                      }
                    }
                  ],
                  preview: {
                    select: {
                      title: 'tipTitle',
                      subtitle: 'tipType'
                    }
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'sectionTitle'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'pageTexts',
      title: 'Page Text Customization',
      type: 'object',
      description: 'Customize text labels and content for this place',
      fields: [
        {
          name: 'sectionTitles',
          type: 'object',
          title: 'Section Titles',
          fields: [
            {
              name: 'highlights',
              type: 'string',
              title: 'Highlights Title',
              initialValue: 'What Makes This Special'
            },
            {
              name: 'amenities',
              type: 'string',
              title: 'Amenities Title',
              initialValue: 'Amenities'
            },
            {
              name: 'accessibility',
              type: 'string',
              title: 'Accessibility Title',
              initialValue: 'Accessibility'
            },
            {
              name: 'relatedPlaces',
              type: 'string',
              title: 'Related Places Title',
              initialValue: 'More Places Like This'
            }
          ]
        },
        {
          name: 'buttonTexts',
          type: 'object',
          title: 'Button Texts',
          fields: [
            {
              name: 'directions',
              type: 'string',
              title: 'Directions Button',
              initialValue: 'Get Directions'
            },
            {
              name: 'call',
              type: 'string',
              title: 'Call Button',
              initialValue: 'Call'
            },
            {
              name: 'website',
              type: 'string',
              title: 'Website Button',
              initialValue: 'Visit Website'
            },
            {
              name: 'share',
              type: 'string',
              title: 'Share Button',
              initialValue: 'Share'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'detailedSections',
      title: 'Detailed Page Sections',
      type: 'object',
      description: 'Manage detailed content sections for this place',
      fields: [
        {
          name: 'historySection',
          type: 'object',
          title: 'History Section',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Section Title',
              initialValue: 'A Palace Transformed'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Main Description',
              rows: 4
            },
            {
              name: 'timeline',
              type: 'array',
              title: 'Historical Timeline',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'year',
                      type: 'string',
                      title: 'Year/Period'
                    },
                    {
                      name: 'title',
                      type: 'string',
                      title: 'Event Title'
                    },
                    {
                      name: 'description',
                      type: 'text',
                      title: 'Event Description',
                      rows: 2
                    }
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'year'
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'featuresSection',
          type: 'object',
          title: 'Features Section',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Section Title',
              initialValue: 'Andalusian Courtyard'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3
            },
            {
              name: 'features',
              type: 'array',
              title: 'Key Features',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      type: 'string',
                      title: 'Feature Label'
                    },
                    {
                      name: 'value',
                      type: 'string',
                      title: 'Feature Value'
                    }
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'value'
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'visitSection',
          type: 'object',
          title: 'Plan Your Visit Section',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Section Title',
              initialValue: 'Plan Your Visit'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Section Description',
              initialValue: 'Everything you need to know for a perfect museum experience.'
            },
            {
              name: 'operatingHours',
              type: 'array',
              title: 'Operating Hours',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'day',
                      type: 'string',
                      title: 'Day of Week'
                    },
                    {
                      name: 'hours',
                      type: 'string',
                      title: 'Opening Hours'
                    },
                    {
                      name: 'isOpen',
                      type: 'boolean',
                      title: 'Open This Day',
                      initialValue: true
                    }
                  ]
                }
              ]
            },
            {
              name: 'currentStatus',
              type: 'object',
              title: 'Current Status',
              fields: [
                {
                  name: 'isOpenNow',
                  type: 'boolean',
                  title: 'Open Now',
                  initialValue: true
                },
                {
                  name: 'statusMessage',
                  type: 'string',
                  title: 'Status Message',
                  initialValue: 'Open Now'
                },
                {
                  name: 'closesAt',
                  type: 'string',
                  title: 'Closes At',
                  initialValue: 'Closes at 6:00 PM today'
                }
              ]
            },
            {
              name: 'locationInfo',
              type: 'object',
              title: 'Location & Contact Info',
              fields: [
                {
                  name: 'gettingThere',
                  type: 'string',
                  title: 'Getting There Instructions',
                  initialValue: '15-20 min walk from the medina'
                },
                {
                  name: 'additionalInfo',
                  type: 'string',
                  title: 'Additional Info',
                  initialValue: 'United travel planning service'
                }
              ]
            },
            {
              name: 'toursAndServices',
              type: 'object',
              title: 'Tours & Services',
              fields: [
                {
                  name: 'guidedTours',
                  type: 'object',
                  title: 'Guided Tours',
                  fields: [
                    {
                      name: 'languages',
                      type: 'string',
                      title: 'Available Languages',
                      initialValue: 'Available in Arabic, French, English, and Spanish'
                    },
                    {
                      name: 'duration',
                      type: 'string',
                      title: 'Duration',
                      initialValue: 'Duration: 45 min - 60 min'
                    }
                  ]
                },
                {
                  name: 'audioGuide',
                  type: 'string',
                  title: 'Audio Guide Description',
                  initialValue: 'Self-guided experience with detailed commentary'
                },
                {
                  name: 'additionalServices',
                  type: 'array',
                  title: 'Additional Services',
                  of: [{ type: 'string' }]
                }
              ]
            },
            {
              name: 'admissionPrices',
              type: 'array',
              title: 'Admission Prices',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'category',
                      type: 'string',
                      title: 'Visitor Category'
                    },
                    {
                      name: 'price',
                      type: 'string',
                      title: 'Price'
                    },
                    {
                      name: 'isFree',
                      type: 'boolean',
                      title: 'Free Entry',
                      initialValue: false
                    }
                  ],
                  preview: {
                    select: {
                      title: 'category',
                      subtitle: 'price'
                    }
                  }
                }
              ]
            },
            {
              name: 'groupRates',
              type: 'string',
              title: 'Group Rates Information',
              initialValue: '*Group rates available for parties of 10 or more (booking required)'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'museumFields',
      title: 'Museum-Specific Fields',
      type: 'object',
      description: 'Additional fields for museums and cultural sites',
      hidden: ({ document }) => document?.subcategory !== 'museums' && document?.subcategory !== 'art-galleries' && document?.subcategory !== 'cultural-centers',
      fields: [
        {
          name: 'visitDuration',
          type: 'string',
          title: 'Recommended Visit Duration',
          placeholder: 'e.g., 1-2 hours',
          description: 'How long visitors should plan to spend here'
        },
        {
          name: 'bestTimeToVisit',
          type: 'text',
          title: 'Best Time to Visit',
          rows: 2,
          placeholder: 'e.g., Weekday mornings for fewer crowds',
          description: 'Tips on the best time to visit'
        },
        {
          name: 'admissionPrices',
          type: 'object',
          title: 'Admission Prices',
          fields: [
            {
              name: 'adult',
              type: 'string',
              title: 'Adult Price',
              placeholder: 'e.g., 30 MAD (€3)'
            },
            {
              name: 'student',
              type: 'string',
              title: 'Student Price',
              placeholder: 'e.g., 15 MAD (€1.50)'
            },
            {
              name: 'child',
              type: 'string',
              title: 'Child Price',
              placeholder: 'e.g., Free (under 12)'
            },
            {
              name: 'senior',
              type: 'string',
              title: 'Senior Price',
              placeholder: 'e.g., 15 MAD (€1.50)'
            },
            {
              name: 'group',
              type: 'string',
              title: 'Group Rate',
              placeholder: 'e.g., 20 MAD per person (€2)'
            },
            {
              name: 'notes',
              type: 'text',
              title: 'Pricing Notes',
              rows: 2,
              placeholder: 'e.g., Free entry on first Sunday of each month'
            }
          ]
        },
        {
          name: 'collections',
          type: 'array',
          title: 'Collections',
          description: 'Major collections or permanent exhibitions',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  type: 'string',
                  title: 'Collection Name',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  rows: 3,
                  validation: Rule => Rule.required()
                },
                {
                  name: 'image',
                  type: 'image',
                  title: 'Collection Image',
                  options: { hotspot: true }
                }
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'description',
                  media: 'image'
                }
              }
            }
          ]
        },
        {
          name: 'exhibitions',
          type: 'array',
          title: 'Current Exhibitions',
          description: 'Temporary and permanent exhibitions',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  type: 'string',
                  title: 'Exhibition Title',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  rows: 3,
                  validation: Rule => Rule.required()
                },
                {
                  name: 'temporary',
                  type: 'boolean',
                  title: 'Temporary Exhibition',
                  description: 'Is this a temporary/rotating exhibition?',
                  initialValue: false
                },
                {
                  name: 'startDate',
                  type: 'date',
                  title: 'Start Date',
                  hidden: ({ parent }) => !parent?.temporary
                },
                {
                  name: 'endDate',
                  type: 'date',
                  title: 'End Date',
                  hidden: ({ parent }) => !parent?.temporary
                },
                {
                  name: 'image',
                  type: 'image',
                  title: 'Exhibition Image',
                  options: { hotspot: true }
                }
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'temporary',
                  media: 'image'
                },
                prepare(selection) {
                  return {
                    title: selection.title,
                    subtitle: selection.subtitle ? 'Temporary Exhibition' : 'Permanent Exhibition',
                    media: selection.media
                  }
                }
              }
            }
          ]
        },
        {
          name: 'museumRules',
          type: 'array',
          title: 'Museum Rules & Guidelines',
          description: 'Rules visitors should follow',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'extendedAccessibility',
          type: 'object',
          title: 'Extended Accessibility Features',
          fields: [
            {
              name: 'audioGuides',
              type: 'boolean',
              title: 'Audio Guides Available'
            },
            {
              name: 'audioGuideLanguages',
              type: 'array',
              title: 'Audio Guide Languages',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => !parent?.audioGuides
            },
            {
              name: 'guidedTours',
              type: 'boolean',
              title: 'Guided Tours Available'
            },
            {
              name: 'guidedTourLanguages',
              type: 'array',
              title: 'Guided Tour Languages',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => !parent?.guidedTours
            },
            {
              name: 'giftShop',
              type: 'boolean',
              title: 'Gift Shop'
            },
            {
              name: 'cafe',
              type: 'boolean',
              title: 'Café/Restaurant'
            },
            {
              name: 'restrooms',
              type: 'boolean',
              title: 'Public Restrooms'
            },
            {
              name: 'lockers',
              type: 'boolean',
              title: 'Lockers/Bag Storage'
            },
            {
              name: 'photographyAllowed',
              type: 'boolean',
              title: 'Photography Allowed'
            },
            {
              name: 'photographyNotes',
              type: 'text',
              title: 'Photography Notes',
              rows: 2,
              placeholder: 'e.g., No flash photography',
              hidden: ({ parent }) => !parent?.photographyAllowed
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'content',
      title: 'Legacy Content (Deprecated)',
      type: 'array',
      description: 'Use Content Sections above instead. This field is kept for backward compatibility.',
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