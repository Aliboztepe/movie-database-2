<template>
  <section class="relative flex flex-col items-center justify-center min-h-[calc(100vh/2.5)] max-h-[360px] bg-[#78d3e9] p-12">
    <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center"></div>
    <div class="relative z-10 w-full">
      <h2 class="text-3xl font-bold leading-tight text-white">{{ title }}</h2>
      <h3 class="text-2xl font-semibold text-white">{{ subtitle }}</h3>
      <div class="mt-12 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for a movie, TV show, person..."
          class="w-full h-[46px] line-height-[46px] text-lg text-gray-500 border border-gray-300 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Search input"
        />
        <button
          @click="search"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#1ED5A9] to-[#01b4ef] text-white rounded-full px-2 py-2 ml-4 w-[100px] h-[46px]"
          aria-label="Search for movies or TV shows"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchSection',
  data() {
    return {
      searchQuery: '',
      title: 'Welcome.',
      subtitle: 'Millions of movies, TV shows and people to discover. Explore now.',
      buttonText: 'Search',
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>

<style scoped>
</style>
