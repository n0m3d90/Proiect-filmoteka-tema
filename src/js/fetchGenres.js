import axios from 'axios';
import { API_KEY, BASE_URL } from './getMovies.js';

export let genres = [];

export async function fetchGenres() {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  try {
    const response = await axios.get(url);
    genres = response.data.genres;
  } catch (error) {
    console.error('Eroare la încărcarea genurilor: ', error);
  }
}

window.addEventListener('load', async () => {
  await fetchGenres();
});