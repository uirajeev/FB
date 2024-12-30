import cloudinary from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve, reject) => {
    const { name, data } = file;
    cloudinary.v2.uploader
      .upload_stream(
        { resource_type: 'image', folder: path },
        async (err, res) => {
          if (err) {
            removeTmp(file.tempFilePath);
            return reject({ message: 'Image upload failed.' });
          }
          resolve({
            url: res.secure_url,
          });
        }
      )
      .end(data);
  });
};

const removeTmp = (path) => {
  if (path) {
    fs.unlink(path, (err) => {
      if (err) {
        console.error('Error removing temporary file:', err);
      }
    });
  }
};
