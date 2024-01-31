const express = require('express');
const cors = require('cors');  
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/movies', async (req, res) => {
  try {
    const { search } = req.query;

    // Ensure that a search query is provided
    if (!search) {
      return res.status(400).json({ error: 'Missing search query' });
    }

    console.log('Search Query:', search);
    console.log('TMDB API Key:', process.env.TMDB_API_KEY);

    // Call TMDB API to search for movies
    const tmdbResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: search,
        include_adult: false,
        language: 'en-US',
        region: 'US',
      },
    });

    console.log('API Request URL:', tmdbResponse.config.url);

    // Check if the necessary fields are present in the TMDB API response
    if (!tmdbResponse.data.results || !Array.isArray(tmdbResponse.data.results)) {
      return res.status(500).json({ error: 'Invalid TMDB API response' });
    }

    // Extract relevant information from TMDB API response
    const movies = tmdbResponse.data.results.slice(0, 10).map((movie) => {
      // Check for the presence of essential fields in each movie object
      const movie_id = movie.id || null;
      const title = movie.title || '';
      const poster_image_url = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;
      const popularity_summary = `${movie.popularity || 0} out of ${movie.vote_count || 0}`;

      return {
        movie_id,
        title,
        poster_image_url,
        popularity_summary,
      };
    });

    // Send the JSON response with movie information
    res.json(movies);
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Webservice is running on http://localhost:${port}`);
});