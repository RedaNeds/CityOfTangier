import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '0lav3g2f',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
});

console.log('🔍 Testing Sanity connection...');

try {
  // Test basic connection
  const result = await client.fetch('*[_type == "neighborhood"][0]');
  console.log('✅ Connection successful');
  console.log('📊 Sample neighborhood:', result ? result.title : 'No neighborhoods found');
  
  // Count all content types
  const counts = await Promise.all([
    client.fetch('count(*[_type == "place"])'),
    client.fetch('count(*[_type == "event"])'),
    client.fetch('count(*[_type == "itinerary"])'),
    client.fetch('count(*[_type == "neighborhood"])'),
    client.fetch('count(*[_type == "blogPost"])'),
    client.fetch('count(*[_type == "guide"])'),
    client.fetch('count(*[_type == "partner"])')
  ]);
  
  console.log('\n📈 Content counts:');
  console.log(`   Places: ${counts[0]}`);
  console.log(`   Events: ${counts[1]}`);
  console.log(`   Itineraries: ${counts[2]}`);
  console.log(`   Neighborhoods: ${counts[3]}`);
  console.log(`   Blog Posts: ${counts[4]}`);
  console.log(`   Guides: ${counts[5]}`);
  console.log(`   Partners: ${counts[6]}`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}



