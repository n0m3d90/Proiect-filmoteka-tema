import { getFromStorage } from './getLocalStorage';

export function addToQueue(filmData) {
  if (!filmData || !filmData.id) {
    console.error('Datele filmului sunt invalide');
    return;
  }
  const filmObject = {
    html: filmData.cardHtml,
    data: filmData,
    isInQueue: true,
  };
  localStorage.setItem(filmData.id.toString(), JSON.stringify(filmObject));
}

export function addToWatched(filmData) {
  if (!filmData || !filmData.id) {
    console.error('Datele filmului sunt invalide');
    return;
  }
  const filmObject = {
    html: filmData.cardHtml,
    data: filmData,
    isWatched: true,
  };
  localStorage.setItem(filmData.id.toString(), JSON.stringify(filmObject));
}

export function updateFilmInStorage(filmId, isInQueue, isWatched) {
  const filmObject = getFromStorage(filmId);
  if (!filmObject) {
    console.error('Filmul nu a fost găsit în storage');
    return;
  }
  filmObject.isInQueue = isInQueue;
  filmObject.isWatched = isWatched;
  localStorage.setItem(filmId.toString(), JSON.stringify(filmObject));
}
