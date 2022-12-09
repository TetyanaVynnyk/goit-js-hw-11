import axios from 'axios';

const URL = 'pixabay.com/api';
const API_KEY = '31930152-30d8507b21f279e62dc6170e1';
export default class GalleryAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchGalleryItems() {
    const response = await axios.get(
      `https://${URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    this.page += 1;
    console.log(response);
    if (!response.status === 200) {
      throw new Error(response.statusText);
    }
    return await response.data;
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
