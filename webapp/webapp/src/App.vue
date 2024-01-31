<template>
  <div id="app" class="container mt-4">
    <h1 class="mb-4">Movie Search App</h1>
    <MovieSearch />
  </div>
</template>

<script>
import MovieSearch from '@/components/MovieSearch.vue';

export default {
  name: 'App',
  components: {
    MovieSearch,
  },
};
</script>

<style>
#app {
  text-align: center;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}
</style>