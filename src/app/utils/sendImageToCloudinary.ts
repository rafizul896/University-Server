import { v2 as cloudinary } from 'cloudinary';

export const sendImageToCloudinary = async () => {
  // Configuration
  cloudinary.config({
    cloud_name: 'donuns3be',
    api_key: '786418681194374',
    api_secret: '_bPAxNN0fv483ArPTBdqXGLU-k8',
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      {
        public_id: 'shoes',
      },
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);
};

