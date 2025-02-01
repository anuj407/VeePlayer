import { Like } from "../models/like.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleVideoLike = asyncHandler(async(req, res)=>{
    const videoId = req.params.videoId;
    if(!videoId){
        throw new apiError("Video id is required",400)
    }
    const existedike = await Like.findOne({likedBy:req.user._id, video:videoId})
    if(existedike){
          await Like.findByIdAndDelete(existedike._id)
          return res.status(200).json(new ApiResponse(200,"Video unliked successfully"))
    }
  const like = await Like.create(
        {
            likedBy: req.user._id,
            video: videoId
        }
    )     
    if(!like){
        throw new apiError("Failed to like video",500)
    }    
    return res
    .status(201)
    .json(new ApiResponse(201,"Video liked successfully",like))
})
const toggleCommentLike = asyncHandler(async(req, res)=>{
    const commentId = req.params.commentId;
    if(!commentId){
        throw new apiError("Comment id is required",400)
    }
    const existedike = await Like.findOne({likedBy:req.user._id, comment:commentId})
    if(existedike){
          await Like.findByIdAndDelete(existedike._id)
          return res.status(200).json(new ApiResponse(200,"Video unliked successfully"))
    }
  const like = await Like.create(
    {
        likedBy: req.user._id,
        comment: commentId
    }
    )     
    if(!like){
        throw new apiError("Failed to like comment",500)
    }    
    return res
    .status(201)
    .json(new ApiResponse(201,"Comment liked successfully",like))
  
})
const toggleTweetLike = asyncHandler(async(req, res)=>{
    const tweetId = req.params.tweetId;
    if(!tweetId){
        throw new apiError("Tweet id is required",400)
    }
    const existedike = await Like.findOne({likedBy:req.user._id, tweet:tweetId})
    if(existedike){
          await Like.findByIdAndDelete(existedike._id)
          return res.status(200).json(new ApiResponse(200,"Video unliked successfully"))
    }
  const like = await Like.create(
    {
        likedBy: req.user._id,
        tweet: tweetId
    }
    )     
    if(!like){
        throw new apiError("Failed to like tweet",500)
    }    
    return res
    .status(201)
    .json(new ApiResponse(201,"Tweet liked successfully",like))
  
})

const getLikedVideos = asyncHandler (async(req, res)=>{

    const LikedVideos = await Like.aggregate([
        {
           $match:{likedBy: req.user._id}
        },
        {
           $lookup:{
             from:"videos",
             localField:"video",
             foreignField:"_id",
             as:"video"
           }
        }
    ])
    if(!LikedVideos){
        throw new apiError("No liked videos found",404)
    }
    // const videos = await Video.find({_id:{$in:LikedVideos.map(like=>like.video)}}).populate('owner')
    return res
   .status(200)
   .json(new ApiResponse(200,"Liked videos retrieved successfully",LikedVideos))
})
export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
}