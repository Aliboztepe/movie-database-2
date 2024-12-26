<template>
  <header class="bg-blue-900 h-16 flex items-center px-12 relative">
    <img class="h-6 mr-4" :src="logoUrl" alt="Logo" />
    <nav class="flex-grow">
      <router-link to="/movies" class="text-white hover:underline mx-4">Movies</router-link>
      <router-link to="/tv-shows" class="text-white hover:underline">TV Shows</router-link>
    </nav>
    <button @click="toggleSearch" class="focus:outline-none ml-4 w-8" aria-label="Toggle search">
      <img v-if="!isSearchVisible" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg" alt="Search Icon" />
      <img v-else src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-599-menu-close-7400e9a2ea92ad8d7cccf18d1ea34cd690790638a6e7768922eaef6e07109723.svg" alt="Close Icon" />
    </button>
    <HeaderSearchComponent
      v-if="isSearchVisible"
      :isVisible="isSearchVisible"
      :query="searchQuery"
      :movies="suggestedMovies"
      @update:query="searchQuery = $event"
      @fetch-suggestions="fetchSuggestedMovies"
    />
  </header>
</template>

<script>
import HeaderSearchComponent from './HeaderSearchComponent.vue';

export default {
  name: 'HeaderComponent',
  components: { HeaderSearchComponent },
  data() {
    return {
      logoUrl: 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg',
      isSearchVisible: false,
      searchQuery: '',
      suggestedMovies: []
    }
  },
  methods: {
    toggleSearch() {
      this.isSearchVisible = !this.isSearchVisible;
      if (!this.isSearchVisible) {
        this.resetSearch();
      } else {
        this.fetchSuggestedMovies();
      }
    },
    resetSearch() {
      this.searchQuery = '';
      this.suggestedMovies = [];
    },
    async fetchSuggestedMovies() {
      const apiKey = '348088421ad3fb3a9d6e56bb6a9a8f80';
      if (this.searchQuery.length < 3) return;

      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(this.searchQuery)}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.suggestedMovies = data.results.slice(0, 10) || [];
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>

<style scoped>
</style>
