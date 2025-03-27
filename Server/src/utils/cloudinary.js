import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Determine the resource type based on file extension
    const fileExtension = localFilePath.split('.').pop().toLowerCase();
    const resourceType = ["mp4", "mkv", "avi", "mov","webm"].includes(fileExtension)
      ? "video"
      : ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)
      ? "image"
      : null;

    if (!resourceType) {
      console.error("Unsupported file type");
      return null;
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, { resource_type: resourceType });
    
    // Remove the locally saved temporary file after successful upload
    fs.unlinkSync(localFilePath);

    return result.secure_url;
  } catch (err) {
    // Ensure the locally saved file is removed even if the upload fails
      fs.unlinkSync(localFilePath);
    console.error("Error uploading to Cloudinary:", err);
    return null;
  }
};


export { uploadOnCloudinary};