import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
  }),
  actions: {
    toggleFavorite(movie) {
      const index = this.favorites.findIndex(fav => fav.id === movie.id);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(movie);
      }

      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    isFavorite(movieId) {
      return this.favorites.some(fav => fav.id === movieId);
    }
  }
});
