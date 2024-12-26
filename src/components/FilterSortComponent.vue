<template>
    <div class="flex justify-between items-center mt-4">
      <div class="flex items-center space-x-4">
        <label for="sort" class="text-sm font-semibold">Sort By:</label>
        <select v-model="selectedSort" @change="applyFilters" class="p-2 border border-gray-300 rounded-lg">
          <option value="vote_average.desc">Rating</option>
          <option value="release_date.desc">Release Date</option>
        </select>
      </div>
  
      <div class="flex items-center space-x-4">
        <label for="filter" class="text-sm font-semibold">Filter By Genre:</label>
        <select v-model="selectedFilter" @change="applyFilters" class="p-2 border border-gray-300 rounded-lg">
          <option value="">Select Genre</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedSort: 'vote_average.desc',
        selectedFilter: '',
        genres: []
      };
    },
    mounted() {
      this.fetchGenres();
    },
    methods: {
      async fetchGenres() {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=348088421ad3fb3a9d6e56bb6a9a8f80`);
          const data = await response.json();
          this.genres = data.genres;
        } catch (error) {
          console.error('Error fetching genres:', error);
        }
      },
      applyFilters() {
        this.$emit('apply-filters', { sort: this.selectedSort, filter: this.selectedFilter });
      }
    }
  }
  </script>
  
  <style scoped>
  select {
    background-color: white;
    border-radius: 0.375rem;
    border-width: 1px;
    padding: 0.5rem;
    font-size: 1rem;
    transition: all 0.2s ease;
  }
  
  select:focus {
    outline: none;
    border-color: #3182ce;
  }
  </style>
  