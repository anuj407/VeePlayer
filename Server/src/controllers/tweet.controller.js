import { Tweet } from "../models/tweet.model.js"
import { apiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import mongoose from "mongoose"

const createTweet = asyncHandler(async(req, res)=>{
       const content = req.body.content
       if(!content){
            throw new apiError("Content is required",400)
       }
       const tweet = await Tweet.create(
            {
                user: req.user._id,
                content
            }
       )
       if(!tweet){
            throw new apiError("Failed to create tweet",500)
       }
       return res
       .status(201)
       .json(new ApiResponse(201,"Tweet created successfully", tweet))
})
const getAllTweets = asyncHandler(async(req, res)=>{
    const userId = req.params.userId
    if(!userId){
        throw new apiError("User id is required",400)
    }
    const allTweet = await Tweet.aggregate([
        {
            $match:{user: new mongoose.Types.ObjectId(userId)}
        },
        {
            $lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"tweet",
                as:"likes"
            }
        },
        {
            $addFields:{
                totalLikes:{$size:"$likes"}
            }
        },
        {
            $project:{
                _id:1,
                user:1,
                content:1,
                totalLikes:1,
                createdAt:1
            }
        }
    ])
    if(!allTweet){
        throw new apiError("Failed to Fetch all Tweets",404)
    }
    return res
    .status(200)
    .json(new ApiResponse(200,"All Tweets retrieved successfully",allTweet))
})
const updateTweet = asyncHandler(async(req, res)=>{
    const tweetId = req.params.tweetId
    const newContent = req.body.content
    if(!tweetId){
        throw new apiError("Tweet id is required",400)
    }
    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {content:newContent}
        },
        {new: true}
    )
    if(!updatedTweet){
        throw new apiError("Failed to update tweet",500)
    }
    return res
    .status(200)
    .json(new ApiResponse(200,"Tweet updated successfully",updatedTweet))
})
const deleteTweet = asyncHandler(async(req, res)=>{
    const tweetId = req.params.tweetId
    if(!tweetId){
        throw new apiError("Tweet id is required",400)
    }
    const deletedTweet = await Tweet.findByIdAndDelete(tweetId)
    if(!deletedTweet){
        throw new apiError("Failed to delete tweet",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Tweet deleted successfully"))
})
export {
    createTweet,
    getAllTweets,
    updateTweet,
    deleteTweet
}