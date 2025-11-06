/**
 * Script to add example museum data to Sanity
 *
 * Run this script with: node scripts/add-example-museums.js
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const exampleMuseums = [
  {
    _type: 'place',
    title: 'Kasbah Museum of Mediterranean Cultures',
    slug: {
      _type: 'slug',
      current: 'kasbah-museum'
    },
    description: 'Explore Tangier\'s rich history through this stunning 17th-century palace turned museum, featuring Moroccan art, archaeological artifacts, and breathtaking views of the Strait of Gibraltar.',
    mainDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The Kasbah Museum of Mediterranean Cultures occupies the former Sultan\'s palace, Dar el-Makhzen, in the heart of Tangier\'s historic Kasbah. Built in the 17th century by Sultan Moulay Ismail, this stunning palace showcases the finest examples of Moroccan architecture and houses an exceptional collection that tells the story of Morocco\'s rich cultural heritage.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The museum\'s collections span thousands of years, from prehistoric times through the Phoenician, Roman, and Islamic periods to the modern era. Visitors can explore beautifully preserved mosaics, ancient pottery, traditional crafts, and contemporary art, all within the palace\'s magnificent courtyards and galleries.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Don\'t miss the panoramic terrace offering breathtaking views of the Strait of Gibraltar, where on clear days you can see Spain across the water. The museum\'s Andalusian gardens provide a peaceful retreat and showcase traditional Islamic garden design.'
          }
        ]
      }
    ],
    category: 'attractions',
    subcategory: 'museums',
    tags: ['history', 'culture', 'art', 'archaeology', 'kasbah', 'palace', 'heritage'],
    rating: 4.5,
    priceLevel: '€',
    openingHours: [
      { day: 'Monday', hours: '9:00 AM - 4:00 PM' },
      { day: 'Tuesday', hours: 'Closed' },
      { day: 'Wednesday', hours: '9:00 AM - 4:00 PM' },
      { day: 'Thursday', hours: '9:00 AM - 4:00 PM' },
      { day: 'Friday', hours: '9:00 AM - 4:00 PM' },
      { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
      { day: 'Sunday', hours: '9:00 AM - 4:00 PM' }
    ],
    location: 'Kasbah, Tangier, Morocco',
    address: 'Place de la Kasbah, Tangier 90000, Morocco',
    coordinates: {
      lat: 35.7897,
      lng: -5.8137
    },
    highlights: [
      '17th-century palace with stunning architecture',
      'Panoramic views of the Strait of Gibraltar',
      'Extensive collection of Moroccan ceramics',
      'Ancient Roman mosaics from Volubilis',
      'Traditional Moroccan costumes and jewelry',
      'Beautiful Andalusian gardens'
    ],
    contact: {
      phone: '+212 539 93 20 97',
      email: 'info@kasbahmuseum.ma',
      website: 'https://kasbahmuseum.ma'
    },
    amenities: [
      'Audio guides',
      'Guided tours',
      'Gift shop',
      'Restrooms',
      'Photography allowed (no flash)',
      'Wheelchair accessible (partial)'
    ],
    accessibility: {
      wheelchairAccessible: true,
      parking: false,
      wifi: false
    },
    museumFields: {
      visitDuration: '1-2 hours',
      bestTimeToVisit: 'Weekday mornings (9-11 AM) for fewer crowds and better lighting for photos',
      admissionPrices: {
        adult: '30 MAD (€3)',
        student: '15 MAD (€1.50)',
        child: 'Free (under 12)',
        senior: '15 MAD (€1.50)',
        group: '20 MAD per person (€2)',
        notes: 'Tickets can be purchased at the entrance. Cash and cards accepted.'
      },
      collections: [
        {
          name: 'Archaeological Collection',
          description: 'Roman and Phoenician artifacts including pottery, coins, and ancient tools discovered in and around Tangier.'
        },
        {
          name: 'Moroccan Art & Crafts',
          description: 'Traditional ceramics, textiles, carpets, and metalwork showcasing Morocco\'s rich artistic heritage.'
        },
        {
          name: 'Historical Documents',
          description: 'Manuscripts, maps, and documents tracing Tangier\'s multicultural history as an international zone.'
        },
        {
          name: 'Traditional Costumes',
          description: 'Beautifully preserved traditional Moroccan clothing and jewelry from different regions and periods.'
        }
      ],
      exhibitions: [
        {
          title: 'Contemporary Art at the Kasbah',
          description: 'A rotating exhibition featuring modern Moroccan artists interpreting traditional themes in contemporary ways.',
          temporary: true,
          startDate: '2024-09-01',
          endDate: '2024-12-31'
        },
        {
          title: 'Moroccan Musical Instruments',
          description: 'Permanent collection showcasing traditional instruments from across Morocco\'s diverse regions.',
          temporary: false
        }
      ],
      museumRules: [
        'No flash photography inside exhibition halls',
        'Do not touch artifacts or displays',
        'Maintain a quiet atmosphere',
        'Bags larger than 40x30cm must be left at reception',
        'Food and beverages not allowed inside exhibition areas',
        'Children must be accompanied by an adult'
      ],
      extendedAccessibility: {
        audioGuides: true,
        audioGuideLanguages: ['Arabic', 'French', 'English', 'Spanish'],
        guidedTours: true,
        guidedTourLanguages: ['Arabic', 'French', 'English', 'Spanish'],
        giftShop: true,
        cafe: false,
        restrooms: true,
        lockers: true,
        photographyAllowed: true,
        photographyNotes: 'No flash photography. Some special exhibitions may have restrictions.'
      }
    },
    publishedAt: new Date().toISOString(),
    author: 'City of Tangier Team'
  },

  {
    _type: 'place',
    title: 'American Legation Museum',
    slug: {
      _type: 'slug',
      current: 'american-legation-museum'
    },
    description: 'The first American public property outside the United States, this historic museum tells the story of US-Morocco relations and houses an impressive collection of art and historical documents.',
    mainDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The American Legation Museum is a unique cultural institution located in the heart of Tangier\'s medina. Built in 1821, it holds the distinction of being the first American public property outside the United States and the only U.S. National Historic Landmark on foreign soil.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The museum chronicles the long and special relationship between Morocco and the United States, which began with the Moroccan-American Treaty of Friendship in 1786 - the longest unbroken treaty relationship in U.S. history. The beautifully restored building features Andalusian architecture with traditional zellij tilework and painted wooden ceilings.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The collection includes rare documents, maps, prints, and paintings depicting Morocco\'s history and its relationship with America. Art lovers will appreciate works by Eugene Delacroix, James McBey, and contemporary Moroccan artists. The museum also houses a research library specializing in Morocco and North Africa.'
          }
        ]
      }
    ],
    category: 'attractions',
    subcategory: 'museums',
    tags: ['history', 'diplomacy', 'art', 'culture', 'medina', 'heritage', 'library'],
    rating: 4.7,
    priceLevel: 'Free',
    openingHours: [
      { day: 'Monday', hours: '10:00 AM - 5:00 PM' },
      { day: 'Tuesday', hours: '10:00 AM - 5:00 PM' },
      { day: 'Wednesday', hours: '10:00 AM - 5:00 PM' },
      { day: 'Thursday', hours: '10:00 AM - 5:00 PM' },
      { day: 'Friday', hours: '10:00 AM - 5:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 3:00 PM' },
      { day: 'Sunday', hours: 'Closed' }
    ],
    location: 'Medina, Tangier, Morocco',
    address: '8 Rue d\'Amérique, Tangier 90000, Morocco',
    coordinates: {
      lat: 35.7847,
      lng: -5.8113
    },
    highlights: [
      'First American public property outside the USA',
      'Beautiful Andalusian architecture and tilework',
      'Rare diplomatic documents and treaties',
      'Art collection including works by Eugene Delacroix',
      'Research library on Morocco and North Africa',
      'Free admission for all visitors'
    ],
    contact: {
      phone: '+212 539 93 53 17',
      email: 'info@legation.org',
      website: 'https://legation.org'
    },
    amenities: [
      'Research library',
      'Guided tours',
      'Educational programs',
      'Small gift shop',
      'Restrooms',
      'Photography allowed'
    ],
    accessibility: {
      wheelchairAccessible: false,
      parking: false,
      wifi: true
    },
    museumFields: {
      visitDuration: '45 minutes - 1 hour',
      bestTimeToVisit: 'Weekday mornings are quieter. Saturday mornings are also good but closes at 3 PM.',
      admissionPrices: {
        adult: 'Free (donations welcomed)',
        student: 'Free',
        child: 'Free',
        senior: 'Free',
        group: 'Free',
        notes: 'The museum operates on donations. Your contribution helps preserve this historic site.'
      },
      collections: [
        {
          name: 'Historical Documents & Treaties',
          description: 'Original documents, letters, and treaties documenting the historic relationship between Morocco and the United States.'
        },
        {
          name: 'Fine Art Collection',
          description: 'Works by European and American artists who visited or lived in Tangier, including Eugene Delacroix and James McBey.'
        },
        {
          name: 'Paul Bowles Wing',
          description: 'Dedicated to the American composer and author who lived in Tangier for 52 years, featuring manuscripts and personal items.'
        },
        {
          name: 'Moroccan Contemporary Art',
          description: 'Rotating exhibitions featuring contemporary Moroccan artists and their interpretations of modern Morocco.'
        }
      ],
      exhibitions: [
        {
          title: 'Morocco-America: A Friendship Through Time',
          description: 'Permanent exhibition chronicling over 200 years of diplomatic and cultural relations between the two nations.',
          temporary: false
        },
        {
          title: 'Tangier Through Artists\' Eyes',
          description: 'Paintings, sketches, and photographs by international artists who were inspired by Tangier.',
          temporary: false
        }
      ],
      museumRules: [
        'Please respect the historical nature of the building',
        'No flash photography',
        'Speak quietly to maintain the atmosphere',
        'No food or drinks in exhibition areas',
        'Children must be supervised',
        'Smoking is not permitted'
      ],
      extendedAccessibility: {
        audioGuides: false,
        guidedTours: true,
        guidedTourLanguages: ['English', 'French', 'Arabic'],
        giftShop: true,
        cafe: false,
        restrooms: true,
        lockers: false,
        photographyAllowed: true,
        photographyNotes: 'Photography is allowed without flash. Some special exhibitions may have restrictions.'
      }
    },
    publishedAt: new Date().toISOString(),
    author: 'City of Tangier Team'
  },

  {
    _type: 'place',
    title: 'Tangier Museum of Contemporary Art',
    slug: {
      _type: 'slug',
      current: 'contemporary-art-museum'
    },
    description: 'A modern space showcasing contemporary Moroccan and international art, with rotating exhibitions, installations, and cultural events in a beautifully renovated colonial building.',
    mainDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The Tangier Museum of Contemporary Art opened in 2017 in a beautifully renovated 1930s colonial building near the Grand Socco. The museum serves as a dynamic platform for contemporary artistic expression, bridging Moroccan traditions with global contemporary art movements.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'With its spacious galleries flooded with natural light, the museum presents rotating exhibitions featuring emerging and established artists from Morocco and around the world. The collection focuses on contemporary painting, sculpture, photography, video art, and multimedia installations that challenge conventions and spark dialogue.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The museum also hosts artist talks, workshops, film screenings, and performances, making it a vibrant cultural hub. The rooftop terrace offers stunning views of the city and hosts outdoor exhibitions and events during the summer months.'
          }
        ]
      }
    ],
    category: 'attractions',
    subcategory: 'art-galleries',
    tags: ['contemporary art', 'modern art', 'exhibitions', 'culture', 'gallery', 'installations', 'events'],
    rating: 4.3,
    priceLevel: '€€',
    openingHours: [
      { day: 'Monday', hours: 'Closed' },
      { day: 'Tuesday', hours: '10:00 AM - 6:00 PM' },
      { day: 'Wednesday', hours: '10:00 AM - 6:00 PM' },
      { day: 'Thursday', hours: '10:00 AM - 8:00 PM' },
      { day: 'Friday', hours: '10:00 AM - 8:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 6:00 PM' },
      { day: 'Sunday', hours: '10:00 AM - 6:00 PM' }
    ],
    location: 'Ville Nouvelle, Tangier, Morocco',
    address: 'Avenue Hassan II, near Grand Socco, Tangier 90000, Morocco',
    coordinates: {
      lat: 35.7823,
      lng: -5.8098
    },
    highlights: [
      'Rotating contemporary art exhibitions',
      'Works by emerging Moroccan artists',
      'International contemporary art collection',
      'Multimedia installations and video art',
      'Artist talks and cultural events',
      'Rooftop terrace with city views'
    ],
    contact: {
      phone: '+212 539 94 89 63',
      email: 'contact@mca-tangier.ma',
      website: 'https://mca-tangier.ma'
    },
    amenities: [
      'Audio guides',
      'Museum café',
      'Gift shop with art books',
      'Restrooms',
      'WiFi',
      'Wheelchair accessible',
      'Rooftop terrace'
    ],
    accessibility: {
      wheelchairAccessible: true,
      parking: true,
      wifi: true
    },
    museumFields: {
      visitDuration: '1-1.5 hours',
      bestTimeToVisit: 'Thursday and Friday evenings (until 8 PM) for a more relaxed atmosphere. First Sunday of the month is free entry.',
      admissionPrices: {
        adult: '50 MAD (€5)',
        student: '25 MAD (€2.50)',
        child: 'Free (under 18)',
        senior: '30 MAD (€3)',
        group: '40 MAD per person (€4)',
        notes: 'Free entry on the first Sunday of each month. Special rates for art students with valid ID.'
      },
      collections: [
        {
          name: 'Moroccan Contemporary Masters',
          description: 'Works by established Moroccan contemporary artists including Mohamed Melehi, Farid Belkahia, and Hassan El Glaoui.'
        },
        {
          name: 'Emerging Voices',
          description: 'Platform for young Moroccan and North African artists exploring identity, tradition, and modernity.'
        },
        {
          name: 'Photography Collection',
          description: 'Contemporary photography documenting Morocco\'s social and urban transformation.'
        },
        {
          name: 'Multimedia & Installations',
          description: 'Interactive installations, video art, and digital media exploring contemporary themes.'
        }
      ],
      exhibitions: [
        {
          title: 'Mediterranean Dialogues',
          description: 'Artists from Mediterranean countries explore shared heritage and contemporary challenges through diverse media.',
          temporary: true,
          startDate: '2024-10-15',
          endDate: '2025-01-31'
        },
        {
          title: 'Urban Visions: Tangier Transformed',
          description: 'Photographs and installations documenting Tangier\'s rapid urban development and social change.',
          temporary: true,
          startDate: '2024-09-01',
          endDate: '2024-12-15'
        },
        {
          title: 'Permanent Collection Highlights',
          description: 'Rotating selection from the museum\'s permanent collection of Moroccan contemporary art.',
          temporary: false
        }
      ],
      museumRules: [
        'Photography allowed in most areas (check signage)',
        'No flash or tripods',
        'Do not touch artworks or installations',
        'Mobile phones on silent mode',
        'No large bags or backpacks (lockers available)',
        'Children under 12 must be accompanied'
      ],
      extendedAccessibility: {
        audioGuides: true,
        audioGuideLanguages: ['Arabic', 'French', 'English'],
        guidedTours: true,
        guidedTourLanguages: ['Arabic', 'French', 'English', 'Spanish'],
        giftShop: true,
        cafe: true,
        restrooms: true,
        lockers: true,
        photographyAllowed: true,
        photographyNotes: 'Photography allowed without flash. Some temporary exhibitions may restrict photography - check with staff.'
      }
    },
    publishedAt: new Date().toISOString(),
    author: 'City of Tangier Team'
  }
];

async function importMuseums() {
  console.log('🚀 Starting museum data import...\n');

  try {
    for (const museum of exampleMuseums) {
      console.log(`📝 Creating: ${museum.title}`);

      const result = await client.create(museum);

      console.log(`✅ Created successfully with ID: ${result._id}\n`);
    }

    console.log('🎉 All example museums have been imported successfully!');
    console.log('\n📍 You can now view them at:');
    exampleMuseums.forEach(museum => {
      console.log(`   - https://your-site.com/museums/${museum.slug.current}`);
    });

  } catch (error) {
    console.error('❌ Error importing museums:', error);
    process.exit(1);
  }
}

importMuseums();
