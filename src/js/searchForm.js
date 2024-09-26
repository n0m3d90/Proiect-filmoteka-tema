import { getMovies } from './getMovies.js';
import { options } from './optionsPagination.js';
import { footerPagination } from './footerPagination.js';
import { createFilmCard } from './filmCards.js';

import Notiflix from 'notiflix';

let searchQuery = '';

export let currentSearchQuery = '';
export const searchForm = document.querySelector('.search-form');

const searchIcon = document.querySelector('.submit-btn');
searchIcon.addEventListener('click', () => {
  searchForm.dispatchEvent(new Event('submit'));
});
searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const userSearchQuery = e.currentTarget.elements.searchQuery.value.trim();
  console.log('Search query:', userSearchQuery); // Debugging line

  if (!userSearchQuery) {
    Notiflix.Notify.failure('Please enter a search term.');
    return;
  }

  currentSearchQuery = userSearchQuery;

  try {
    const moviesData = await getMovies(currentSearchQuery);
    console.log('Movies data:', moviesData); // Debugging line

    if (!moviesData || !moviesData.results || moviesData.results.length === 0) {
      Notiflix.Notify.failure(
        `Sorry, we couldn't find any films matching "${currentSearchQuery}".`
      );
      return;
    } else {
      Notiflix.Notify.success(
        `We found ${moviesData.total_results} films matching "${currentSearchQuery}".`
      );
    }

    options.totalItems = moviesData.total_pages;
    footerPagination(options.totalItems);
    createFilmCard(moviesData);

    searchForm.elements.searchQuery.value = '';
  } catch (error) {
    console.error('Search result is not successful:', error);
    Notiflix.Notify.failure('An error occurred while fetching the movies.');
  }
});
