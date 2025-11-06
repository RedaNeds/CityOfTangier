import React from 'react';
import type { SanityPlace, SanityNeighborhood } from '../../lib/sanity';

interface MapListViewProps {
  places: SanityPlace[];
  neighborhoods: SanityNeighborhood[];
  selectedCategory?: string;
  selectedNeighborhood?: string;
  searchQuery?: string;
}

const MapListView: React.FC<MapListViewProps> = ({
  places,
  neighborhoods,
  selectedCategory,
  selectedNeighborhood,
  searchQuery
}) => {
  // Filter places based on selected filters
  const getFilteredPlaces = () => {
    let filtered = places;

    if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'featured') {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }

    if (selectedCategory === 'featured') {
      filtered = filtered.filter(place => place.featured);
    }

    if (selectedNeighborhood && selectedNeighborhood !== 'all') {
      // This would need to be implemented based on how neighborhoods are linked to places
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

    return filtered;
  };

  const filteredPlaces = getFilteredPlaces();

  // Get category colors
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'see-do': '#3b82f6',
      'eat-drink': '#ef4444',
      'accommodation': '#10b981',
      'shopping': '#8b5cf6',
      'services': '#6b7280',
      'neighborhoods': '#f59e0b'
    };
    return colors[category] || '#3b82f6';
  };

  // Get category display name
  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      'see-do': 'See & Do',
      'eat-drink': 'Eat & Drink',
      'accommodation': 'Accommodation',
      'shopping': 'Shopping',
      'services': 'Services',
      'neighborhoods': 'Neighborhoods'
    };
    return names[category] || category;
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s ease'
  };

  const imageStyle: React.CSSProperties = {
    height: '192px',
    backgroundColor: '#e5e7eb',
    width: '100%',
    objectFit: 'cover'
  };

  const contentStyle: React.CSSProperties = {
    padding: '16px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const descriptionStyle: React.CSSProperties = {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '12px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const ratingStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  };

  const starsStyle: React.CSSProperties = {
    color: '#fbbf24',
    fontSize: '14px'
  };

  const tagsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    marginBottom: '12px'
  };

  const tagStyle: React.CSSProperties = {
    fontSize: '12px',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    padding: '4px 8px',
    borderRadius: '4px'
  };

  const locationStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center'
  };

  const linkStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#2563eb',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500'
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', backgroundColor: '#f9fafb' }}>
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Places in Tangier</h2>
          <p style={{ color: '#6b7280' }}>
            Showing {filteredPlaces.length} places
            {selectedCategory !== 'all' && ` in ${getCategoryName(selectedCategory || '')}`}
            {selectedNeighborhood !== 'all' && ` in ${neighborhoods.find(n => n.slug.current === selectedNeighborhood)?.title}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {filteredPlaces.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>No places found</h3>
            <p style={{ color: '#6b7280' }}>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {filteredPlaces.map((place) => (
              <div key={place._id} style={cardStyle}>
                {/* Place Image */}
                {place.featuredImage && (
                  <div style={{ height: '192px', backgroundColor: '#e5e7eb' }}>
                    <img 
                      src={place.featuredImage.asset ? 
                        `https://cdn.sanity.io/images/${place.featuredImage.asset._ref.split('-')[1]}/${place.featuredImage.asset._ref.split('-')[2]}-${place.featuredImage.asset._ref.split('-')[3]}.${place.featuredImage.asset._ref.split('-')[4]}` : 
                        place.featuredImage
                      }
                      alt={place.featuredImage.alt || place.title}
                      style={imageStyle}
                    />
                  </div>
                )}
                
                <div style={contentStyle}>
                  {/* Place Title and Category */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3 style={titleStyle}>{place.title}</h3>
                    <span 
                      style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: 'white', 
                        marginLeft: '8px', 
                        flexShrink: 0,
                        backgroundColor: getCategoryColor(place.category)
                      }}
                    >
                      {getCategoryName(place.category)}
                    </span>
                  </div>
                  
                  {/* Place Description */}
                  <p style={descriptionStyle}>{place.description}</p>
                  
                  {/* Rating and Price */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    {place.rating && (
                      <div style={ratingStyle}>
                        <div style={starsStyle}>
                          {'★'.repeat(Math.floor(place.rating))}
                          {'☆'.repeat(5 - Math.floor(place.rating))}
                        </div>
                        <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '4px' }}>{place.rating}/5</span>
                      </div>
                    )}
                    {place.priceLevel && (
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#059669' }}>{place.priceLevel}</span>
                    )}
                  </div>
                  
                  {/* Tags */}
                  {place.tags && place.tags.length > 0 && (
                    <div style={tagsStyle}>
                      {place.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} style={tagStyle}>
                          #{tag}
                        </span>
                      ))}
                      {place.tags.length > 3 && (
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          +{place.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Location */}
                  {place.location?.address && (
                    <div style={locationStyle}>
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '4px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {place.location.address}
                    </div>
                  )}
                  
                  {/* Action Button */}
                  <a href={`/places/${place.slug.current}`} style={linkStyle}>
                    View Details
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginLeft: '4px' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapListView;