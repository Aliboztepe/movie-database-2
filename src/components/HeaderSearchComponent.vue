<template>
  <div v-if="isVisible" class="absolute top-16 left-0 w-full bg-white shadow-lg p-4 z-20">
    <input
      v-model="localQuery"
      @input="debouncedSearch"
      type="text"
      placeholder="Search for a movie, tv show, person..."
      class="w-full h-[46px] border border-gray-300 rounded-full px-4"
      aria-label="Search"
    />
    <ul class="mt-2 border-t border-gray-300">
      <li v-for="movie in movies" :key="movie.id" class="border-b py-2">{{ movie.title }}</li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'HeaderSearchComponent',
  props: {
    isVisible: Boolean,
    query: String,
    movies: Array,
  },
  data() {
    return {
      localQuery: this.query,
    };
  },
  watch: {
    query(newValue) {
      this.localQuery = newValue;
    },
  },
  methods: {
    debouncedSearch: _.debounce(function () {
      this.$emit('update:query', this.localQuery);
      if (this.localQuery.length >= 3) {
        this.$emit('fetch-suggestions');
      }
    }, 500),
  },
}
</script>

<style scoped>
</style>
