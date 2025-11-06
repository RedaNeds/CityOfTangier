import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || '0lav3g2f',
  dataset: import.meta.env.SANITY_DATASET || 'production',
  useCdn: import.meta.env.PROD, // Use CDN in production
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
  token: import.meta.env.SANITY_API_TOKEN, // Only needed for write operations
})

// Enhanced client with error handling
export const safeClient = {
  async fetch(query: string, params?: Record<string, any>) {
    try {
      return await client.fetch(query, params);
    } catch (error) {
      console.error('Sanity fetch error:', error);
      throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Helper function to generate image URLs
export function urlFor(source: any) {
  return builder.image(source)
}

// Optimized query helpers with projections
export const queries = {
  // Places - Optimized with projections
  allPlaces: `*[_type == "place"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    subcategory,
    featuredImage,
    location,
    rating,
    priceLevel,
    tags,
    featured,
    publishedAt
  }`,
  placesByCategory: (category: string) => `*[_type == "place" && category == "${category}"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    subcategory,
    featuredImage,
    location,
    rating,
    priceLevel,
    tags,
    featured,
    publishedAt
  }`,
  featuredPlaces: `*[_type == "place" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    subcategory,
    featuredImage,
    location,
    rating,
    priceLevel,
    tags,
    featured,
    publishedAt
  }`,
  placeBySlug: (slug: string) => `*[_type == "place" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    description,
    mainDescription,
    category,
    subcategory,
    featuredImage,
    gallery,
    location,
    contact,
    openingHours,
    rating,
    priceLevel,
    tags,
    highlights,
    featured,
    publishedAt
  }`,
  
  // Events
  allEvents: `*[_type == "event"] | order(eventDate asc)`,
  upcomingEvents: `*[_type == "event" && eventDate >= now()] | order(eventDate asc)`,
  featuredEvents: `*[_type == "event" && featured == true] | order(eventDate asc)`,
  eventBySlug: (slug: string) => `*[_type == "event" && slug.current == "${slug}"][0]`,
  
  // Itineraries
  allItineraries: `*[_type == "itinerary"] | order(publishedAt desc)`,
  featuredItineraries: `*[_type == "itinerary" && featured == true] | order(publishedAt desc)`,
  itineraryBySlug: (slug: string) => `*[_type == "itinerary" && slug.current == "${slug}"][0]`,
  
  // Guides
  allGuides: `*[_type == "guide"] | order(publishedAt desc)`,
  featuredGuides: `*[_type == "guide" && featured == true] | order(publishedAt desc)`,
  guideBySlug: (slug: string) => `*[_type == "guide" && slug.current == "${slug}"][0]`,
  
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
  category: 'attractions' | 'restaurants' | 'accommodation' | 'shopping' | 'services' | 'see-do' | 'eat-drink' // Legacy values included
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

export interface SanityGuide {
  _id: string
  _type: 'guide'
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

export interface SanityMuseum {
  _id: string
  _type: 'museum'
  title: string
  slug: { current: string }
  subtitle?: string
  description: string
  heroImage?: {
    asset: { _ref: string }
    alt?: string
  }
  gallery?: Array<{
    asset: { _ref: string }
  }>
  location?: {
    address?: string
    city?: string
    lat?: number
    lng?: number
  }
  openingHours?: Array<{
    day: string
    hours: string
    isOpen?: boolean
  }>
  ticketPrices?: {
    adult?: string
    student?: string
    child?: string
    groupNote?: string
  }
  collections?: Array<{
    title: string
    description: string
    image?: any
  }>
  history?: {
    title?: string
    description?: string
    timeline?: Array<{
      year: string
      event: string
    }>
  }
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
}

export interface SanityHistoricSite {
  _id: string
  _type: 'historicSite'
  title: string
  slug: { current: string }
  subtitle?: string
  description: string
  heroImage?: {
    asset: { _ref: string }
    alt?: string
  }
  gallery?: Array<{
    asset: { _ref: string }
  }>
  location?: {
    address?: string
    city?: string
    lat?: number
    lng?: number
  }
  openingHours?: Array<{
    day: string
    hours: string
    isOpen?: boolean
  }>
  ticketPrices?: {
    adult?: string
    student?: string
    child?: string
    groupNote?: string
  }
  historicalPeriod?: string
  architecturalStyle?: string
  significance?: string
  history?: {
    title?: string
    description?: string
    timeline?: Array<{
      year: string
      event: string
    }>
  }
  restorationInfo?: {
    hasBeenRestored?: boolean
    restorationYear?: string
    details?: string
  }
  UNESCO?: boolean
  guidedToursRequired?: boolean
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
}

export interface SanityNature {
  _id: string
  _type: 'nature'
  title: string
  slug: { current: string }
  subtitle?: string
  description: string
  heroImage?: {
    asset: { _ref: string }
    alt?: string
  }
  gallery?: Array<{
    asset: { _ref: string }
  }>
  location?: {
    address?: string
    city?: string
    lat?: number
    lng?: number
    area?: number
  }
  openingHours?: Array<{
    day: string
    hours: string
    isOpen?: boolean
  }>
  terrainType?: string
  activities?: string[]
  difficulty?: 'easy' | 'moderate' | 'challenging'
  trails?: Array<{
    name: string
    distance?: string
    duration?: string
    difficulty?: string
  }>
  flora?: string[]
  fauna?: string[]
  bestSeason?: string
  facilities?: string[]
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
}

export interface SanityBeach {
  _id: string
  _type: 'beach'
  title: string
  slug: { current: string }
  subtitle?: string
  description: string
  heroImage?: {
    asset: { _ref: string }
    alt?: string
  }
  gallery?: Array<{
    asset: { _ref: string }
  }>
  location?: {
    address?: string
    city?: string
    lat?: number
    lng?: number
  }
  beachType?: string
  accessibility?: string
  facilities?: {
    showers?: boolean
    lockers?: boolean
    parking?: boolean
    sunbeds?: boolean
    umbrellas?: boolean
    restrooms?: boolean
    changeRooms?: boolean
  }
  waterSports?: string[]
  lifeguard?: boolean
  blueFlag?: boolean
  restaurants?: Array<{
    name: string
    type?: string
    description?: string
  }>
  bestTimeToVisit?: string
  wavesInfo?: string
  familyFriendly?: boolean
  parking?: {
    available?: boolean
    cost?: string
    notes?: string
  }
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
}

export interface SanityMarket {
  _id: string
  _type: 'market'
  title: string
  slug: { current: string }
  subtitle?: string
  description: string
  heroImage?: {
    asset: { _ref: string }
    alt?: string
  }
  gallery?: Array<{
    asset: { _ref: string }
  }>
  location?: {
    address?: string
    city?: string
    lat?: number
    lng?: number
  }
  openingHours?: Array<{
    day: string
    hours: string
    isOpen?: boolean
  }>
  marketType?: string
  marketDays?: string[]
  bestTimeToVisit?: string
  specialties?: string[]
  vendors?: {
    approximateNumber?: number
    types?: string[]
  }
  bargaining?: {
    expected?: boolean
    tips?: string
  }
  priceLevel?: string
  indoorOutdoor?: string
  crowdLevel?: string
  localTips?: string[]
  contact?: {
    phone?: string
    email?: string
    website?: string
  }
}
