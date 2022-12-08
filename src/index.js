import './css/common.css';
import GalleryAPIService from './getGalleryItems';
import { createGalleryItem } from './createGalleryItem';

const refs = {
  searchForm: document.querySelector('.search-form'),
  imagesGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more '),
};

const galleryAPIService = new GalleryAPIService();

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(event) {
  event.preventDefault();

  clearGalleryMurkup();

  galleryAPIService.query = event.currentTarget.elements.searchQuery.value;

  if (galleryAPIService.query === '') {
    return alert(`Oops`);
  }

  galleryAPIService.resetPage();
  galleryAPIService.fetchGalleryItems().then(createGalleryMarkup);
}

function onLoadMore() {
  galleryAPIService.fetchGalleryItems().then(createGalleryMarkup);
}

function createGalleryMarkup(hits) {
  const markup = hits.map(createGalleryItem);
  refs.imagesGallery.insertAdjacentHTML('beforeend', markup.join(''));
}

function clearGalleryMurkup() {
  refs.imagesGallery.innerHTML = '';
}
