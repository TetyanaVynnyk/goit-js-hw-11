const e=({webformatURL:e,largeImageURL:n,tags:t,likes:s,views:a,comments:r,downloads:i})=>`<div class="photo-card">\n    <img src="${e}" srcset="${n}" alt="${t}" loading="lazy" />\n    <div class="info">\n      <p class="info-item">\n        <b>Likes <span>${s}</span></b>\n      </p>\n      <p class="info-item">\n        <b>Views <span>${a}</span></b>\n      </p>\n      <p class="info-item">\n        <b>Comments <span>${r}</span></b>\n      </p>\n      <p class="info-item">\n        <b>Downloads <span>${i}</span></b>\n      </p>\n    </div>\n  </div>`,n={searchForm:document.querySelector(".search-form"),imagesGallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more ")},t=new class{fetchGalleryItems(){return fetch(`https://pixabay.com/api/?key=31930152-30d8507b21f279e62dc6170e1&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`).then((e=>e.json())).then((e=>(this.page+=1,e.hits)))}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}constructor(){this.searchQuery="",this.page=1}};function s(t){const s=t.map(e);n.imagesGallery.insertAdjacentHTML("beforeend",s.join(""))}n.searchForm.addEventListener("submit",(function(e){if(e.preventDefault(),function(){n.imagesGallery.innerHTML=""}(),t.query=e.currentTarget.elements.searchQuery.value,""===t.query)return alert("Oops");t.resetPage(),t.fetchGalleryItems().then(s)})),n.loadMoreBtn.addEventListener("click",(function(){t.fetchGalleryItems().then(s)}));
//# sourceMappingURL=index.e7025a93.js.map