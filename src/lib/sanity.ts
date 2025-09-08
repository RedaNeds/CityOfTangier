import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || '0lav3g2f',
  dataset: import.meta.env.SANITY_DATASET || 'production',
  useCdn: import.meta.env.PROD, // Use CDN in production
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
  token: import.meta.env.SANITY_API_TOKEN, // Only needed for write operations
})

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Helper function to generate image URLs
export function urlFor(source: any) {
  return builder.image(source)
}

// Query helpers
export const queries = {
  // Places
  allPlaces: `*[_type == "place"] | order(publishedAt desc)`,
  placesByCategory: (category: string) => `*[_type == "place" && category == "${category}"] | order(publishedAt desc)`,
  featuredPlaces: `*[_type == "place" && featured == true] | order(publishedAt desc)`,
  placeBySlug: (slug: string) => `*[_type == "place" && slug.current == "${slug}"][0]`,
  
  // Events
  allEvents: `*[_type == "event"] | order(eventDate asc)`,
  upcomingEvents: `*[_type == "event" && eventDate >= now()] | order(eventDate asc)`,
  featuredEvents: `*[_type == "event" && featured == true] | order(eventDate asc)`,
  eventBySlug: (slug: string) => `*[_type == "event" && slug.current == "${slug}"][0]`,
  
  // Itineraries
  allItineraries: `*[_type == "itinerary"] | order(publishedAt desc)`,
  featuredItineraries: `*[_type == "itinerary" && featured == true] | order(publishedAt desc)`,
  itineraryBySlug: (slug: string) => `*[_type == "itinerary" && slug.current == "${slug}"][0]`,
  
  // Blog Posts
  allBlogPosts: `*[_type == "blogPost"] | order(publishedAt desc)`,
  featuredBlogPosts: `*[_type == "blogPost" && featured == true] | order(publishedAt desc)`,
  blogPostBySlug: (slug: string) => `*[_type == "blogPost" && slug.current == "${slug}"][0]`,
  
  // Neighborhoods
  allNeighborhoods: `*[_type == "neighborhood"] | order(publishedAt desc)`,
  featuredNeighborhoods: `*[_type == "neighborhood" && featured == true] | order(publishedAt desc)`,
  neighborhoodBySlug: (slug: string) => `*[_type == "neighborhood" && slug.current == "${slug}"][0]`,
  
  // Partners
  allPartners: `*[_type == "partner" && active == true] | order(publishedAt desc)`,
  featuredPartners: `*[_type == "partner" && featured == true && active == true] | order(publishedAt desc)`,
  partnersByType: (type: string) => `*[_type == "partner" && type == "${type}" && active == true] | order(publishedAt desc)`,
  partnerBySlug: (slug: string) => `*[_type == "partner" && slug.current == "${slug}"][0]`,
}

// Type definitions for Sanity documents
export interface SanityPlace {
  _id: string
  _type: 'place'
  title: string
  slug: { current: string }
  description: string
  category: 'see-do' | 'eat-drink' | 'neighborhoods'
  subcategory?: string
  featuredImage?: {
    asset: { _ref: string }
    alt?: string
  }
  gallery?: Array<{
    asset: { _ref: string }
    alt?: string
    caption?: string
  }>
  content?: any[]
  location?: {
    address?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
  openingHours?: Array<{
    day: string
    hours: string
  }>
  rating?: number
  priceLevel?: string
  tags?: string[]
  highlights?: string[]
  featured?: boolean
  publishedAt: string
}

export interface SanityEvent {
  _id: string
  _type: 'event'
  title: string
  slug: { current: string }
  description: string
  featuredImage?: {
    asset: { _ref: string }
    alt?: string
  }
  content?: any[]
  eventDate: string
  endDate?: string
  location?: {
    name?: string
    address?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  price?: {
    amount?: number
    currency?: string
    free?: boolean
  }
  category?: string
  tags?: string[]
  featured?: boolean
  publishedAt: string
}

export interface SanityItinerary {
  _id: string
  _type: 'itinerary'
  title: string
  slug: { current: string }
  description: string
  featuredImage?: {
    asset: { _ref: string }
    alt?: string
  }
  duration: string
  difficulty: 'easy' | 'moderate' | 'challenging'
  budget: string
  totalStops: number
  totalDuration: string
  periods?: any[]
  tips?: any[]
  transportation?: {
    primary?: string
    notes?: string
  }
  tags?: string[]
  featured?: boolean
  publishedAt: string
}

export interface SanityBlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: { current: string }
  excerpt: string
  featuredImage?: {
    asset: { _ref: string }
    alt?: string
  }
  content?: any[]
  author?: {
    name: string
    bio?: string
    avatar?: {
      asset: { _ref: string }
    }
  }
  category?: string
  tags?: string[]
  featured?: boolean
  publishedAt: string
}

export interface SanityNeighborhood {
  _id: string
  _type: 'neighborhood'
  title: string
  slug: { current: string }
  description: string
  featuredImage?: {
    asset: { _ref: string }
    alt?: string
  }
  content?: any[]
  location?: {
    coordinates?: {
      lat: number
      lng: number
    }
    bounds?: {
      north: number
      south: number
      east: number
      west: number
    }
  }
  characteristics?: any[]
  places?: Array<{ _ref: string }>
  tags?: string[]
  featured?: boolean
  publishedAt: string
}

export interface SanityPartner {
  _id: string
  _type: 'partner'
  name: string
  slug: { current: string }
  description: string
  logo?: {
    asset: { _ref: string }
    alt?: string
  }
  type: string
  contact?: {
    phone?: string
    email?: string
    website?: string
    address?: string
  }
  location?: {
    coordinates?: {
      lat: number
      lng: number
    }
  }
  services?: string[]
  specialOffers?: any[]
  featured?: boolean
  active?: boolean
  publishedAt: string
}
