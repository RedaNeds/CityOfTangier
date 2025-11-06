import React, { useState, useEffect } from 'react';
import type { SanityPlace, SanityNeighborhood } from '../../lib/sanity';

interface MapFiltersPanelProps {
  places: SanityPlace[];
  neighborhoods: SanityNeighborhood[];
  categories: string[];
  onFilterChange?: (filters: {
    category: string;
    neighborhood: string;
    searchQuery: string;
  }) => void;
}

const MapFiltersPanel: React.FC<MapFiltersPanelProps> = ({
  places,
  neighborhoods,
  categories,
  onFilterChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Notify parent component of filter changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        category: selectedCategory,
        neighborhood: selectedNeighborhood,
        searchQuery: searchQuery
      });
    }
  }, [selectedCategory, selectedNeighborhood, searchQuery, onFilterChange]);

  // Get category display names and colors
  const getCategoryInfo = (category: string) => {
    const categoryMap: Record<string, { name: string; icon: string; color: string }> = {
      'see-do': { name: 'See & Do', icon: '🎯', color: '#3b82f6' },
      'eat-drink': { name: 'Eat & Drink', icon: '🍽️', color: '#ef4444' },
      'accommodation': { name: 'Accommodation', icon: '🏨', color: '#10b981' },
      'shopping': { name: 'Shopping', icon: '🛍️', color: '#8b5cf6' },
      'services': { name: 'Services', icon: '🔧', color: '#6b7280' },
      'neighborhoods': { name: 'Neighborhoods', icon: '🏘️', color: '#f59e0b' }
    };
    return categoryMap[category] || { name: category, icon: '📍', color: '#3b82f6' };
  };

  // Count places by category
  const getCategoryCount = (category: string) => {
    if (category === 'all') return places.length;
    return places.filter(place => place.category === category).length;
  };

  // Count places by neighborhood
  const getNeighborhoodCount = (neighborhoodSlug: string) => {
    if (neighborhoodSlug === 'all') return places.length;
    // This would need to be implemented based on how places are linked to neighborhoods
    // For now, we'll return a placeholder count
    return Math.floor(Math.random() * 10) + 1;
  };

  // Get featured places count
  const featuredCount = places.filter(place => place.featured).length;

  const containerStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const mobileHeaderStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px',
    display: 'none'
  };

  const filtersContentStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    display: showMobileFilters ? 'block' : 'block'
  };

  const sectionStyle: React.CSSProperties = {
    borderBottom: '1px solid #e5e7eb',
    padding: '16px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '12px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px'
  };

  const optionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    cursor: 'pointer',
    transition: 'color 0.2s ease'
  };

  const countStyle: React.CSSProperties = {
    marginLeft: 'auto',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    padding: '2px 6px',
    borderRadius: '6px',
    fontSize: '12px'
  };

  const activeCountStyle: React.CSSProperties = {
    ...countStyle,
    backgroundColor: '#3b82f6',
    color: 'white'
  };

  return (
    <div style={containerStyle}>
      {/* Mobile Header */}
      <div style={mobileHeaderStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Filters</h2>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            style={{ padding: '8px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filters Content */}
      <div style={filtersContentStyle}>
        {/* Search */}
        <div style={sectionStyle}>
          <h3 style={titleStyle}>Search Places</h3>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={inputStyle}
            />
            <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div style={sectionStyle}>
          <h3 style={titleStyle}>Quick Filters</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div 
              style={optionStyle}
              onClick={() => setSelectedCategory('all')}
            >
              <input 
                type="radio" 
                name="category" 
                checked={selectedCategory === 'all'}
                onChange={() => setSelectedCategory('all')}
                style={{ marginRight: '8px' }}
              />
              <span>All Places</span>
              <span style={selectedCategory === 'all' ? activeCountStyle : countStyle}>
                {getCategoryCount('all')}
              </span>
            </div>
            <div 
              style={optionStyle}
              onClick={() => setSelectedCategory('featured')}
            >
              <input 
                type="radio" 
                name="category" 
                checked={selectedCategory === 'featured'}
                onChange={() => setSelectedCategory('featured')}
                style={{ marginRight: '8px' }}
              />
              <span>Featured Only</span>
              <span style={selectedCategory === 'featured' ? activeCountStyle : countStyle}>
                {featuredCount}
              </span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={sectionStyle}>
          <h3 style={titleStyle}>Categories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map((category) => {
              const categoryInfo = getCategoryInfo(category);
              const count = getCategoryCount(category);
              
              return (
                <div 
                  key={category}
                  style={optionStyle}
                  onClick={() => setSelectedCategory(category)}
                >
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    style={{ marginRight: '8px' }}
                  />
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>{categoryInfo.icon}</span>
                    {categoryInfo.name}
                  </span>
                  <span style={selectedCategory === category ? activeCountStyle : countStyle}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Neighborhoods */}
        <div style={sectionStyle}>
          <h3 style={titleStyle}>Neighborhoods</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div 
              style={optionStyle}
              onClick={() => setSelectedNeighborhood('all')}
            >
              <input 
                type="radio" 
                name="neighborhood" 
                checked={selectedNeighborhood === 'all'}
                onChange={() => setSelectedNeighborhood('all')}
                style={{ marginRight: '8px' }}
              />
              <span>All Neighborhoods</span>
              <span style={selectedNeighborhood === 'all' ? activeCountStyle : countStyle}>
                {neighborhoods.length}
              </span>
            </div>
            {neighborhoods.map((neighborhood) => {
              const count = getNeighborhoodCount(neighborhood.slug.current);
              
              return (
                <div 
                  key={neighborhood._id}
                  style={optionStyle}
                  onClick={() => setSelectedNeighborhood(neighborhood.slug.current)}
                >
                  <input 
                    type="radio" 
                    name="neighborhood" 
                    checked={selectedNeighborhood === neighborhood.slug.current}
                    onChange={() => setSelectedNeighborhood(neighborhood.slug.current)}
                    style={{ marginRight: '8px' }}
                  />
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>🏘️</span>
                    {neighborhood.title}
                    {neighborhood.featured && (
                      <span style={{ 
                        marginLeft: '8px', 
                        fontSize: '12px', 
                        backgroundColor: '#fef3c7', 
                        color: '#92400e', 
                        padding: '2px 4px', 
                        borderRadius: '4px' 
                      }}>
                        Featured
                      </span>
                    )}
                  </span>
                  <span style={selectedNeighborhood === neighborhood.slug.current ? activeCountStyle : countStyle}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clear Filters */}
        <div style={sectionStyle}>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedNeighborhood('all');
              setSearchQuery('');
            }}
            style={{
              width: '100%',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Clear All Filters
          </button>
        </div>

        {/* Results Summary */}
        <div style={{ ...sectionStyle, backgroundColor: '#f9fafb' }}>
          <h3 style={titleStyle}>Results</h3>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            <p>Showing {getCategoryCount(selectedCategory)} places</p>
            {selectedNeighborhood !== 'all' && (
              <p>in {neighborhoods.find(n => n.slug.current === selectedNeighborhood)?.title}</p>
            )}
            {searchQuery && (
              <p>matching "{searchQuery}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapFiltersPanel;