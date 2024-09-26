'use strict';

import { getMovies } from './js/getMovies.js';
import {
  testFetchMovieTrailer,
  testFetchMovies,
} from './js/testing-get-movies.js';
import { nightMode } from './js/nightMode.js';
import {
  addToStorage,
  getFromStorage,
  removeFromStorage,
} from './js/getLocalStorage.js';
import {
  addToQueue,
  addToWatched,
  updateFilmInStorage,
} from './js/queueWatchedManager.js';
import { createFilmCard } from './js/filmCards.js';

import {
  modal,
  btn,
  closeBtn,
  openModal,
  closeModal,
  handleEscapeKeyPress,
} from './js/footerModal.js';
import { scrollFunction, backToTop } from './js/scrollTopButton.js';
import { setupMyLibraryLink } from './js/library.js';
import { openFilmModal } from './js/openFilmModal.js';
import { footerPagination } from './js/footerPagination.js';
import { currentSearchQuery } from './js/searchForm.js';
import { footerGetFullYear } from './js/footerGetFullYear.js';

window.addEventListener('load', async () => {
  try {
    footerGetFullYear();
    setupMyLibraryLink();
    scrollFunction();
    backToTop();
    const popularMovies = await getMovies();
    createFilmCard(popularMovies);
    footerPagination(popularMovies);
  } catch (error) {
    console.log('Eroare la încărcarea filmelor populare:', error);
  }
});

import { searchForm } from './js/searchForm.js';
