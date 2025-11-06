#!/usr/bin/env node

/**
 * Sanity Content Synchronization Script
 * This script ensures that all content from Sanity is properly synced with the site
 */

import { createClient } from '@sanity/client';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '0lav3g2f',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
});

// Content types to sync
const CONTENT_TYPES = [
  'place',
  'event', 
  'itinerary',
  'neighborhood',
  'blogPost',
  'guide',
  'partner'
];

async function syncContent() {
  console.log('🔄 Starting Sanity content synchronization...\n');

  const results = {
    total: 0,
    synced: 0,
    errors: 0,
    byType: {}
  };

  for (const contentType of CONTENT_TYPES) {
    console.log(`📝 Syncing ${contentType}s...`);
    
    try {
      // Get all documents of this type
      const query = `*[_type == "${contentType}"] | order(_createdAt desc) {
        _id,
        _type,
        title,
        slug,
        publishedAt,
        _createdAt,
        _updatedAt
      }`;
      
      const documents = await client.fetch(query);
      results.byType[contentType] = documents.length;
      results.total += documents.length;
      
      console.log(`   ✅ Found ${documents.length} ${contentType}s`);
      
      // Validate required fields
      const invalidDocs = documents.filter(doc => 
        !doc.title || !doc.slug || !doc.slug.current
      );
      
      if (invalidDocs.length > 0) {
        console.log(`   ⚠️  ${invalidDocs.length} ${contentType}s missing required fields`);
        invalidDocs.forEach(doc => {
          console.log(`      - ${doc._id}: ${doc.title || 'No title'}`);
        });
      }
      
      results.synced += documents.length - invalidDocs.length;
      
    } catch (error) {
      console.error(`   ❌ Error syncing ${contentType}s:`, error.message);
      results.errors++;
    }
  }

  // Generate sync report
  const report = {
    timestamp: new Date().toISOString(),
    summary: results,
    details: results.byType
  };

  // Save report
  const reportPath = path.join(__dirname, '..', 'sanity-sync-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

  console.log('\n📊 Synchronization Summary:');
  console.log(`   Total documents: ${results.total}`);
  console.log(`   Successfully synced: ${results.synced}`);
  console.log(`   Errors: ${results.errors}`);
  console.log('\n📄 Detailed report saved to: sanity-sync-report.json');

  // Check for missing content
  if (results.synced === 0) {
    console.log('\n⚠️  WARNING: No content found! Check your Sanity configuration.');
    console.log('   - Verify SANITY_PROJECT_ID and SANITY_DATASET');
    console.log('   - Check if content exists in your Sanity studio');
    console.log('   - Verify API token permissions');
  }

  return results;
}

// Validate Sanity connection
async function validateConnection() {
  try {
    console.log('🔍 Validating Sanity connection...');
    
    const result = await client.fetch('*[_type == "place"][0]');
    
    if (result) {
      console.log('   ✅ Sanity connection successful');
      console.log(`   📍 Project: ${client.config().projectId}`);
      console.log(`   🗄️  Dataset: ${client.config().dataset}`);
      return true;
    } else {
      console.log('   ⚠️  No content found in Sanity');
      return false;
    }
  } catch (error) {
    console.error('   ❌ Sanity connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check your .env file for SANITY_PROJECT_ID and SANITY_DATASET');
    console.log('   2. Verify your Sanity project exists and is accessible');
    console.log('   3. Check your API token permissions');
    return false;
  }
}

// Main execution
async function main() {
  console.log('🚀 Sanity Content Synchronization Tool\n');
  
  const isConnected = await validateConnection();
  
  if (!isConnected) {
    process.exit(1);
  }
  
  const results = await syncContent();
  
  if (results.errors > 0) {
    console.log('\n⚠️  Some errors occurred during synchronization');
    process.exit(1);
  }
  
  console.log('\n✅ Synchronization completed successfully!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { syncContent, validateConnection };
