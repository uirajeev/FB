import axios from 'axios';
import { t } from 'i18next';

/**
 * Utility function to make an API call using Axios.
 * @param {string} url - The API endpoint.
 * @param {string} method - The HTTP method (GET, POST, etc.).
 * @param {object} [data=null] - Data to be sent with POST, PUT, etc.
 * @param {object} [headers={}] - Additional headers (optional).
 * @returns {Promise} - Returns a promise with the API response or error.
 */
const fetchData = async (url='', method = 'GET', data = null, headers = {}) => {
  try {
    const response = await axios({
      url: process.env.REACT_APP_API_URL + url,
      method,
      data,
      headers,
    });
    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || t('fetch.error');
    return { success: false, error: errorMessage };
  }
};

export default fetchData;
