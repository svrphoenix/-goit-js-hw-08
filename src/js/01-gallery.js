// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this linen

console.log(galleryItems);
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryRef = document.querySelector('.gallery');
const galleryItemsMarkup = galleryItems
  .map(
    ({preview, original, description}) =>
      `<a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>`
  )
  .join('');
galleryRef.innerHTML = galleryItemsMarkup;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
