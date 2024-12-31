import fetchData from './fetchData';

const createPost = async (type, background, text, images, user, token) => {
  const { success, data, error } = await fetchData(
    '/post/create',
    'POST',
    {
      type,
      background,
      images,
      text,
      user,
    },
    {
      Authorization: `Bearer ${token}`,
    }
  );
  if (success) {
    return { success, data };
  } else {
    return { error };
  }
};

export default createPost;
