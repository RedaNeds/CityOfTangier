import React, { useState, useEffect } from 'react';
import { FavoritesManager, type FavoriteItem } from '../../lib/favorites';

interface FavoriteButtonProps {
  id: string;
  type: 'place' | 'event' | 'itinerary';
  title: string;
  slug: string;
  image?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  type,
  title,
  slug,
  image,
  className = '',
  size = 'md'
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(FavoritesManager.isFavorite(id));
  }, [id]);

  useEffect(() => {
    const handleFavoritesChange = (event: CustomEvent) => {
      const { action, item, id: changedId } = event.detail;
      
      if (action === 'add' && item?.id === id) {
        setIsFavorite(true);
      } else if (action === 'remove' && changedId === id) {
        setIsFavorite(false);
      } else if (action === 'clear') {
        setIsFavorite(false);
      }
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange as EventListener);
    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange as EventListener);
    };
  }, [id]);

  const handleToggle = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      if (isFavorite) {
        const success = FavoritesManager.removeFavorite(id);
        if (success) {
          setIsFavorite(false);
        }
      } else {
        const success = FavoritesManager.addFavorite({
          id,
          type,
          title,
          slug,
          image
        });
        if (success) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        ${sizeClasses[size]} 
        ${className}
        flex items-center justify-center
        rounded-full transition-all duration-200
        ${isFavorite 
          ? 'bg-coral text-white shadow-lg' 
          : 'bg-white text-slate-600 hover:bg-coral hover:text-white shadow-md hover:shadow-lg'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2
      `}
      aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isLoading ? (
        <div className={`${iconSize[size]} animate-spin`}>
          <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : (
        <svg 
          className={iconSize[size]} 
          fill={isFavorite ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={isFavorite ? 0 : 2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;

