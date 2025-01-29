import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const PublishedVideo = asyncHandler(async (req, res)=>{
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

const UpdateViews = asyncHandler(async (req, res) => {
    const videoId = req.params.id
    if(!videoId){
        throw new apiError("Video id is required",400)
    }
    const video = await Video.findByIdAndUpdate(videoId,
        {
            $inc: { views: 1 }
        },
        { new: true }
    )
    if(!video){
        throw new apiError("Failed to update views",500)
    }
    await User.findByIdAndUpdate(
        req.user?._id,
        {$set :{watchHistory:videoId}},
        { new: true }
    )
    return res
    .status(200)
    .json(new ApiResponse(200,"Views updated successfully",video))
})

const getAllVideos = asyncHandler(async (req, res) => {
    const userId = req.params.userId
    if(!userId){
        throw new apiError("User id is required",400)
    }
    const videos = await Video.aggregate([
        {
           $match:{owner: new mongoose.Types.ObjectId(userId)}
        }   
    ])
    if(!videos){
        throw new apiError("Failed to fetch videos",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Videos fetched successfully",videos))
})

const getVideoById = asyncHandler(async (req, res) => {
    const videoId = req.params.videoId
    if(!videoId){
        throw new apiError("Video id is required",400)
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new apiError("Failed to fetch video",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Video fetched successfully",video))
})

const updateVideo = asyncHandler(async (req, res) => {
    
   const {videoId, title, description} = req.body;
   if(!videoId){
        throw new apiError("Video id is required",400)
   }
   const localVidoePath = req.file?.path;
   let newThumbnail;
   if(localVidoePath){
        newThumbnail = await uploadOnCloudinary(localVidoePath)
   }
   if(title || description || newThumbnail){
        await Video.findByIdAndUpdate(videoId,
           {
               $set:{
                ...(title && { title }),
                ...(description && { description }),
                ...(newThumbnail && { thumbnail: newThumbnail })
               }
           }
       )
   }
   const updatedVideo = await Video.findById(videoId)
    return res
   .status(200)
   .json(new ApiResponse(200,"Video updated successfully",updatedVideo))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const videoId = req.params.videoId
    if(!videoId){
        throw new apiError("Video id is required",400)
    }
    const video = await Video.findByIdAndDelete(videoId)
    if(!video){
        throw new apiError("Failed to delete video",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Video deleted successfully"))
})

const togglePublishedStatus = asyncHandler(async (req, res)=>{
    const videoId = req.params.videoId
    if(!videoId){
        throw new apiError("Video id is required",400)
    }
    const video = await Video.findByIdAndUpdate(videoId,
        {
            $set: { isPublished:!video.isPublished }
        },
        { new: true }
    )
    if(!video){
        throw new apiError("Failed to toggle published status",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Published status toggled successfully",video))
})

export {
    PublishedVideo,
    UpdateViews,
    getAllVideos,
    getVideoById,
    updateVideo,  // Update video with title, description and/or thumbnail
    deleteVideo,
    togglePublishedStatus
}