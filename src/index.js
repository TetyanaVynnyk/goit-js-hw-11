import './css/common.css';
import GalleryAPIService from './getGalleryItems';
import { createGalleryItem } from './createGalleryItem';

const refs = {
  searchForm: document.querySelector('.search-form'),
  imagesGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const galleryAPIService = new GalleryAPIService();

let totalAmountOfPages = 0;

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

disableBtn();

function onFormSubmit(event) {
  event.preventDefault();

  clearGalleryMurkup();

  galleryAPIService.query = event.currentTarget.elements.searchQuery.value;

  if (galleryAPIService.query === '') {
    return alert(`Please enter a search query`);
  }

  galleryAPIService.resetPage();
  galleryAPIService.fetchGalleryItems().then(({ hits, totalHits }) => {
    if (hits.length == 0) {
      return alert(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    } else {
      alert(`Hooray! We found ${totalHits} images.`);
      createGalleryMarkup(hits), enableBtn();
    }
    totalAmountOfPages += hits.length;
  });
}

function onLoadMore() {
  disableBtn();
  galleryAPIService.fetchGalleryItems().then(({ hits, totalHits }) => {
    createGalleryMarkup(hits), enableBtn(), (totalAmountOfPages += hits.length);
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    if (totalAmountOfPages === totalHits) {
      console.log(totalAmountOfPages, totalHits);
      disableBtn();
      return alert(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  });
}

function createGalleryMarkup(hits) {
  const markup = hits.map(createGalleryItem);
  refs.imagesGallery.insertAdjacentHTML('beforeend', markup.join(''));
}

function clearGalleryMurkup() {
  refs.imagesGallery.innerHTML = '';
}

function disableBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.loadMoreBtn.setAttribute('disabled', true);
}

function enableBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
  refs.loadMoreBtn.removeAttribute('disabled');
}
