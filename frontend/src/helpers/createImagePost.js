import { uploadImages } from './uploadImage';
import createPost from './creatPost';
import dataURItoBlob from './dataURItoBlob';

const creatImagePost = async (images, text, path, user) => {
  const postImages = images.map((img) => {
    return dataURItoBlob(img);
  });
  const imageFolderPath = path ? path : `${user.username}/post-images`;
  let formData = new FormData();
  formData.append('path', imageFolderPath);
  postImages.forEach((image) => {
    formData.append('file', image);
  });

  const { error, data } = await uploadImages(formData, user.token);

  if (error) {
    return { success: false, error, data: null };
  }

  const response = await createPost(
    null,
    null,
    text,
    data,
    user.id,
    user.token
  );

  return response;
};

export default creatImagePost;
