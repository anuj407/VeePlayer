import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null;
        // Upload the fihle on Cloudinary 
        const result = await cloudinary.uploader.upload(localFilePath, {resouce_type: "auto"});
        console.log("File uploaded successfully: ", result.secure_url);
        return result.secure_url;
    }
    catch(err){
        fs.unlinkSync(localFilePath); // Remove locally saved temporary file as upload operation failed
        console.error("Error uploading to Cloudinary: ", err);
         return null;
    }
}

export default uploadOnCloudinary;
