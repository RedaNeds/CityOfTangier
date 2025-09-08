#!/usr/bin/env node

/**
 * Script to migrate places from Astro content collections to Sanity CMS
 * This script reads the existing places from src/content/places/ and creates them in Sanity
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
});

// Helper function to read markdown files
function readMarkdownFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return { data, content };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Helper function to convert Astro place data to Sanity format
function convertToSanityFormat(astroData, content, filePath) {
  return {
    _type: 'place',
    title: astroData.title,
    slug: {
      _type: 'slug',
      current: path.basename(filePath, '.md')
    },
    description: astroData.description,
    category: astroData.category,
    subcategory: astroData.subcategory,
    tags: astroData.tags || [],
    rating: astroData.rating,
    priceLevel: astroData.priceLevel,
    location: astroData.location,
    address: astroData.address,
    coordinates: astroData.coordinates ? {
      lat: astroData.coordinates.lat,
      lng: astroData.coordinates.lng
    } : undefined,
    highlights: astroData.highlights || [],
    contact: astroData.contact || {},
    amenities: astroData.amenities || [],
    accessibility: astroData.accessibility || {},
    openingHours: astroData.openingHours || [],
    publishedAt: astroData.pubDate ? new Date(astroData.pubDate).toISOString() : new Date().toISOString(),
    author: astroData.author || 'City of Tangier Team',
    content: content ? [
      {
        _type: 'block',
        _key: 'content-block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'content-span',
            text: content,
            marks: []
          }
        ],
        markDefs: []
      }
    ] : []
  };
}

// Main migration function
async function migratePlaces() {
  console.log('🚀 Starting places migration to Sanity...');
  
  const placesDir = path.join(process.cwd(), 'src', 'content', 'places');
  
  if (!fs.existsSync(placesDir)) {
    console.error('❌ Places directory not found:', placesDir);
    return;
  }
  
  const files = fs.readdirSync(placesDir).filter(file => file.endsWith('.md'));
  console.log(`📁 Found ${files.length} place files to migrate`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    const filePath = path.join(placesDir, file);
    console.log(`\n📄 Processing: ${file}`);
    
    const fileData = readMarkdownFile(filePath);
    if (!fileData) {
      console.error(`❌ Failed to read ${file}`);
      errorCount++;
      continue;
    }
    
    const { data, content } = fileData;
    const sanityData = convertToSanityFormat(data, content, filePath);
    
    try {
      // Check if place already exists
      const existingPlaces = await client.fetch(
        `*[_type == "place" && slug.current == $slug]`,
        { slug: sanityData.slug.current }
      );
      
      if (existingPlaces.length > 0) {
        console.log(`⚠️  Place "${sanityData.title}" already exists, skipping...`);
        continue;
      }
      
      // Create the place in Sanity
      const result = await client.create(sanityData);
      console.log(`✅ Created place: ${sanityData.title} (ID: ${result._id})`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed to create place "${sanityData.title}":`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n🎉 Migration completed!`);
  console.log(`✅ Successfully migrated: ${successCount} places`);
  console.log(`❌ Errors: ${errorCount} places`);
  
  if (successCount > 0) {
    console.log(`\n🔗 You can now view your places in Sanity Studio:`);
    console.log(`   http://localhost:3333/desk/place`);
  }
}

// Example places to create if no existing places found
async function createExamplePlaces() {
  console.log('📝 Creating example places in Sanity...');
  
  const examplePlaces = [
    {
      _type: 'place',
      title: 'Café Hafa',
      slug: { _type: 'slug', current: 'cafe-hafa' },
      description: 'Legendary café with panoramic views of the Strait of Gibraltar, frequented by famous writers and artists.',
      category: 'eat-drink',
      subcategory: 'sea-view-cafes',
      tags: ['historic', 'views', 'literature', 'artists'],
      rating: 4.5,
      priceLevel: '€€',
      location: 'Marshan, Tangier',
      address: 'Rue Hafa, Marshan, Tangier',
      coordinates: { lat: 35.7894, lng: -5.8087 },
      highlights: [
        'Panoramic views of the Strait of Gibraltar',
        'Historic café frequented by famous writers',
        'Traditional Moroccan mint tea',
        'Perfect sunset viewing spot'
      ],
      contact: {
        phone: '+212 5 39 93 73 34',
        website: 'https://cafehafa.com'
      },
      amenities: ['Outdoor seating', 'WiFi', 'Parking nearby'],
      accessibility: {
        wheelchairAccessible: false,
        parking: true,
        wifi: true
      },
      openingHours: [
        { day: 'Daily', hours: '8:00 AM - 11:00 PM' }
      ],
      publishedAt: new Date().toISOString(),
      author: 'City of Tangier Team',
      content: [
        {
          _type: 'block',
          _key: 'content-block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-span',
              text: 'Café Hafa is one of Tangier\'s most iconic landmarks, perched on the cliffs of Marshan with breathtaking views of the Strait of Gibraltar. This legendary café has been a meeting place for writers, artists, and intellectuals for decades, including Paul Bowles, William S. Burroughs, and Tennessee Williams.',
              marks: []
            }
          ],
          markDefs: []
        }
      ]
    },
    {
      _type: 'place',
      title: 'Hercules Caves',
      slug: { _type: 'slug', current: 'hercules-caves' },
      description: 'Mythological caves with a natural window opening to the Atlantic Ocean, offering spectacular photo opportunities.',
      category: 'see-do',
      subcategory: 'photo-spots',
      tags: ['mythology', 'nature', 'photography', 'atlantic'],
      rating: 4.3,
      priceLevel: '€',
      location: 'Cap Spartel, Tangier',
      address: 'Cap Spartel, Tangier',
      coordinates: { lat: 35.7844, lng: -5.9200 },
      highlights: [
        'Natural window opening to the Atlantic',
        'Mythological significance',
        'Spectacular photo opportunities',
        'Close to Cap Spartel lighthouse'
      ],
      contact: {
        phone: '+212 5 39 93 73 34'
      },
      amenities: ['Guided tours', 'Parking'],
      accessibility: {
        wheelchairAccessible: false,
        parking: true,
        wifi: false
      },
      openingHours: [
        { day: 'Daily', hours: '9:00 AM - 6:00 PM' }
      ],
      publishedAt: new Date().toISOString(),
      author: 'City of Tangier Team',
      content: [
        {
          _type: 'block',
          _key: 'content-block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-span',
              text: 'The Hercules Caves are a natural wonder located at Cap Spartel, just outside Tangier. According to legend, these caves were where Hercules rested after completing his twelve labors. The most famous feature is the natural window opening that frames the Atlantic Ocean, creating a perfect silhouette for photography.',
              marks: []
            }
          ],
          markDefs: []
        }
      ]
    },
    {
      _type: 'place',
      title: 'Achakar Beach Club',
      slug: { _type: 'slug', current: 'achakar-beach-club' },
      description: 'Luxury beach club with restaurant, bar, and stunning ocean views. Perfect for a day of relaxation by the sea.',
      category: 'eat-drink',
      subcategory: 'seafood',
      tags: ['luxury', 'beach', 'restaurant', 'ocean'],
      rating: 4.7,
      priceLevel: '€€€',
      location: 'Achakar Beach, Tangier',
      address: 'Achakar Beach, Tangier',
      coordinates: { lat: 35.7500, lng: -5.9000 },
      highlights: [
        'Luxury beach club experience',
        'Fresh seafood restaurant',
        'Stunning ocean views',
        'Private beach access'
      ],
      contact: {
        phone: '+212 5 39 93 73 34',
        email: 'info@achakarbeachclub.com',
        website: 'https://achakarbeachclub.com'
      },
      amenities: ['Restaurant', 'Bar', 'Beach access', 'Parking', 'WiFi'],
      accessibility: {
        wheelchairAccessible: true,
        parking: true,
        wifi: true
      },
      openingHours: [
        { day: 'Daily', hours: '10:00 AM - 10:00 PM' }
      ],
      publishedAt: new Date().toISOString(),
      author: 'City of Tangier Team',
      content: [
        {
          _type: 'block',
          _key: 'content-block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-span',
              text: 'Achakar Beach Club offers a premium beach experience with its luxury facilities, gourmet seafood restaurant, and exclusive beach access. The club provides the perfect setting for a relaxing day by the ocean, with attentive service and stunning views of the Atlantic.',
              marks: []
            }
          ],
          markDefs: []
        }
      ]
    }
  ];
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const place of examplePlaces) {
    try {
      // Check if place already exists
      const existingPlaces = await client.fetch(
        `*[_type == "place" && slug.current == $slug]`,
        { slug: place.slug.current }
      );
      
      if (existingPlaces.length > 0) {
        console.log(`⚠️  Place "${place.title}" already exists, skipping...`);
        continue;
      }
      
      // Create the place in Sanity
      const result = await client.create(place);
      console.log(`✅ Created example place: ${place.title} (ID: ${result._id})`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed to create place "${place.title}":`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n🎉 Example places creation completed!`);
  console.log(`✅ Successfully created: ${successCount} places`);
  console.log(`❌ Errors: ${errorCount} places`);
}

// Main execution
async function main() {
  try {
    // Check if we have existing places to migrate
    const placesDir = path.join(process.cwd(), 'src', 'content', 'places');
    
    if (fs.existsSync(placesDir)) {
      const files = fs.readdirSync(placesDir).filter(file => file.endsWith('.md'));
      
      if (files.length > 0) {
        await migratePlaces();
      } else {
        console.log('📁 No existing places found, creating example places...');
        await createExamplePlaces();
      }
    } else {
      console.log('📁 No places directory found, creating example places...');
      await createExamplePlaces();
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
main();
