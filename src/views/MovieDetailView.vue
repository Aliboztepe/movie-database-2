<template>
    <div class="p-4">
      <div class="flex">
        <img :src="imageUrl + movie.poster_path" class="w-1/3 rounded-lg shadow-md" />
        <div class="ml-4">
          <h2 class="text-3xl font-bold">{{ movie.title }}</h2>
          <p class="text-lg text-gray-700">User Score: {{ movie.vote_average * 10 }}%</p>
          <p class="mt-2">{{ movie.overview }}</p>
        </div>
      </div>
      <h3 class="text-2xl font-semibold mt-4">Cast</h3>
      <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-2">
        <li v-for="actor in cast" :key="actor.id" class="text-center">
          <div class="flex flex-col items-center">
            <img :src="imageUrl + actor.profile_path" class="w-24 h-36 rounded mb-2" />
            <p class="mt-1 text-sm font-semibold">{{ actor.name }}</p>
          </div>
        </li>
      </ul>
    </div>
</template>
  
<script>
  export default {
    name: 'MovieDetailView',
    data() {
      return {
        movie: {},
        cast: [],
        imageUrl: 'https://image.tmdb.org/t/p/w500',
      };
    },
    async mounted() {
      const movieId = this.$route.params.id;
      await this.fetchMovieDetails(movieId);
      await this.fetchMovieCast(movieId);
    },
    methods: {
      async fetchMovieDetails(id) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=348088421ad3fb3a9d6e56bb6a9a8f80`);
        this.movie = await response.json();
      },
      async fetchMovieCast(id) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=348088421ad3fb3a9d6e56bb6a9a8f80`);
        const data = await response.json();
        this.cast = data.cast.slice(0, 5);
      },
    },
  };
</script>
  
<style scoped>
</style>
  