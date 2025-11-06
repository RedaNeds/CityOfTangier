import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapMarker from './MapMarker';
import type { SanityPlace, SanityNeighborhood } from '../../lib/sanity';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CityMapProps {
  places: SanityPlace[];
  neighborhoods: SanityNeighborhood[];
  center: [number, number];
  zoom: number;
  selectedCategory?: string;
  selectedNeighborhood?: string;
  searchQuery?: string;
}

// Custom hook to handle map updates
function MapUpdater({ 
  places, 
  selectedCategory, 
  selectedNeighborhood, 
  searchQuery 
}: { 
  places: SanityPlace[];
  selectedCategory?: string;
  selectedNeighborhood?: string;
  searchQuery?: string;
}) {
  const map = useMap();
  
  useEffect(() => {
    if (places.length > 0) {
      const bounds = L.latLngBounds(
        places.map(place => [
          place.location?.coordinates?.lat || 0,
          place.location?.coordinates?.lng || 0
        ])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [places, map]);
  
  return null;
}

const CityMap: React.FC<CityMapProps> = ({
  places,
  neighborhoods,
  center,
  zoom,
  selectedCategory,
  selectedNeighborhood,
  searchQuery
}) => {
  const [filteredPlaces, setFilteredPlaces] = useState<SanityPlace[]>(places);
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<SanityNeighborhood[]>(neighborhoods);
  const mapRef = useRef<L.Map>(null);

  // Filter places based on selected filters
  useEffect(() => {
    let filtered = places;

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }

    if (selectedNeighborhood && selectedNeighborhood !== 'all') {
      // This would need to be implemented based on how neighborhoods are linked to places
      // For now, we'll filter by coordinates within neighborhood bounds
      const neighborhood = neighborhoods.find(n => n.slug.current === selectedNeighborhood);
      if (neighborhood?.location?.bounds) {
        const bounds = neighborhood.location.bounds;
        filtered = filtered.filter(place => {
          const coords = place.location?.coordinates;
          if (!coords) return false;
          return coords.lat >= bounds.south && 
                 coords.lat <= bounds.north && 
                 coords.lng >= bounds.west && 
                 coords.lng <= bounds.east;
        });
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(place => 
        place.title.toLowerCase().includes(query) ||
        place.description.toLowerCase().includes(query) ||
        place.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPlaces(filtered);
  }, [places, selectedCategory, selectedNeighborhood, searchQuery]);

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

  // Create custom icons for different categories
  const createCustomIcon = (category: string, isFeatured: boolean = false) => {
    const color = getCategoryColor(category);
    const size = isFeatured ? 35 : 25;
    
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
        ">
          ${isFeatured ? '★' : category.charAt(0).toUpperCase()}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2]
    });
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map Updater for bounds */}
        <MapUpdater 
          places={filteredPlaces}
          selectedCategory={selectedCategory}
          selectedNeighborhood={selectedNeighborhood}
          searchQuery={searchQuery}
        />
        
        {/* Render place markers */}
        {filteredPlaces.map((place) => {
          const coords = place.location?.coordinates;
          if (!coords) return null;
          
          return (
            <Marker
              key={place._id}
              position={[coords.lat, coords.lng]}
              icon={createCustomIcon(place.category, place.featured)}
            >
              <Popup className="map-popup">
                <div style={{ padding: '8px' }}>
                  <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '8px' }}>{place.title}</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{place.description}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="category">{place.category}</span>
                    {place.priceLevel && (
                      <span className="price-level">{place.priceLevel}</span>
                    )}
                  </div>
                  
                  {place.rating && (
                    <div className="rating">
                      <div className="stars">
                        {'★'.repeat(Math.floor(place.rating))}
                        {'☆'.repeat(5 - Math.floor(place.rating))}
                      </div>
                      <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>{place.rating}/5</span>
                    </div>
                  )}
                  
                  {place.tags && place.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                      {place.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          style={{ 
                            fontSize: '12px', 
                            backgroundColor: '#f3f4f6', 
                            color: '#6b7280', 
                            padding: '4px 8px', 
                            borderRadius: '4px' 
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                    <a 
                      href={`/places/${place.slug.current}`}
                      style={{ 
                        color: '#2563eb', 
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      View Details →
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {/* Render neighborhood markers */}
        {filteredNeighborhoods.map((neighborhood) => {
          const coords = neighborhood.location?.coordinates;
          if (!coords) return null;
          
          return (
            <Marker
              key={neighborhood._id}
              position={[coords.lat, coords.lng]}
              icon={createCustomIcon('neighborhoods', neighborhood.featured)}
            >
              <Popup className="map-popup">
                <div style={{ padding: '8px' }}>
                  <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '8px' }}>{neighborhood.title}</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{neighborhood.description}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="category">Neighborhood</span>
                    {neighborhood.featured && (
                      <span style={{ 
                        fontSize: '12px', 
                        backgroundColor: '#fef3c7', 
                        color: '#92400e', 
                        padding: '4px 8px', 
                        borderRadius: '4px' 
                      }}>
                        Featured
                      </span>
                    )}
                  </div>
                  
                  {neighborhood.characteristics && neighborhood.characteristics.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Characteristics:</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {neighborhood.characteristics.slice(0, 3).map((char, index) => (
                          <span 
                            key={index}
                            style={{ 
                              fontSize: '12px', 
                              backgroundColor: '#dbeafe', 
                              color: '#2563eb', 
                              padding: '4px 8px', 
                              borderRadius: '4px' 
                            }}
                          >
                            {char.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                    <a 
                      href={`/places/neighborhoods/${neighborhood.slug.current}`}
                      style={{ 
                        color: '#2563eb', 
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      Explore Neighborhood →
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CityMap;
