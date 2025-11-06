// Favorites management system
export interface FavoriteItem {
  id: string;
  type: 'place' | 'event' | 'itinerary';
  title: string;
  slug: string;
  image?: string;
  addedAt: string;
}

export class FavoritesManager {
  private static STORAGE_KEY = 'tangier_favorites';

  static getFavorites(): FavoriteItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  static addFavorite(item: Omit<FavoriteItem, 'addedAt'>): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const favorites = this.getFavorites();
      
      // Check if already exists
      if (favorites.some(fav => fav.id === item.id)) {
        return false;
      }

      const newFavorite: FavoriteItem = {
        ...item,
        addedAt: new Date().toISOString()
      };

      favorites.push(newFavorite);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('favoritesChanged', { 
        detail: { action: 'add', item: newFavorite } 
      }));
      
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  }

  static removeFavorite(id: string): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter(fav => fav.id !== id);
      
      if (filtered.length === favorites.length) {
        return false; // Item not found
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('favoritesChanged', { 
        detail: { action: 'remove', id } 
      }));
      
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  }

  static isFavorite(id: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === id);
  }

  static clearFavorites(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('favoritesChanged', { 
        detail: { action: 'clear' } 
      }));
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  }

  static getFavoritesByType(type: FavoriteItem['type']): FavoriteItem[] {
    return this.getFavorites().filter(fav => fav.type === type);
  }
}

