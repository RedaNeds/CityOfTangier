import type { APIRoute } from 'astro';
import { client } from '../../lib/sanity';

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q');
  
  if (!query || query.length < 2) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Search across places, events, and itineraries
    const [places, events, itineraries] = await Promise.all([
      client.fetch(`
        *[_type == "place" && (
          title match "*${query}*" || 
          description match "*${query}*" ||
          tags[] match "*${query}*"
        )] | order(publishedAt desc) [0...5] {
          _id,
          title,
          slug,
          description,
          category,
          featuredImage,
          _type
        }
      `),
      client.fetch(`
        *[_type == "event" && (
          title match "*${query}*" || 
          description match "*${query}*" ||
          tags[] match "*${query}*"
        )] | order(eventDate asc) [0...5] {
          _id,
          title,
          slug,
          description,
          category,
          featuredImage,
          eventDate,
          _type
        }
      `),
      client.fetch(`
        *[_type == "itinerary" && (
          title match "*${query}*" || 
          description match "*${query}*" ||
          tags[] match "*${query}*"
        )] | order(publishedAt desc) [0...5] {
          _id,
          title,
          slug,
          description,
          duration,
          featuredImage,
          _type
        }
      `)
    ]);

    // Transform results to unified format
    const results = [
      ...places.map(place => ({
        id: place._id,
        title: place.title,
        type: place.category || 'place',
        url: `/places/${place.slug.current}`,
        description: place.description,
        image: place.featuredImage ? place.featuredImage.asset?.url : undefined
      })),
      ...events.map(event => ({
        id: event._id,
        title: event.title,
        type: 'event',
        url: `/events/${event.slug.current}`,
        description: event.description,
        image: event.featuredImage ? event.featuredImage.asset?.url : undefined
      })),
      ...itineraries.map(itinerary => ({
        id: itinerary._id,
        title: itinerary.title,
        type: 'itinerary',
        url: `/itineraries/${itinerary.slug.current}`,
        description: itinerary.description,
        image: itinerary.featuredImage ? itinerary.featuredImage.asset?.url : undefined
      }))
    ].slice(0, 10); // Limit to 10 results

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });

  } catch (error) {
    console.error('Search API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Search failed',
      results: [] 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};


