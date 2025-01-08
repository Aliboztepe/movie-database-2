<template>
  <div class="p-4 relative">
    <div 
      class="absolute inset-0 bg-cover bg-center opacity-10" 
      :style="{ backgroundImage: `url(${imageUrl + movie.poster_path})` }">
    </div>
    <div class="relative z-10">
      <div class="flex flex-wrap md:flex-nowrap items-center min-h-[500px]">
        <img :src="imageUrl + movie.poster_path" class="w-full md:w-1/3 rounded-lg shadow-md" />
        <div class="ml-0 md:ml-12 mt-4 md:mt-0">
          <h2 class="text-4xl font-bold">{{ movie.title }}</h2>
          <p class="text-lg text-gray-700 mt-2">{{ movie.release_date }}</p>
          <div class="flex items-center mt-4">
            <div class="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-900">
              <div
                class="absolute inset-0 rounded-full"
                :style="{ background: `conic-gradient(#22c55e ${movie.vote_average * 10 * 3.6}deg, #374151 0deg)` }"
              ></div>
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 z-10">
                <span class="text-white font-bold">{{ Math.round(movie.vote_average * 10) }}%</span>
              </div>
            </div>
            <span class="ml-4 text-lg font-semibold">User Score</span>
          </div>
          <p class="mt-4">{{ movie.overview }}</p>
        </div>
      </div>
    </div>

    <h3 class="text-2xl font-semibold mt-8">Top Billed Cast</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
      <div v-for="actor in cast" :key="actor.id" class="text-center">
        <img :src="imageUrl + actor.profile_path" class="w-full h-48 object-cover rounded-lg shadow-md" />
        <p class="mt-2 font-semibold">{{ actor.name }}</p>
      </div>
    </div>
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