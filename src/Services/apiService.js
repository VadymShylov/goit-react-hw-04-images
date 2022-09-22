import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28386438-dba7fd41c10be8b32090b775f';

export const getArticles = async (text, page) => {
  
  try {
    const response  = await axios.get(
      `${BASE_URL}/?q=${text}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
      if (response.data.hits.length === 0) {
        throw new Error('error');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };
