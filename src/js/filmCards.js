import { fetchGenres } from './fetchGenres.js';
import { getMovies } from './getMovies.js';
import { openFilmModal } from './openFilmModal.js';
import { genres } from './fetchGenres.js';

export async function createFilmCard(dataPromise) {
  const movieCard = document.querySelector('.movie-wrapper');
  const data = await dataPromise; // Așteaptă rezolvarea promisiunii cu datele

  movieCard.textContent = '';

  if (!data || !data.results) {
    // console.error(
    //   'Datele nu sunt disponibile sau nu au proprietatea "results".'
    // );
    return;
  }

  data.results.forEach(response => {
    // Crează un element nou pentru fiecare film/serial
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-wrapper__card');

    // Determină titlul: folosește 'name' pentru seriale și 'original_title' pentru filme
    let title = response.title || response.name || 'Unknown Title';

    if (response.media_type === 'tv') {
      title = response.name || response.original_name || 'Unknown Title';
    } else if (response.media_type === 'movie') {
      title = response.title || response.original_title || 'Unknown Title';
    }

    // Mapează ID-urile genurilor la numele lor, folosind lista de genuri încărcată
    const genreNames = response.genre_ids
      .map(id => {
        const genre = genres.find(genre => genre.id === id);
        return genre ? genre.name : null;
      })
      .filter(name => name !== null)
      .join(', ');
    //  console.log(genres);
    if (genreNames.includes('Unknown')) {
      console.log('ID-uri genuri necunoscute:', response.genre_ids);
      console.log('Lista de genuri disponibile:', genres);
    }

    // Determină anul de lansare
    let releaseYear;

    if (response.media_type === 'movie') {
      releaseYear = response.release_date
        ? response.release_date.split('-')[0]
        : 'Unknown Year';
    } else if (response.media_type === 'tv') {
      releaseYear = response.first_air_date
        ? response.first_air_date.split('-')[0]
        : 'Unknown Year';
    } else {
      releaseYear = 'Unknown Year';
    }

    // Formatează rating-ul pentru a afișa doar două zecimale
    const rating =
      typeof response.vote_average === 'number'
        ? response.vote_average.toFixed(2)
        : 'N/A';

    const posterPath = response.poster_path
      ? `https://image.tmdb.org/t/p/w500${response.poster_path}`
      : 'path/to/default/image.jpg';

    // Adaugă un atribut data-filmId la fiecare card
    movieElement.setAttribute('data-filmId', response.id.toString());

    // Construiește HTML-ul pentru cardul filmului/serialului
    movieElement.innerHTML = `
      <div class="movie-wrapper__card-img">
        <img src="${posterPath}" alt="${title}">
      <span class="movie-wrapper__info-rating">${rating}</span>
        </div>
      <div class="movie-wrapper__footer">
        <div class="movie-wrapper__title">${title}</div>
        <div class="movie-wrapper__info">
          <p class="movie-wrapper__info-genres">${genreNames}</p>
          <span class="movie-wrapper__info-year"> | ${releaseYear}</span>
          
        </div>
      </div>`;

    // Adaugă elementul creat în containerul principal
    movieCard.append(movieElement);

    movieElement.addEventListener('click', () => {
      const existingModal = document.querySelector('.film-modal');
      if (existingModal) {
        existingModal.remove();
      }
      // Exemplu de apelare a openFilmModal
      openFilmModal(response, movieElement.outerHTML); // Utilizați response, care reprezinta datele filmului
    });
  });
}
