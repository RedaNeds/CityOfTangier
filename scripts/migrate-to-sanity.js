import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration Sanity
const client = createClient({
  projectId: '0lav3g2f',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Vous devrez ajouter votre token
})

// Fonction pour convertir le contenu markdown en blocs Sanity
function markdownToSanityBlocks(markdown) {
  if (!markdown) return []
  
  const lines = markdown.split('\n')
  const blocks = []
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    if (!trimmed) {
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${Math.random()}`,
        style: 'normal',
        children: [{ _type: 'span', _key: `span_${Date.now()}_${Math.random()}`, text: '' }]
      })
      continue
    }
    
    // Headers
    if (trimmed.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${Math.random()}`,
        style: 'h3',
        children: [{ _type: 'span', _key: `span_${Date.now()}_${Math.random()}`, text: trimmed.substring(4) }]
      })
    } else if (trimmed.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${Math.random()}`,
        style: 'h2',
        children: [{ _type: 'span', _key: `span_${Date.now()}_${Math.random()}`, text: trimmed.substring(3) }]
      })
    } else if (trimmed.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${Math.random()}`,
        style: 'h1',
        children: [{ _type: 'span', _key: `span_${Date.now()}_${Math.random()}`, text: trimmed.substring(2) }]
      })
    } else if (trimmed.startsWith('- ')) {
      // List items
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${Math.random()}`,
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: `span_${Date.now()}_${Math.random()}`, text: trimmed.substring(2) }]
      })
    } else {
      // Regular paragraph
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${Math.random()}`,
        style: 'normal',
        children: [{ _type: 'span', _key: `span_${Date.now()}_${Math.random()}`, text: trimmed }]
      })
    }
  }
  
  return blocks
}

// Fonction pour migrer les places
async function migratePlaces() {
  console.log('🔄 Migration des places...')
  
  const placesDir = path.join(__dirname, '../src/content/places/see-do')
  const files = fs.readdirSync(placesDir)
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    
    const filePath = path.join(placesDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Parser le frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!frontmatterMatch) continue
    
    const frontmatter = frontmatterMatch[1]
    const markdownContent = frontmatterMatch[2]
    
    // Extraire les données du frontmatter
    const data = {}
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim()
        
        if (key.trim() === 'tags' || key.trim() === 'highlights') {
          // Arrays
          data[key.trim()] = value.replace(/[\[\]]/g, '').split(',').map(v => v.trim().replace(/"/g, ''))
        } else if (key.trim() === 'coordinates') {
          // Coordinates object
          const latMatch = value.match(/lat:\s*([0-9.-]+)/)
          const lngMatch = value.match(/lng:\s*([0-9.-]+)/)
          if (latMatch && lngMatch) {
            data.coordinates = {
              lat: parseFloat(latMatch[1]),
              lng: parseFloat(lngMatch[1])
            }
          }
        } else if (key.trim() === 'openingHours') {
          // Opening hours array
          data.openingHours = []
          const hoursMatch = value.match(/\[(.*?)\]/s)
          if (hoursMatch) {
            const hoursContent = hoursMatch[1]
            const dayMatches = hoursContent.match(/- day: "([^"]+)"\s*hours: "([^"]+)"/g)
            if (dayMatches) {
              dayMatches.forEach(match => {
                const dayMatch = match.match(/day: "([^"]+)"/)
                const hoursMatch = match.match(/hours: "([^"]+)"/)
                if (dayMatch && hoursMatch) {
                  data.openingHours.push({
                    day: dayMatch[1],
                    hours: hoursMatch[1]
                  })
                }
              })
            }
          }
        } else if (key.trim() === 'rating' || key.trim() === 'pubDate') {
          // Numbers and dates
          if (key.trim() === 'rating') {
            data[key.trim()] = parseFloat(value)
          } else {
            data[key.trim()] = value
          }
        } else {
          // Strings
          data[key.trim()] = value.replace(/"/g, '')
        }
      }
    })
    
    // Créer le document Sanity
    const sanityDoc = {
      _type: 'place',
      title: data.title || 'Untitled',
      slug: {
        _type: 'slug',
        current: file.replace('.md', '')
      },
      description: data.description || '',
      category: 'see-do',
      subcategory: data.category || 'other',
      content: markdownToSanityBlocks(markdownContent),
      location: data.coordinates ? {
        coordinates: data.coordinates
      } : undefined,
      openingHours: data.openingHours || undefined,
      rating: data.rating || undefined,
      priceLevel: data.priceLevel || undefined,
      tags: data.tags || [],
      highlights: data.highlights || [],
      featured: false,
      publishedAt: data.pubDate ? new Date(data.pubDate).toISOString() : new Date().toISOString()
    }
    
    try {
      const result = await client.create(sanityDoc)
      console.log(`✅ Migré: ${data.title} (${result._id})`)
    } catch (error) {
      console.error(`❌ Erreur pour ${data.title}:`, error.message)
    }
  }
}

// Fonction pour migrer les itinéraires
async function migrateItineraries() {
  console.log('🔄 Migration des itinéraires...')
  
  const itinerariesDir = path.join(__dirname, '../src/content/itineraries')
  const files = fs.readdirSync(itinerariesDir)
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    
    const filePath = path.join(itinerariesDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Parser le frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!frontmatterMatch) continue
    
    const frontmatter = frontmatterMatch[1]
    const markdownContent = frontmatterMatch[2]
    
    // Extraire les données du frontmatter
    const data = {}
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim()
        
        if (key.trim() === 'tags') {
          data[key.trim()] = value.replace(/[\[\]]/g, '').split(',').map(v => v.trim().replace(/"/g, ''))
        } else {
          data[key.trim()] = value.replace(/"/g, '')
        }
      }
    })
    
    // Créer le document Sanity
    const sanityDoc = {
      _type: 'itinerary',
      title: data.title || 'Untitled',
      slug: {
        _type: 'slug',
        current: file.replace('.md', '')
      },
      description: data.description || '',
      duration: data.duration || 'full-day',
      difficulty: data.difficulty || 'easy',
      budget: data.budget || 'mid-range',
      totalStops: data.totalStops || 1,
      totalDuration: data.totalDuration || '1 day',
      content: markdownToSanityBlocks(markdownContent),
      tags: data.tags || [],
      featured: false,
      publishedAt: data.pubDate ? new Date(data.pubDate).toISOString() : new Date().toISOString()
    }
    
    try {
      const result = await client.create(sanityDoc)
      console.log(`✅ Migré: ${data.title} (${result._id})`)
    } catch (error) {
      console.error(`❌ Erreur pour ${data.title}:`, error.message)
    }
  }
}

// Fonction pour migrer les articles de blog
async function migrateBlogPosts() {
  console.log('🔄 Migration des articles de blog...')
  
  const blogDir = path.join(__dirname, '../src/content/blog')
  const files = fs.readdirSync(blogDir)
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    
    const filePath = path.join(blogDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Parser le frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!frontmatterMatch) continue
    
    const frontmatter = frontmatterMatch[1]
    const markdownContent = frontmatterMatch[2]
    
    // Extraire les données du frontmatter
    const data = {}
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim()
        data[key.trim()] = value.replace(/"/g, '')
      }
    })
    
    // Créer le document Sanity
    const sanityDoc = {
      _type: 'blogPost',
      title: data.title || 'Untitled',
      slug: {
        _type: 'slug',
        current: file.replace('.md', '')
      },
      excerpt: data.description || '',
      content: markdownToSanityBlocks(markdownContent),
      author: {
        name: data.author || 'City of Tangier Team'
      },
      category: 'travel-tips',
      tags: [],
      featured: false,
      publishedAt: data.pubDate ? new Date(data.pubDate).toISOString() : new Date().toISOString()
    }
    
    try {
      const result = await client.create(sanityDoc)
      console.log(`✅ Migré: ${data.title} (${result._id})`)
    } catch (error) {
      console.error(`❌ Erreur pour ${data.title}:`, error.message)
    }
  }
}

// Fonction principale
async function migrate() {
  console.log('🚀 Début de la migration vers Sanity...')
  
  try {
    await migratePlaces()
    await migrateItineraries()
    await migrateBlogPosts()
    
    console.log('🎉 Migration terminée avec succès!')
    console.log('📝 Vous pouvez maintenant voir votre contenu dans Sanity Studio: http://localhost:3333/')
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
  }
}

// Exécuter la migration
migrate()
