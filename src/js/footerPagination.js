import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { getMovies } from './getMovies';

import { createFilmCard } from './filmCards.js';
import '../css/footerPagination.css';
import { options } from './optionsPagination.js';
import { currentSearchQuery } from './searchForm.js';

import '../css/footerPagination.css';

export async function footerPagination() {
  const pagination = new Pagination(
    document.getElementById('pagination-container'),
    options
  );

  pagination.on('afterMove', onPaginationClick);

  async function onPaginationClick(e) {
    const lastPageNumber = Number(
      document.querySelector('.tui-ico-last').textContent
    );
    const selectedPage = e.page;
    if ((selectedPage > 1) & (selectedPage <= lastPageNumber)) {
      hideBtn(selectedPage);
    }

    const dataResponse = await getMovies(currentSearchQuery, selectedPage);
    console.log(dataResponse);

    createFilmCard(dataResponse);

    scrollToTop();
  }
  function hideBtn(selectedPage) {
    const firstPageBtnRef = document.querySelector('.custom-class-first');
    const lastPageBtnRef = document.querySelector('.custom-class-last');

    const lastPageNumber = Number(
      document.querySelector('.tui-ico-last').textContent
    );

    if (selectedPage < 4) {
      firstPageBtnRef.classList.add('btn-hidden');
      return;
    }
    if (lastPageNumber - selectedPage < 3) {
      lastPageBtnRef.classList.add('btn-hidden');
      return;
    }

    lastPageBtnRef.classList.remove('btn-hidden');
    firstPageBtnRef.classList.remove('btn-hidden');
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
