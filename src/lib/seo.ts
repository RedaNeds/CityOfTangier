// SEO utilities and structured data generators

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'place' | 'event';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  location?: {
    name: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  priceLevel?: string;
}

export function generateStructuredData(props: SEOProps) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": props.type === 'place' ? 'TouristAttraction' : 
             props.type === 'event' ? 'Event' : 
             props.type === 'article' ? 'Article' : 'WebSite',
    "name": props.title,
    "description": props.description,
    "url": props.url,
    "image": props.image,
  };

  // Add location data if available
  if (props.location) {
    baseStructuredData["address"] = {
      "@type": "PostalAddress",
      "addressLocality": props.location.name,
      "addressCountry": "Morocco",
      "streetAddress": props.location.address
    };

    if (props.location.coordinates) {
      baseStructuredData["geo"] = {
        "@type": "GeoCoordinates",
        "latitude": props.location.coordinates.lat,
        "longitude": props.location.coordinates.lng
      };
    }
  }

  // Add rating if available
  if (props.rating) {
    baseStructuredData["aggregateRating"] = {
      "@type": "AggregateRating",
      "ratingValue": props.rating,
      "bestRating": 5
    };
  }

  // Add price level if available
  if (props.priceLevel) {
    baseStructuredData["priceRange"] = props.priceLevel;
  }

  // Add article-specific data
  if (props.type === 'article' && props.publishedTime) {
    baseStructuredData["datePublished"] = props.publishedTime;
    if (props.modifiedTime) {
      baseStructuredData["dateModified"] = props.modifiedTime;
    }
    if (props.author) {
      baseStructuredData["author"] = {
        "@type": "Person",
        "name": props.author
      };
    }
  }

  // Add event-specific data
  if (props.type === 'event' && props.publishedTime) {
    baseStructuredData["startDate"] = props.publishedTime;
  }

  // Add keywords
  if (props.tags && props.tags.length > 0) {
    baseStructuredData["keywords"] = props.tags.join(", ");
  }

  return baseStructuredData;
}

export function generateBreadcrumbs(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "City of Tangier",
    "url": "https://cityoftangier.com",
    "logo": "https://cityoftangier.com/logo.png",
    "description": "Your perfect Tangier experience - Discover the magic where Africa meets Europe",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tangier",
      "addressCountry": "Morocco"
    },
    "sameAs": [
      "https://www.facebook.com/cityoftangier",
      "https://www.instagram.com/cityoftangier",
      "https://www.twitter.com/cityoftangier"
    ]
  };
}

