<template>
  <div>
    <SearchComponent @search="fetchMovies" />
    <div class="flex justify-between mt-4">
      <select v-model="selectedSort" @change="fetchMovies" class="p-2 border rounded-md">
        <option value="popularity.desc">Popular</option>
        <option value="release_date.desc">Newest</option>
        <option value="vote_average.desc">Top Rated</option>
      </select>

      <select v-model="selectedGenre" @change="fetchMovies" class="p-2 border rounded-md">
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
      </select>

      <select v-model="selectedRating" @change="fetchMovies" class="p-2 border rounded-md">
        <option value="">All Ratings</option>
        <option value="7">Above 7</option>
        <option value="8">Above 8</option>
      </select>
    </div>

    <PopularMoviesSection :items="movies" />
  </div>
</template>

<script>
import SearchComponent from '@/components/SearchComponent.vue';
import PopularMoviesSection from '@/components/PopularMoviesSection.vue';

export default {
  name: 'MoviesView',
  components: {
    SearchComponent,
    PopularMoviesSection,
  },
  data() {
    return {
      movies: [],
      selectedSort: 'popularity.desc',
      selectedGenre: '',
      selectedRating: ''
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
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  }
}
</script>
