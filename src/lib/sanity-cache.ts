// Sanity cache management for better performance
import { client } from './sanity';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class SanityCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  async fetch<T>(
    query: string, 
    params?: Record<string, any>, 
    ttl?: number
  ): Promise<T> {
    const cacheKey = this.generateCacheKey(query, params);
    const entry = this.cache.get(cacheKey);
    
    // Check if cache is valid
    if (entry && Date.now() - entry.timestamp < entry.ttl) {
      return entry.data;
    }

    try {
      // Fetch from Sanity
      const data = await client.fetch(query, params);
      
      // Store in cache
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        ttl: ttl || this.defaultTTL
      });

      return data;
    } catch (error) {
      console.error('Sanity fetch error:', error);
      
      // Return cached data if available, even if expired
      if (entry) {
        console.warn('Using expired cache data due to fetch error');
        return entry.data;
      }
      
      throw error;
    }
  }

  private generateCacheKey(query: string, params?: Record<string, any>): string {
    const paramsString = params ? JSON.stringify(params) : '';
    return `${query}:${paramsString}`;
  }

  // Clear cache for specific pattern
  clearCache(pattern?: string): void {
    if (pattern) {
      for (const [key] of this.cache) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  // Get cache stats
  getStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

export const sanityCache = new SanityCache();

// Helper functions for common queries
export const cachedQueries = {
  // Places
  async getPlaces(filters?: { category?: string; featured?: boolean }) {
    const query = `
      *[_type == "place"${filters?.category ? ` && category == "${filters.category}"` : ''}${filters?.featured ? ' && featured == true' : ''}] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        category,
        subcategory,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        },
        location {
          address,
          coordinates
        },
        rating,
        priceLevel,
        tags,
        featured,
        publishedAt
      }
    `;
    return sanityCache.fetch(query, {}, 10 * 60 * 1000); // 10 minutes cache
  },

  // Events
  async getEvents(filters?: { upcoming?: boolean; featured?: boolean }) {
    const query = `
      *[_type == "event"${filters?.upcoming ? ' && eventDate >= now()' : ''}${filters?.featured ? ' && featured == true' : ''}] | order(eventDate asc) {
        _id,
        title,
        slug,
        description,
        category,
        eventDate,
        endDate,
        location {
          name,
          address,
          coordinates
        },
        price {
          amount,
          currency,
          free
        },
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        },
        tags,
        featured,
        publishedAt
      }
    `;
    return sanityCache.fetch(query, {}, 5 * 60 * 1000); // 5 minutes cache
  },

  // Itineraries
  async getItineraries(filters?: { featured?: boolean }) {
    const query = `
      *[_type == "itinerary"${filters?.featured ? ' && featured == true' : ''}] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        duration,
        difficulty,
        budget,
        totalStops,
        totalDuration,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        },
        tags,
        featured,
        publishedAt
      }
    `;
    return sanityCache.fetch(query, {}, 15 * 60 * 1000); // 15 minutes cache
  },

  // Neighborhoods
  async getNeighborhoods(filters?: { featured?: boolean }) {
    const query = `
      *[_type == "neighborhood"${filters?.featured ? ' && featured == true' : ''}] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        location {
          coordinates,
          bounds
        },
        characteristics,
        tags,
        featured,
        publishedAt
      }
    `;
    return sanityCache.fetch(query, {}, 20 * 60 * 1000); // 20 minutes cache
  }
};



