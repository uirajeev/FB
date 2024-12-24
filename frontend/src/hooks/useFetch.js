import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

/**
 * Utility function to make an API call using Axios.
 * @param {string} url - The API endpoint.
 * @param {string} method - The HTTP method (GET, POST, etc.).
 * @param {object} [data=null] - Data to be sent with POST, PUT, etc.
 * @param {object} [headers={}] - Additional headers (optional).
 * @returns {Promise} - Returns a promise with the API response or error.
 */

const useFetch = (url='', method = 'GET', body = null, headers = {}) => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url: process.env.REACT_APP_API_URL + url,
          method,
          data: body,
          headers,
        });
        setData(response.data);
      } catch (err) {
        setError(err.message || t('fetch.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, headers]);

  return { data, loading, error };
};

export default useFetch;
