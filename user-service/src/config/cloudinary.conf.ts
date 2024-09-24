const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.API_KEY_CLOUDI,
  api_secret: process.env.API_SECRET_CLOUDI
})

export const cloudinaryConfig = cloudinary