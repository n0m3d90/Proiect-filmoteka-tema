"use strict";

import { getTrailer, getMovies } from './getMovies.js';
import Notiflix from 'notiflix';

// Test pentru getTrailer
export async function testFetchMovieTrailer() {
  const movieId = 550; // ID-ul filmului "Fight Club"
  const trailerUrl = await getTrailer(movieId);
  console.log('Trailer URL:', trailerUrl);
}

// Test pentru getMovies
export async function testFetchMovies() {
  const searchQuery = 'Inception';
  const page = 1;
  const movies = await getMovies(searchQuery, page);
  console.log('Movies:', movies);
}

// Apelează funcțiile de test
testFetchMovieTrailer();
testFetchMovies();