<template>
  <section class="mt-8 bg-no-repeat py-5 px-12">
    <h2 class="text-2xl font-semibold text-black mb-4 relative">
      {{ sectionTitle }}
      <div class="absolute inset-0 bg-cover bg-center"></div>
    </h2>
    <div class="flex overflow-x-auto space-x-4 py-4">
      <div v-for="item in items" :key="item.id" class="flex-none w-[150px] min-w-[150px]">
        <router-link :to="`/movies/${item.id}`" class="relative block">
          <img 
            :src="imageMainUrl + item.poster_path" 
            v-if="item.poster_path"  
            class="w-[150px] h-[225px] rounded-lg shadow-md object-cover"
            :style="getImageStyle(item)"
            @load="onImageLoad"
            alt="movie poster"
          />
          <button @click.stop="toggleFavorite(item)" class="absolute top-2 right-2" aria-label="Toggle favorite for {{ item.title }}">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" :class="{ 'text-yellow-500': isFavorite(item) }" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.121-6.49L.243 6.91l6.591-.961L10 0l2.166 5.949 6.591.961-4.999 4.7 1.121 6.49z"/>
            </svg>
          </button>
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[38px] h-[38px] bg-black rounded-full text-white flex items-center justify-center text-sm">
            {{ formatRating(item.vote_average) }}%
          </div>
        </router-link>
        <div class="mt-7 text-center">
          <h3 class="text-lg font-bold text-black">{{ item.title }}</h3>
          <p class="text-sm text-gray-600">{{ item.release_date }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useFavoritesStore } from '@/stores/favoritesStore';

export default {
  name: 'PopularMoviesSection',
  props: {
    items: Array
  },
  data() {
    return {
      sectionTitle: 'What\'s Popular',
      imageMainUrl: 'https://image.tmdb.org/t/p/w500',
      imageLoaded: false,
    };
  },
  methods: {
    formatRating(rating) {
      return Math.round(rating * 10);
    },
    toggleFavorite(movie) {
      const favoritesStore = useFavoritesStore();
      favoritesStore.toggleFavorite(movie);
    },
    isFavorite(movie) {
      const favoritesStore = useFavoritesStore();
      return favoritesStore.favorites.some(favorite => favorite.id === movie.id);
    },
    getImageStyle() {
      return this.imageLoaded ? { position: 'relative' } : { position: 'absolute', left: '-10000px' }; 
    },
    onImageLoad() {
      this.imageLoaded = true;
    }
  }
}
</script>