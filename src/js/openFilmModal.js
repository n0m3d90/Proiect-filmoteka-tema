import { genres } from './fetchGenres';
import {
  addToStorage,
  getFromStorage,
  removeFromStorage,
} from './getLocalStorage';
import {
  addToQueue,
  addToWatched,
  updateFilmInStorage,
} from './queueWatchedManager';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const openFilmModal = (filmData, cardHtml) => {
  if (!filmData || typeof filmData !== 'object' || !filmData.genre_ids) {
    console.error(
      'Datele filmului nu sunt complete sau sunt într-un format incorect.'
    );
    return;
  }

  // nume genurilor
  const genreNames =
    Array.isArray(filmData.genre_ids) && filmData.genre_ids.length > 0
      ? filmData.genre_ids
          .map(id => genres.find(genre => genre.id === id)?.name || 'Unknown')
          .filter(name => name !== 'Unknown')
          .join(', ')
      : 'Unknown';

  let originalTitle = filmData.title || 'Unknown Title';

  if (filmData.media_type) {
    originalTitle =
      filmData.media_type === 'movie'
        ? filmData.original_title || filmData.title
        : filmData.original_name || filmData.name;
  }

  //  titlul film și ID-ul
  const filmTitle = filmData.title || filmData.name;
  const filmId = filmData.id;

  // verifică dacă filmul este deja în localStorage
  const isFilmInQueue = Boolean(getFromStorage(filmData.id));

  // faceHTML-ul pentru fereastra modală
  const modalHtml = `
    <div class="film-modal">
        <div class="film-modal-content">
         <span class="close-modal">&times;</span>
         <h2 class="film-modal-title">${filmTitle}</h2>
        ${
          filmData.trailerUrl
            ? `<div class="film-modal-trailer">
               <iframe src="${filmData.trailerUrl}" frameborder="0" allowfullscreen></iframe>
             </div>`
            : `<div class="film-modal-poster">
               <img src="https://image.tmdb.org/t/p/w500${filmData.poster_path}" alt="${filmTitle}">
             </div>`
        }
        <h3>Original title: ${originalTitle}</h3>
        <p class="film-modal-score"><span>Score: ${
          typeof filmData.vote_average === 'number'
            ? filmData.vote_average.toFixed(2)
            : 'N/A'
        }</span></p>
        <p class="modal-genre-paragraph"><b>Genre:</b> ${genreNames}</p>
        <h4 class="film-modal-about">ABOUT</h4>
        <p>${filmData.overview}</p>
        <div class="film-modal-actions">
          <button id="addToWatchedBtn">ADD TO WATCHED</button>
          <button id="addToQueueBtn">${
            isFilmInQueue ? 'REMOVE FROM QUEUE' : 'ADD TO QUEUE'
          }</button>
        </div>
      </div>
    </div>`;

  // il trimite in DOM
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.querySelector('.film-modal');

  const addToQueueBtn = document.querySelector('#addToQueueBtn');
  const addToWatchedBtn = document.querySelector('#addToWatchedBtn');

  const setButtonStates = () => {
    const filmObject = getFromStorage(filmData.id);
    if (filmObject) {
      addToQueueBtn.textContent = filmObject.isInQueue
        ? 'REMOVE FROM QUEUE'
        : 'ADD TO QUEUE';
      addToWatchedBtn.textContent = filmObject.isWatched
        ? 'REMOVE FROM WATCHED'
        : 'ADD TO WATCHED';
    }
  };
  setButtonStates();

  addToQueueBtn.addEventListener('click', () => {
    const filmObject = getFromStorage(filmData.id);
    if (filmObject) {
      updateFilmInStorage(
        filmData.id,
        !filmObject.isInQueue,
        filmObject.isWatched
      );
      if (filmObject.isInQueue) {
        removeFilmCardFromDOM(filmData.id);
      }
    } else {
      addToQueue({ id: filmData.id, cardHtml: cardHtml, data: filmData });
    }
    setButtonStates();
  });

  addToWatchedBtn.addEventListener('click', () => {
    const filmObject = getFromStorage(filmData.id);
    if (filmObject) {
      updateFilmInStorage(
        filmData.id,
        filmObject.isInQueue,
        !filmObject.isWatched
      );
      if (filmObject.isWatched) {
        removeFilmCardFromDOM(filmData.id);
      }
    } else {
      addToWatched({ id: filmData.id, cardHtml: cardHtml, data: filmData });
    }
    setButtonStates();
  });

  new SimpleLightbox('.film-modal-content a', {
    overlay: true,
    close: true,
    showCounter: true,
  });

  function handleModalClick(event) {
    if (
      event.target === modal ||
      event.target.classList.contains('close-modal')
    ) {
      modal.remove();
      document.removeEventListener('click', handleModalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }

  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleModalClick);
    }
  }

  modal.addEventListener('click', handleModalClick);
  document.addEventListener('keydown', handleEscapeKey);
};

function removeFilmCardFromDOM(filmId) {
  console.log(`Încercăm să eliminăm cardul cu ID-ul: ${filmId}`);
  const filmCard = document.querySelector(
    `.movie-wrapper__card[data-filmid="${filmId}"]`
  );
  if (filmCard) {
    filmCard.remove();
    console.log(`Cardul cu ID-ul: ${filmId} a fost eliminat.`);
  } else {
    console.log(`Cardul cu ID-ul: ${filmId} nu a fost găsit.`);
  }
}
