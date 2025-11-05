import SimpleLightbox from 'simplelightbox';

const refs = { list: document.querySelector('.gallery') };

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export function createImages(data) {
  const images = data.hits
    .map(
      hit =>
        `<div class="image-size">
            <a href="${hit.largeImageURL}">
              <img class="image" src="${hit.webformatURL}" alt="${hit.tags}" />
            </a>
            <div class ="text-wraper">
              <div class="text-block"><h5>likes</h5><p>${hit.likes}</p></div>
              <div class="text-block"><h5>views</h5><p>${hit.views}</p></div>
              <div class="text-block"><h5>comments</h5><p>${hit.comments}</p></div>
              <div class="text-block"><h5>downloads</h5><p>${hit.downloads}</p></div>
            </div>
        </div>`
    )
    .join('');

  refs.list.insertAdjacentHTML('beforeend', images);
  lightbox.refresh();
}

export function clearImages() {
  refs.list.innerHTML = '';
}

export function scrollDown() {
  const height = refs.list.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
