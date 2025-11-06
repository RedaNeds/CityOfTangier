/**
 * Script to check Sanity content and debug connection
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '0lav3g2f',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function checkContent() {
  console.log('🔍 Checking Sanity connection and content...\n')

  try {
    // Check if we can connect
    console.log('📡 Testing connection...')
    const datasets = await client.datasets.list()
    console.log(`✅ Connected! Available datasets: ${datasets.join(', ')}\n`)

    // Check for the specific place
    console.log('🔍 Looking for "musee-la-kasbah"...')
    const kasbahPlace = await client.fetch(`
      *[_type == "place" && slug.current == "musee-la-kasbah"][0] {
        _id,
        title,
        slug,
        category,
        subcategory,
        description
      }
    `)

    if (kasbahPlace) {
      console.log('✅ Found place:')
      console.log(`   Title: ${kasbahPlace.title}`)
      console.log(`   Slug: ${kasbahPlace.slug.current}`)
      console.log(`   Category: ${kasbahPlace.category}`)
      console.log(`   Subcategory: ${kasbahPlace.subcategory || 'N/A'}`)
      console.log(`   Description: ${kasbahPlace.description?.substring(0, 100)}...\n`)
    } else {
      console.log('❌ Place not found with slug "musee-la-kasbah"\n')
    }

    // Get all places and their categories
    console.log('📊 Getting all places...')
    const allPlaces = await client.fetch(`
      *[_type == "place"] {
        _id,
        title,
        "slug": slug.current,
        category,
        subcategory
      }
    `)

    console.log(`✅ Found ${allPlaces.length} total places\n`)

    // Group by category
    const byCategory = allPlaces.reduce((acc, place) => {
      const cat = place.category || 'uncategorized'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(place)
      return acc
    }, {})

    console.log('📊 Places by category:')
    Object.entries(byCategory).forEach(([category, places]) => {
      console.log(`   ${category}: ${places.length} places`)
    })
    console.log('')

    // List first 10 places
    console.log('📝 First 10 places:')
    allPlaces.slice(0, 10).forEach((place, index) => {
      console.log(`   ${index + 1}. ${place.title} (/${place.category}/${place.slug})`)
    })
    console.log('')

    // Check for places with "kasbah" in title or slug
    console.log('🔍 Searching for places with "kasbah" in title or slug...')
    const kasbahRelated = allPlaces.filter(p =>
      p.title?.toLowerCase().includes('kasbah') ||
      p.slug?.toLowerCase().includes('kasbah')
    )

    if (kasbahRelated.length > 0) {
      console.log(`✅ Found ${kasbahRelated.length} places:`)
      kasbahRelated.forEach(p => {
        console.log(`   - ${p.title} (${p.category}/${p.slug})`)
      })
    } else {
      console.log('❌ No places found with "kasbah" in title or slug')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', error.response)
    }
  }
}

checkContent()
