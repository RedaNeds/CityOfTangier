import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { SanityPlace, SanityNeighborhood } from '../../lib/sanity';

interface MapMarkerProps {
  place?: SanityPlace;
  neighborhood?: SanityNeighborhood;
  position: [number, number];
  onClick?: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({
  place,
  neighborhood,
  position,
  onClick
}) => {
  // Get category colors
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'see-do': '#3b82f6',      // Blue
      'eat-drink': '#ef4444',    // Red
      'accommodation': '#10b981', // Green
      'shopping': '#8b5cf6',     // Purple
      'services': '#6b7280',     // Gray
      'neighborhoods': '#f59e0b'  // Amber
    };
    return colors[category] || '#3b82f6';
  };

  // Create custom icon
  const createCustomIcon = (category: string, isFeatured: boolean = false, isNeighborhood: boolean = false) => {
    const color = getCategoryColor(category);
    const size = isFeatured ? 35 : 25;
    const icon = isNeighborhood ? '🏘️' : category.charAt(0).toUpperCase();
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${isFeatured ? '16px' : '12px'};
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        ">
          ${isFeatured ? '★' : icon}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2]
    });
  };

  // Render place marker
  if (place) {
    const coords = place.location?.coordinates;
    if (!coords) return null;

    return (
      <Marker
        position={position}
        icon={createCustomIcon(place.category, place.featured)}
        eventHandlers={{
          click: onClick
        }}
      >
        <Popup className="map-popup" maxWidth={300} minWidth={200}>
          <div className="p-3">
            {/* Place Image */}
            {place.featuredImage && (
              <div className="mb-3">
                <img 
                  src={place.featuredImage.asset ? 
                    `https://cdn.sanity.io/images/${place.featuredImage.asset._ref.split('-')[1]}/${place.featuredImage.asset._ref.split('-')[2]}-${place.featuredImage.asset._ref.split('-')[3]}.${place.featuredImage.asset._ref.split('-')[4]}` : 
                    place.featuredImage
                  }
                  alt={place.featuredImage.alt || place.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
            
            {/* Place Title */}
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">{place.title}</h3>
            
            {/* Place Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{place.description}</p>
            
            {/* Category and Price */}
            <div className="flex items-center justify-between mb-3">
              <span 
                className="px-2 py-1 rounded text-xs font-medium text-white"
                style={{ backgroundColor: getCategoryColor(place.category) }}
              >
                {place.category.replace('-', ' ').toUpperCase()}
              </span>
              {place.priceLevel && (
                <span className="text-sm font-medium text-green-600">{place.priceLevel}</span>
              )}
            </div>
            
            {/* Rating */}
            {place.rating && (
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.floor(place.rating))}
                  {'☆'.repeat(5 - Math.floor(place.rating))}
                </div>
                <span className="text-sm text-gray-600 ml-2">{place.rating}/5</span>
              </div>
            )}
            
            {/* Tags */}
            {place.tags && place.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {place.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
                {place.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{place.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
            
            {/* Location */}
            {place.location?.address && (
              <div className="text-xs text-gray-500 mb-3">
                📍 {place.location.address}
              </div>
            )}
            
            {/* Action Button */}
            <div className="pt-2 border-t border-gray-200">
              <a 
                href={`/places/${place.slug.current}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  }

  // Render neighborhood marker
  if (neighborhood) {
    const coords = neighborhood.location?.coordinates;
    if (!coords) return null;

    return (
      <Marker
        position={position}
        icon={createCustomIcon('neighborhoods', neighborhood.featured, true)}
        eventHandlers={{
          click: onClick
        }}
      >
        <Popup className="map-popup" maxWidth={300} minWidth={200}>
          <div className="p-3">
            {/* Neighborhood Title */}
            <h3 className="font-semibold text-gray-900 mb-2 text-lg flex items-center">
              🏘️ {neighborhood.title}
              {neighborhood.featured && (
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Featured
                </span>
              )}
            </h3>
            
            {/* Neighborhood Description */}
            <p className="text-sm text-gray-600 mb-3">{neighborhood.description}</p>
            
            {/* Characteristics */}
            {neighborhood.characteristics && neighborhood.characteristics.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-2">Characteristics:</div>
                <div className="flex flex-wrap gap-1">
                  {neighborhood.characteristics.slice(0, 4).map((char, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                    >
                      {char.title}
                    </span>
                  ))}
                  {neighborhood.characteristics.length > 4 && (
                    <span className="text-xs text-gray-500">
                      +{neighborhood.characteristics.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Tags */}
            {neighborhood.tags && neighborhood.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {neighborhood.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Action Button */}
            <div className="pt-2 border-t border-gray-200">
              <a 
                href={`/places/neighborhoods/${neighborhood.slug.current}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Explore Neighborhood
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  }

  return null;
};

export default MapMarker;
