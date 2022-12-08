const URL = 'pixabay.com/api';
const API_KEY = '31930152-30d8507b21f279e62dc6170e1';
export default class GalleryAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchGalleryItems() {
    return fetch(
      `https://${URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    )
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
