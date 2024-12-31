import fetchData from './fetchData';

export const uploadImages = async (formData, token) => {
  const { success, data, error } = await fetchData(
    '/upload/images',
    'POST',
    formData,
    {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    }
  );
  return { success, data, error };
};
