<template>
  <div class="movie-search-container">
    <div class="background"></div>
    <div class="content">
      <div class="search-bar">
        <input v-model="searchQuery" placeholder="Search for movies" />
        <button @click="searchMovies">Search</button>
      </div>
      <div v-if="movies.length > 0" class="movie-grid">
        <div v-for="movie in movies" :key="movie.movie_id" class="movie-card">
          <img :src="movie.poster_image_url" alt="Movie Poster" class="movie-poster" />
          <div class="movie-details">
            <h2>{{ movie.title }}</h2>
            <p>{{ movie.popularity_summary }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      movies: [],
    };
  },
  methods: {
    async searchMovies() {
      try {
        const response = await this.$axios.get(`/movies?search=${this.searchQuery}`);
        this.movies = response.data;
      } catch (error) {
        console.error('Error searching for movies:', error);
        // Handle error
      }
    },
  },
};
</script>

<style scoped>
.movie-search-container {
  position: relative;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, #3498db, #2ecc71);
  opacity: 0.8;
  z-index: -1;
}

.content {
  z-index: 1;
  position: relative;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 300px;
  padding: 10px;
  font-size: 16px;
}

.search-bar button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.movie-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.movie-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
}

.movie-poster {
  width: 100%;
  height: auto;
}

.movie-details {
  padding: 10px;
}
</style>