import { createRouter, createWebHistory } from 'vue-router';
import MoviesView from '../views/MoviesView.vue';
import TvShowsView from '../views/TvShowsView.vue';
import MovieDetailView from '../views/MovieDetailView.vue';

const routes = [
  { path: '/movies', component: MoviesView },
  { path: '/tv-shows', component: TvShowsView },
  { path: '/movies/:id', component: MovieDetailView },
  { path: '/', redirect: '/movies' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
