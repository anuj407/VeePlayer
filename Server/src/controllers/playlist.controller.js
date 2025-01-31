import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {Playlist} from "../models/playlist.model.js"


const createPlaylist = asyncHandler(async (req,res)=>{
    
    const {name,description} = req.body
    const videoId = req.params.videoId
    if(!name){
        throw new apiError("Name is required",400)
    }
    const newPlaylist = await Playlist.create(
        {
            name,
            description: description || "",
            owner: req.user._id,
            videos: videoId || ""
        }
    )
    if(!newPlaylist){
        throw new apiError("Failed to create playlist",500)
    }
    return res
    .status(201)
    .json(new ApiResponse(201,"Playlist created successfully",newPlaylist))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const playlistId = req.params.playlistId
    const {name,description} = req.body
    if(!name && !description){
        throw new apiError("Name or description is required",400)
    }
    if(!playlistId){
        throw new apiError("Playlist id is required",400)
    }
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {name,description: description || ""},
        {new: true}
    )
    if(!updatedPlaylist){
        throw new apiError("Failed to update playlist",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Playlist updated successfully",updatedPlaylist))
})

const deletePlaylist = asyncHandler(async (req,res)=>{
    const playlistId = req.params.playlistId
    if(!playlistId){
        throw new apiError("Playlist id is required",400)
    }
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId)
    if(!deletedPlaylist){
        throw new apiError("Failed to delete playlist",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Playlist deleted successfully"))
})

const addVideoToPlaylist = asyncHandler(async(req,res)=>{
    const {playlistId , videoId }= req.params
    if(!playlistId || !videoId){
        throw new apiError("Playlist id and video id are required",400)
    }
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {$push: {videos: videoId}},
        {new: true}
    )
    if(!playlist){
        throw new apiError("Failed to add video to playlist",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Video added to playlist successfully",playlist))
})

const removeVideoFromPlaylist = asyncHandler(async(req,res)=>{
    const {playlistId, videoId }= req.params
    if(!playlistId ||!videoId){
        throw new apiError("Playlist id and video id are required",400)
    }
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {$pull: {videos: videoId}},
        {new: true}
    )
    if(!playlist){
        throw new apiError("Failed to remove video from playlist",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Video removed from playlist successfully",playlist))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const playlistId = req.params.playlistId
    if(!playlistId){
        throw new apiError("Playlist id is required",400)
    }
    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new apiError("Failed to fetch playlist",500)
    }
    return res
   .status(200)
   .json(new ApiResponse(200,"Playlist fetched successfully",playlist))
})

export {
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    getPlaylistById,

}