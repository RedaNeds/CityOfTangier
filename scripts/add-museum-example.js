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

const exampleMuseum = {
  _type: 'museum',
  title: 'Kasbah Museum',
  subtitle: 'Museum of Mediterranean Cultures',
  slug: {
    _type: 'slug',
    current: 'kasbah-museum'
  },
  description: 'The legal capital of Morocco until 1912, Tangier preserves a remarkable cultural heritage across its museums. The Kasbah Museum showcases artifacts from prehistoric times through the Islamic period.',
  location: {
    address: 'Place de la Kasbah',
    city: 'Tangier',
    lat: 35.7897,
    lng: -5.8137
  },
  openingHours: [
    { day: 'Monday-Wednesday', hours: '9:00 AM - 4:00 PM', isOpen: true },
    { day: 'Thursday-Friday', hours: '9:00 AM - 4:00 PM', isOpen: true },
    { day: 'Saturday-Sunday', hours: '9:00 AM - 4:00 PM', isOpen: true }
  ],
  ticketPrices: {
    adult: '30 MAD',
    student: '15 MAD',
    child: 'Free',
    groupNote: '*Group rates available for parties of 10 or more (booking required)'
  },
  collections: [
    {
      title: 'Roman Ruins of ancient Volubilis',
      description: 'A remarkable collection of Roman artifacts, including intricate mosaics and stunning sculptures depicting mythological scenes.',
      // Note: You'll need to upload images in Sanity Studio
    },
    {
      title: 'Islamic Art Collection',
      description: 'Traditional ceramics, calligraphy, and architectural elements showcasing the rich Islamic heritage of Morocco.',
    },
    {
      title: 'Traditional Costumes',
      description: 'Beautifully preserved traditional Moroccan clothing and jewelry from different regions and historical periods.',
    }
  ],
  history: {
    title: 'A Palace Transformed',
    description: 'Originally built in the 17th century as the Sultan\'s palace, the building has served various purposes throughout history before becoming a museum dedicated to preserving Morocco\'s Mediterranean heritage.',
    timeline: [
      { year: '1912', event: 'Legal capital of Morocco' },
      { year: '1922', event: 'Transformed into museum' },
      { year: '1970', event: 'Major restoration project' },
      { year: '2000', event: 'Modernization of exhibits' }
    ]
  },
  contact: {
    phone: '+212 539-93-20-97',
    email: 'info@kasbahmuseum.ma',
    website: 'https://kasbahmuseum.ma'
  }
};

async function importMuseum() {
  console.log('🏛️ Creating museum example...\n');

  try {
    const result = await client.create(exampleMuseum);
    console.log(`✅ Museum created successfully!`);
    console.log(`   ID: ${result._id}`);
    console.log(`   URL: /museums/kasbah-museum\n`);
    console.log('📸 Don\'t forget to add images in Sanity Studio!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importMuseum();
