import { refs } from './refs';
import GalleryAPIService from './getGalleryItems';
import { createGalleryItem } from './createGalleryItem';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/common.css';

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
    // return alert(`Please enter a search query`);
    Notiflix.Notify.failure('Please enter a search query');
    return;
  }

  galleryAPIService.resetPage();
  galleryAPIService.fetchGalleryItems().then(({ hits, totalHits }) => {
    if (hits.length == 0) {
      // return alert(
      //   `Sorry, there are no images matching your search query. Please try again.`
      // );
      disableBtn();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      // alert(`Hooray! We found ${totalHits} images.`);
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
      createGalleryMarkup(hits), enableBtn();
      lightbox.refresh();
    }
    totalAmountOfPages += hits.length;
  });
}

function onLoadMore() {
  disableBtn();
  galleryAPIService.fetchGalleryItems().then(({ hits, totalHits }) => {
    createGalleryMarkup(hits),
      enableBtn(),
      lightbox.refresh(),
      (totalAmountOfPages += hits.length);
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
      // return alert(
      //   `We're sorry, but you've reached the end of search results.`
      // );
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
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

var lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
