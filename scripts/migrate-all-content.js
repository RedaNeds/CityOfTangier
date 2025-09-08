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
  projectId: process.env.SANITY_PROJECT_ID || '0lav3g2f',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

// Fonction pour convertir le markdown en blocs Sanity
function markdownToSanityBlocks(markdown) {
  if (!markdown || markdown.trim() === '') {
    return []
  }
  
  const lines = markdown.split('\n')
  const blocks = []
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim()
    
    if (trimmedLine === '') {
      return
    }
    
    // Titres
    if (trimmedLine.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${index}`,
        style: 'h1',
        children: [{
          _type: 'span',
          _key: `span_${Date.now()}_${index}`,
          text: trimmedLine.substring(2)
        }]
      })
    } else if (trimmedLine.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${index}`,
        style: 'h2',
        children: [{
          _type: 'span',
          _key: `span_${Date.now()}_${index}`,
          text: trimmedLine.substring(3)
        }]
      })
    } else if (trimmedLine.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${index}`,
        style: 'h3',
        children: [{
          _type: 'span',
          _key: `span_${Date.now()}_${index}`,
          text: trimmedLine.substring(4)
        }]
      })
    } else if (trimmedLine.startsWith('- ')) {
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${index}`,
        style: 'normal',
        listItem: 'bullet',
        children: [{
          _type: 'span',
          _key: `span_${Date.now()}_${index}`,
          text: trimmedLine.substring(2)
        }]
      })
    } else {
      // Paragraphe normal
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${index}`,
        style: 'normal',
        children: [{
          _type: 'span',
          _key: `span_${Date.now()}_${index}`,
          text: trimmedLine
        }]
      })
    }
  })
  
  return blocks
}

// Fonction pour extraire le frontmatter
function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!frontmatterMatch) {
    return { frontmatter: '', content: content }
  }
  
  return {
    frontmatter: frontmatterMatch[1],
    content: frontmatterMatch[2]
  }
}

// Fonction pour parser le frontmatter YAML simple
function parseYaml(yamlString) {
  const data = {}
  yamlString.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      
      // Gestion des listes
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key.trim()] = value.replace(/[\[\]]/g, '').split(',').map(v => v.trim().replace(/"/g, ''))
      }
      // Gestion des objets simples
      else if (key.trim() === 'coordinates' && value.includes(',')) {
        const [lat, lng] = value.split(',').map(v => parseFloat(v.trim()))
        data[key.trim()] = { lat, lng }
      }
      // Gestion des dates
      else if (key.trim().includes('Date') || key.trim().includes('date')) {
        data[key.trim()] = new Date(value).toISOString()
      }
      // Valeurs simples
      else {
        data[key.trim()] = value.replace(/"/g, '')
      }
    }
  })
  return data
}

// Migration des guides
async function migrateGuides() {
  console.log('🔄 Migration des guides...')
  
  const guidesDir = path.join(__dirname, '../src/content/guides')
  if (!fs.existsSync(guidesDir)) {
    console.log('📁 Dossier guides non trouvé, création...')
    fs.mkdirSync(guidesDir, { recursive: true })
    return
  }
  
  const files = fs.readdirSync(guidesDir)
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    
    const filePath = path.join(guidesDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    const { frontmatter, content: markdownContent } = parseFrontmatter(content)
    const data = parseYaml(frontmatter)
    
    const sanityDoc = {
      _type: 'guide',
      title: data.title || 'Untitled Guide',
      slug: {
        _type: 'slug',
        current: file.replace('.md', '')
      },
      description: data.description || '',
      excerpt: data.excerpt || data.description || '',
      category: data.category || 'other',
      difficulty: data.difficulty || 'beginner',
      estimatedReadTime: data.estimatedReadTime || 5,
      content: markdownToSanityBlocks(markdownContent),
      tags: data.tags || [],
      author: data.author ? {
        name: data.author,
        bio: data.authorBio || ''
      } : {
        name: 'City of Tangier Team',
        bio: 'Local experts sharing their knowledge of Tangier'
      },
      featured: data.featured === 'true' || data.featured === true,
      publishedAt: data.pubDate ? new Date(data.pubDate).toISOString() : new Date().toISOString()
    }
    
    try {
      const result = await client.create(sanityDoc)
      console.log(`✅ Migré: ${sanityDoc.title} (${result._id})`)
    } catch (error) {
      console.log(`❌ Erreur pour ${sanityDoc.title}: ${error.message}`)
    }
  }
}

// Migration des quartiers
async function migrateNeighborhoods() {
  console.log('🔄 Migration des quartiers...')
  
  const neighborhoodsDir = path.join(__dirname, '../src/content/neighborhoods')
  if (!fs.existsSync(neighborhoodsDir)) {
    console.log('📁 Dossier neighborhoods non trouvé, création...')
    fs.mkdirSync(neighborhoodsDir, { recursive: true })
    return
  }
  
  const files = fs.readdirSync(neighborhoodsDir)
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    
    const filePath = path.join(neighborhoodsDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    const { frontmatter, content: markdownContent } = parseFrontmatter(content)
    const data = parseYaml(frontmatter)
    
    const sanityDoc = {
      _type: 'neighborhood',
      title: data.title || 'Untitled Neighborhood',
      slug: {
        _type: 'slug',
        current: file.replace('.md', '')
      },
      description: data.description || '',
      content: markdownToSanityBlocks(markdownContent),
      location: data.coordinates ? {
        coordinates: data.coordinates
      } : undefined,
      characteristics: data.characteristics || [],
      tags: data.tags || [],
      featured: data.featured === 'true' || data.featured === true,
      publishedAt: data.pubDate ? new Date(data.pubDate).toISOString() : new Date().toISOString()
    }
    
    try {
      const result = await client.create(sanityDoc)
      console.log(`✅ Migré: ${sanityDoc.title} (${result._id})`)
    } catch (error) {
      console.log(`❌ Erreur pour ${sanityDoc.title}: ${error.message}`)
    }
  }
}

// Migration des partenaires
async function migratePartners() {
  console.log('🔄 Migration des partenaires...')
  
  const partnersDir = path.join(__dirname, '../src/content/partners')
  if (!fs.existsSync(partnersDir)) {
    console.log('📁 Dossier partners non trouvé, création...')
    fs.mkdirSync(partnersDir, { recursive: true })
    return
  }
  
  const files = fs.readdirSync(partnersDir)
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    
    const filePath = path.join(partnersDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    const { frontmatter, content: markdownContent } = parseFrontmatter(content)
    const data = parseYaml(frontmatter)
    
    const sanityDoc = {
      _type: 'partner',
      name: data.name || data.title || 'Untitled Partner',
      slug: {
        _type: 'slug',
        current: file.replace('.md', '')
      },
      description: data.description || '',
      type: data.type || 'other',
      contact: data.contact ? {
        phone: data.contact.phone,
        email: data.contact.email,
        website: data.contact.website,
        address: data.contact.address
      } : undefined,
      location: data.coordinates ? {
        coordinates: data.coordinates
      } : undefined,
      services: data.services || [],
      specialOffers: data.specialOffers || [],
      featured: data.featured === 'true' || data.featured === true,
      active: data.active !== 'false' && data.active !== false,
      publishedAt: data.pubDate ? new Date(data.pubDate).toISOString() : new Date().toISOString()
    }
    
    try {
      const result = await client.create(sanityDoc)
      console.log(`✅ Migré: ${sanityDoc.name} (${result._id})`)
    } catch (error) {
      console.log(`❌ Erreur pour ${sanityDoc.name}: ${error.message}`)
    }
  }
}

// Migration des produits
async function migrateProducts() {
  console.log('🔄 Migration des produits...')
  
  const productsDir = path.join(__dirname, '../src/content/products')
  if (!fs.existsSync(productsDir)) {
    console.log('📁 Dossier products non trouvé, création...')
    fs.mkdirSync(productsDir, { recursive: true })
    return
  }
  
  const files = fs.readdirSync(productsDir)
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    
    const filePath = path.join(productsDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    const { frontmatter, content: markdownContent } = parseFrontmatter(content)
    const data = parseYaml(frontmatter)
    
    const sanityDoc = {
      _type: 'product',
      name: data.name || data.title || 'Untitled Product',
      slug: {
        _type: 'slug',
        current: file.replace('.md', '')
      },
      description: data.description || '',
      shortDescription: data.shortDescription || data.description || '',
      category: data.category || 'other',
      price: data.price ? {
        amount: data.price.amount || data.price,
        currency: data.price.currency || 'EUR',
        originalPrice: data.price.originalPrice
      } : undefined,
      availability: {
        inStock: data.inStock !== 'false' && data.inStock !== false,
        quantity: data.quantity,
        preOrder: data.preOrder === 'true' || data.preOrder === true
      },
      specifications: data.specifications || [],
      vendor: data.vendor ? {
        name: data.vendor.name,
        location: data.vendor.location,
        contact: data.vendor.contact,
        coordinates: data.vendor.coordinates
      } : undefined,
      tags: data.tags || [],
      featured: data.featured === 'true' || data.featured === true,
      bestSeller: data.bestSeller === 'true' || data.bestSeller === true,
      newArrival: data.newArrival === 'true' || data.newArrival === true,
      publishedAt: data.pubDate ? new Date(data.pubDate).toISOString() : new Date().toISOString()
    }
    
    try {
      const result = await client.create(sanityDoc)
      console.log(`✅ Migré: ${sanityDoc.name} (${result._id})`)
    } catch (error) {
      console.log(`❌ Erreur pour ${sanityDoc.name}: ${error.message}`)
    }
  }
}

// Migration des événements
async function migrateEvents() {
  console.log('🔄 Migration des événements...')
  
  const eventsDir = path.join(__dirname, '../src/content/events')
  if (!fs.existsSync(eventsDir)) {
    console.log('📁 Dossier events non trouvé, création...')
    fs.mkdirSync(eventsDir, { recursive: true })
    return
  }
  
  const files = fs.readdirSync(eventsDir)
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    
    const filePath = path.join(eventsDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    const { frontmatter, content: markdownContent } = parseFrontmatter(content)
    const data = parseYaml(frontmatter)
    
    const sanityDoc = {
      _type: 'event',
      title: data.title || 'Untitled Event',
      slug: {
        _type: 'slug',
        current: file.replace('.md', '')
      },
      description: data.description || '',
      content: markdownToSanityBlocks(markdownContent),
      eventDate: data.eventDate ? new Date(data.eventDate).toISOString() : new Date().toISOString(),
      endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
      location: data.location ? {
        name: data.location.name,
        address: data.location.address,
        coordinates: data.location.coordinates
      } : undefined,
      price: data.price ? {
        amount: data.price.amount,
        currency: data.price.currency || 'EUR',
        free: data.price.free === 'true' || data.price.free === true
      } : undefined,
      category: data.category || 'other',
      tags: data.tags || [],
      featured: data.featured === 'true' || data.featured === true,
      publishedAt: data.pubDate ? new Date(data.pubDate).toISOString() : new Date().toISOString()
    }
    
    try {
      const result = await client.create(sanityDoc)
      console.log(`✅ Migré: ${sanityDoc.title} (${result._id})`)
    } catch (error) {
      console.log(`❌ Erreur pour ${sanityDoc.title}: ${error.message}`)
    }
  }
}

// Fonction principale
async function migrateAllContent() {
  console.log('🚀 Début de la migration complète vers Sanity...')
  
  try {
    await migrateGuides()
    await migrateNeighborhoods()
    await migratePartners()
    await migrateProducts()
    await migrateEvents()
    
    console.log('🎉 Migration complète terminée avec succès!')
    console.log('📝 Vous pouvez maintenant voir votre contenu dans Sanity Studio: http://localhost:3333/')
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
  }
}

// Exécuter la migration
migrateAllContent()

