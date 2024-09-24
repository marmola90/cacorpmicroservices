import { cloudinaryConfig } from "../config/cloudinary.conf";
import { urlImage } from "../types/cloudiImageUrlTypes";

export const uploadImage = async (imagePath: string, descripcion: string): Promise<urlImage | unknown> => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    public_id: descripcion,
    use_filename: false,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinaryConfig.uploader.upload(imagePath, options);
    const datos: urlImage = {
      public_id: result.public_id,
      url: getImage(result.public_id)
    }
    return datos;
  } catch (error) {
    console.error(error);
  }
};

export const deleteImage = async (publicId: string) => {
  await cloudinaryConfig.api.delete_resources([publicId], { type: 'upload', resource_type: 'image' }).then(console.log)

}

// Optimize delivery by resizing and applying auto-format and auto-quality
const getImage = (publicID: string): string => {
  const optimizeUrl: string = cloudinaryConfig.url(publicID, {
    fetch_format: 'auto',
    quality: 'auto'
  });

  return optimizeUrl
}

