import iziToast from 'izitoast';
import axios from 'axios';
const API_KEY = '36838711-56df4c2f8a3a85471ff3834b0';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let searchQuery = '';
let page = 1;
let totalHits = 0;

loadMoreBtn.style.display = 'none';

async function fetchImages() {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  try {
    const response = await axios.get(url);
    const images = response.data.hits;
    totalHits = response.data.totalHits;

    if (images.length === 0) {
      iziToast.info({
        title: 'Hello',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
      });
      loadMoreBtn.style.display = 'none';
    } else {
      appendImages(images);
      if (totalHits <= page * 40) {
        loadMoreBtn.style.display = 'none';

        iziToast.info({
          title: 'Hello',
          message: 'We`re sorry, but you`ve reached the end of search results.',
        });
      } else {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching data.',
    });
  }
  page += 1;
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;

  if (!searchQuery.trim()) {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a search query.',
    });

    return;
  }

  gallery.innerHTML = '';
  page = 1;
  fetchImages();
});

loadMoreBtn.addEventListener('click', fetchImages);

function appendImages(images) {
  const markup = images
    .map(
      image => `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> <br>${image.likes}
        </p>
        <p class="info-item">
          <b>Views:</b> <br>${image.views}
        </p>
        <p class="info-item">
          <b>Comments:</b> <br>${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> <br>${image.downloads}
        </p>
      </div>
    </div>
  `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
