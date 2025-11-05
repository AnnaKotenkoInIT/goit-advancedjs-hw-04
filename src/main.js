import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import searchImagesByQuery from './js/pixabay-api';
import { createImages, clearImages, scrollDown } from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.form-input'),
  loader: document.querySelector('.loader'),
  button: document.querySelector('.load-button'),
  message: document.querySelector('.bottom'),
};

const per_page = 15;
let page = 1;
let wordFromStart = '';

refs.form.addEventListener('submit', handleSubmit);
refs.button.addEventListener('click', handleClick);

async function handleSubmit(event) {
  event.preventDefault();
  clearImages();

  const wordForSearch = refs.input.value.trim();
  page = 1;

  wordFromStart = wordForSearch;

  if (wordForSearch === '') {
    iziToast.error({
      position: 'topRight',
      message: 'Please fill the input',
    });
    return;
  }

  refs.loader.classList.remove('hidden');
  refs.message.classList.remove('show-text');

  try {
    const data = await searchImagesByQuery(wordForSearch, page, per_page);

    if (data.total === 0) {
      iziToast.error({
        position: 'topRight',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      refs.loader.classList.add('hidden');
      refs.button.classList.add('hidden');
      return;
    } else {
      await createImages(data);
      refs.loader.classList.add('hidden');
      if (data.totalHits <= per_page) {
        refs.button.classList.add('hidden');
        refs.message.classList.add('show-text');
      } else {
        refs.button.classList.remove('hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: error.message,
    });
    refs.loader.classList.add('hidden');
  }
}

async function handleClick(event) {
  page += 1;
  refs.loader.classList.remove('hidden');
  refs.button.classList.add('hidden');
  try {
    const data = await searchImagesByQuery(wordFromStart, page, per_page);
    if (data.hits.length < per_page) {
      refs.button.classList.add('hidden');
      refs.message.classList.add('show-text');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      refs.button.classList.remove('hidden');
    }
    await createImages(data);
    scrollDown();
    refs.loader.classList.add('hidden');
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: error.message,
    });
    refs.loader.classList.add('hidden');
  }
}
