<template>
    <div class="relative">
      <button @click="togglePopover" class="text-white p-2 hover:bg-gray-700 rounded">
        Categories
      </button>
      <div v-if="showPopover" class="absolute mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
        <ul class="space-y-1 p-2">
          <li @click="navigateTo('movies/popular')" class="cursor-pointer hover:bg-gray-200 p-2 rounded">
            Popular Movies
          </li>
          <li @click="navigateTo('movies/upcoming')" class="cursor-pointer hover:bg-gray-200 p-2 rounded">
            Upcoming Movies
          </li>
          <li @click="navigateTo('movies/top-rated')" class="cursor-pointer hover:bg-gray-200 p-2 rounded">
            Top Rated Movies
          </li>
          <li @click="navigateTo('tv/popular')" class="cursor-pointer hover:bg-gray-200 p-2 rounded">
            Popular TV Shows
          </li>
          <li @click="navigateTo('tv/upcoming')" class="cursor-pointer hover:bg-gray-200 p-2 rounded">
            Upcoming TV Shows
          </li>
          <li @click="navigateTo('tv/top-rated')" class="cursor-pointer hover:bg-gray-200 p-2 rounded">
            Top Rated TV Shows
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showPopover: false
      };
    },
    methods: {
      togglePopover() {
        this.showPopover = !this.showPopover;
      },
      navigateTo(route) {
        this.$router.push({ name: route });
        this.showPopover = false;
      }
    }
  }
  </script>
  
  <style scoped>
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  </style>
  