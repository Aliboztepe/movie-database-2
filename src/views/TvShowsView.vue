<template>
  <div>
    <SearchComponent @search="fetchShows" />
    <FilterSortComponent @apply-filters="applyFilters" />
    <PopularMoviesSection :items="shows" />
  </div>
</template>

<script>
import SearchComponent from '@/components/SearchComponent.vue';
import PopularMoviesSection from '@/components/PopularMoviesSection.vue';
import FilterSortComponent from '@/components/FilterSortComponent.vue';

export default {
  name: 'TvShowsView',
  components: {
    SearchComponent,
    PopularMoviesSection,
    FilterSortComponent
  },
  data() {
    return {
      shows: [],
      sortBy: 'vote_average.desc',
      genreId: '',
      currentPage: 1,
    };
  },
  mounted() {
    this.fetchShows();
  },
  methods: {
    async applyFilters({ sort, filter }) {
      this.sortBy = sort;
      this.genreId = filter;

      this.fetchShows();
    },

    async fetchShows() {
      let url = `https://api.themoviedb.org/3/tv/popular?api_key=348088421ad3fb3a9d6e56bb6a9a8f80&page=${this.currentPage}`;

      url += `&sort_by=${this.sortBy}`;

      if (this.genreId) {
        url += `&with_genres=${this.genreId}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        this.shows = data.results;
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    }
  }
}
</script>
