import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadToCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "image",
        folder: "A Saddique Shawl",
      }
    );

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    throw error;
  } finally {
    // Delete the temporary file after success or failure
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (error) {
      console.error("Temporary file cleanup failed:", error.message);
    }
  }
};


export async function deleteFromCloudinary(public_id) {
  if (!public_id) return;

  const result = await cloudinary.uploader.destroy(public_id);

  return result;
}

export { uploadToCloudinary, deleteFromCloudinary };

