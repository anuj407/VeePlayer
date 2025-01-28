import { Video } from "../models/video.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadVideo = asyncHandler( async (req, res)=>{
   const {title,description} = req.body
    // Validation
    if(!title || !description){
        throw new apiError("Title and description are required",400)
    }
    const videoLocalPath = req.files?.videoFile[0]?.path
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path
    if(!videoLocalPath){
        throw new apiError("Video is required",400)
    }
    if(!thumbnailLocalPath){
        throw new Error("Thumbnail is required",400)
    }
    // Upload video to cloudinary
    const uploadedVideo = await uploadOnCloudinary(videoLocalPath)
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    if(!uploadedVideo){
        throw new apiError("Failed to upload video on cloudinary",500)
    }
    if(!uploadedThumbnail){
        throw new apiError("Failed to upload thumbnail",500)
    }
   const video = await Video.create({
        videoFile: uploadedVideo,
        title,
        description,
        thumbnail: uploadedThumbnail,
        owner: req.user._id        
    })
    const createdVideo = await Video.findById(video._id)
    if(!createdVideo){
        throw new apiError("Failed to upload video",500)
    }
    return res
    .status(201)
    .json(new ApiResponse(201,"Successfully uploaded video",createdVideo))
})

export {
    uploadVideo
}