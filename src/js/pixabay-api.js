import axios from 'axios';

const API_KEY = '45248332-5310999e5b0f9864a5c1f02e8';
const URL = 'https://pixabay.com/api/';

export default async function searchImagesByQuery(query, page, per_page) {
  const axiosParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: 20,
    safesearch: true,
  };

  try {
    const response = await axios.get(URL, { params: axiosParams });
    return response.data;
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: `${error}`,
    });
  }
}
