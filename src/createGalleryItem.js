const createGalleryItem = ({
  webformatURL: webformatURL,
  largeImageURL: largeImageURL,
  tags: tags,
  likes: likes,
  views: views,
  comments: comments,
  downloads: downloads,
}) => {
  return `<div class="photo-card">
    <img src="${webformatURL}" srcset="${largeImageURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes <span>${likes}</span></b>
      </p>
      <p class="info-item">
        <b>Views <span>${views}</span></b>
      </p>
      <p class="info-item">
        <b>Comments <span>${comments}</span></b>
      </p>
      <p class="info-item">
        <b>Downloads <span>${downloads}</span></b>
      </p>
    </div>
  </div>`;
};

export { createGalleryItem };
