<template>
  <div class="p-6">
    <div class="mb-6">
      <SearchComponent @search="fetchMovies" />
    </div>
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
          <select 
            v-model="selectedGenre" 
            id="genre" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">All Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
          </select>
        </div>

        <div>
          <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
          <select 
            v-model="selectedRating" 
            id="rating" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">All Ratings</option>
            <option value="7">Above 7</option>
            <option value="8">Above 8</option>
          </select>
        </div>

        <div>
          <label for="sort" class="block text-sm font-medium text-gray-700">Sort By</label>
          <select 
            v-model="selectedSort" 
            id="sort" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="popularity.desc">Popularity</option>
            <option value="release_date.desc">Newest</option>
            <option value="vote_average.desc">Top Rated</option>
          </select>
        </div>
      </div>

      <div class="mt-4 text-right">
        <button 
          @click="fetchMovies" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none">
          Apply Filters
        </button>
      </div>
    </div>

    <PopularMoviesSection :items="movies" />
  </div>
</template>

<script>
import PopularMoviesSection from '@/components/PopularMoviesSection.vue';
import SearchComponent from '@/components/SearchComponent.vue';

export default {
  name: 'MoviesView',
  components: {
    PopularMoviesSection,
    SearchComponent,
  },
  data() {
    return {
      movies: [],
      selectedSort: 'popularity.desc',
      selectedGenre: '',
      selectedRating: '',
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      const { selectedSort, selectedGenre, selectedRating } = this;

      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=348088421ad3fb3a9d6e56bb6a9a8f80&language=en-US&sort_by=${selectedSort}`;

        if (selectedGenre) {
          url += `&with_genres=${selectedGenre}`;
        }

        if (selectedRating) {
          url += `&vote_average.gte=${selectedRating}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
          this.movies = data.results;
        } else {
          console.error('No results found.');
          this.movies = [];
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
  },
};
</script>