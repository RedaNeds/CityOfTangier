import { defineCollection, z } from "astro:content";

const itineraries = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    duration: z.string(),
    difficulty: z.enum(['easy', 'moderate', 'challenging']),
    budget: z.string(),
    tags: z.array(z.string()),
    featuredImage: z.string().optional(),
    totalStops: z.number(),
    totalDuration: z.string(),
    pubDate: z.date(),
    author: z.string().optional(),
    // Flexible schema - periods can be any structure
    periods: z.array(z.any()).optional(),
    tips: z.array(z.any()).optional(),
    transportation: z.any().optional(),
  }),
});

const seeDo = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    featuredImage: z.string().optional(),
    pubDate: z.date(),
    author: z.string().optional(),
    rating: z.number().optional(),
    priceLevel: z.string().optional(),
    openingHours: z.array(z.object({
      day: z.string(),
      hours: z.string(),
    })).optional(),
    location: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
    highlights: z.array(z.string()).optional(),
  }),
});

const eatDrink = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    featuredImage: z.string().optional(),
    pubDate: z.date(),
    author: z.string().optional(),
    rating: z.number().optional(),
    priceLevel: z.string().optional(),
    openingHours: z.array(z.object({
      day: z.string(),
      hours: z.string(),
    })).optional(),
    location: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
    highlights: z.array(z.string()).optional(),
  }),
});

const places = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(), // "eat-drink", "see-do", "accommodation", etc.
    subcategory: z.string(), // "rooftops", "museums", "beaches", etc.
    tags: z.array(z.string()),
    featuredImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    pubDate: z.date(),
    author: z.string().optional(),
    rating: z.number().optional(),
    priceLevel: z.string().optional(),
    openingHours: z.array(z.object({
      day: z.string(),
      hours: z.string(),
    })).optional(),
    location: z.string().optional(),
    address: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
    highlights: z.array(z.string()).optional(),
    contact: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      website: z.string().optional(),
    }).optional(),
    amenities: z.array(z.string()).optional(),
    accessibility: z.object({
      wheelchairAccessible: z.boolean().optional(),
      parking: z.boolean().optional(),
      wifi: z.boolean().optional(),
    }).optional(),
  }),
});

export const collections = {
  itineraries,
  seeDo,
  eatDrink,
  places,
};
