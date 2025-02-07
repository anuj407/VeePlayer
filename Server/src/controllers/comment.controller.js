import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";

const addComment = asyncHandler(async (req, res)=>{
    const videoId = req.params.videoId
    const content = req.body
    if(!videoId || !content){
        throw new apiError("video and content is required",400)
    }
    const comment = await Comment.create({
        content: req.body.content,
        video: videoId,
        user:req.user._id
    })
    if(!comment){
        throw new apiError("Failed to create comment",500)
    }
    return res
    .status(201)
    .json(new ApiResponse(201,"Comment added successfully",comment))
})

const updateComment = asyncHandler(async (req, res)=>{
    const commentId= req.params.commentId
    const content = req.body
    if(!commentId ||!content){
        throw new apiError("comment id and content is required",400)
    }
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: { content }
        }
    )
    if(!updatedComment){
        throw new apiError("Failed to update comment",500)
    }
    return res
    .status(200)
    .json(new ApiResponse(200,"Comment updated successfully",updatedComment))
})

const deleteComment = asyncHandler(async (req, res)=>{
    const commentId = req.params.commentId
    if(!commentId){
        throw new apiError("Comment id is required",400)
    }
    const deletedComment = await Comment.findByIdAndDelete(commentId)
    if(!deletedComment){
        throw new apiError("Failed to delete comment",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Comment deleted successfully"))
})

const getAllComment = asyncHandler(async(req,res)=>{
    const videoId = req.params.videoId
    if(!videoId){
        throw new apiError("Video id is required",400)
    }
    const comments = await Comment.find({video: videoId})
    if(!comments){
        throw new apiError("Failed to fetch comments",500)
    }
    return res
   .status(200)
})
export {
    addComment,
    updateComment,
    deleteComment,
    getAllComment,
 
}