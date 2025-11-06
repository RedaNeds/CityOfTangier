import React, { useState, useEffect } from 'react';
import CityMap from './CityMap';
import MapListView from './MapListView';
import ErrorBoundary from '../ErrorBoundary';
import type { SanityPlace, SanityNeighborhood } from '../../lib/sanity';

interface MapWrapperProps {
  places: SanityPlace[];
  neighborhoods: SanityNeighborhood[];
  categories: string[];
}

const MapWrapper: React.FC<MapWrapperProps> = ({
  places,
  neighborhoods,
  categories
}) => {
  const [isClient, setIsClient] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [filters, setFilters] = useState({
    category: 'all',
    neighborhood: 'all',
    searchQuery: ''
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div style={{ 
        height: 'calc(100vh - 4rem)', 
        width: '100%', 
        backgroundColor: '#f3f4f6', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
            Loading Interactive Map...
          </h3>
          <p style={{ color: '#6b7280' }}>Please wait while we load the map for you</p>
          <div style={{ marginTop: '16px' }}>
            <div style={{ 
              display: 'inline-block', 
              width: '32px', 
              height: '32px', 
              border: '3px solid #e5e7eb', 
              borderTop: '3px solid #3b82f6', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }}></div>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
      {/* View Toggle */}
      <div style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb', 
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>Interactive Map of Tangier</h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            {places.length} places • {neighborhoods.length} neighborhoods
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search places..." 
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              style={{
                width: '256px',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* View Toggle */}
          <div style={{ display: 'flex', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '4px' }}>
            <button
              onClick={() => setViewMode('map')}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                fontWeight: '500',
                color: viewMode === 'map' ? 'white' : '#6b7280',
                backgroundColor: viewMode === 'map' ? '#3b82f6' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Map
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '8px 12px',
                fontSize: '14px',
                fontWeight: '500',
                color: viewMode === 'list' ? 'white' : '#6b7280',
                backgroundColor: viewMode === 'list' ? '#3b82f6' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {viewMode === 'map' ? (
          <div style={{ flex: 1, position: 'relative' }}>
            <CityMap 
              places={places}
              neighborhoods={neighborhoods}
              center={[35.7840, -5.8080]}
              zoom={13}
              selectedCategory={filters.category}
              selectedNeighborhood={filters.neighborhood}
              searchQuery={filters.searchQuery}
            />
          </div>
        ) : (
          <div style={{ flex: 1 }}>
            <MapListView 
              places={places}
              neighborhoods={neighborhoods}
              selectedCategory={filters.category}
              selectedNeighborhood={filters.neighborhood}
              searchQuery={filters.searchQuery}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapWrapper;
