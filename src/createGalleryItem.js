const createGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
    return `<div class="photo-card">
    <img src="${webformatURL}" srcset="${largeImageURL}" alt="${tags}" loading="lazy" width = 400px height = 350px/>
    <div class="info">
      <p class="info-item">
        <b class = "info-element"><span>Likes</span><span>${likes}</span></b>
      </p>
      <p class="info-item">
        <b class = "info-element"><span>Views</span><span>${views}</span></b>
      </p>
      <p class="info-item">
        <b class = "info-element"><span>Comments</span><span>${comments}</span></b>
      </p>
      <p class="info-item">
        <b class = "info-element"><span>Downloads</span><span>${downloads}</span></b>
      </p>
    </div>
  </div>`;
};

export { createGalleryItem };
