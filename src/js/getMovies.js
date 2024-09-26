'use strict';

// fetch trailers and movie functions //
import axios from 'axios';
import Notiflix from 'notiflix';

export const API_KEY = '493c6d740f024fcc02750f44c1518471';
export const BASE_URL = `https://api.themoviedb.org/3`;

export async function getTrailer(movieId) {
  const trailerUrl = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  try {
    const response = await axios.get(trailerUrl);
    const trailers = response.data.results;

    const youtubeTrailer = trailers.find(
      trailer => trailer.site === 'YouTube' && trailer.type === 'Trailer'
    );

    return youtubeTrailer
      ? `https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=1`
      : null;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      console.error('A apărut o eroare la obținerea trailerului.');
      return null;
    }
  }
}

export async function getMovies(searchQuery = '', page = 1) {
  let url = '';
  if (searchQuery) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      searchQuery
    )}&page=${page}`;
  } else {
    url = `${BASE_URL}/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`;
  }

  try {
    const response = await axios.get(url);
    const moviesWithTrailers = await Promise.all(
      response.data.results.map(async movie => {
        console.log('Fetching trailers for movie ID:', movie.id);
        const trailerUrl = await getTrailer(movie.id);
        return { ...movie, trailerUrl };
      })
    );

    return { ...response.data, results: moviesWithTrailers };
  } catch (error) {
    console.error(
      'Error fetching movies:',
      error.response ? error.response.data : error
    );
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    throw error;
  }
}
