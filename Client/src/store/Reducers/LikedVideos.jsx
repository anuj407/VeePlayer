import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../utils/constants";

export const getLikedVideos = createAsyncThunk(
    'likedVideos/getLikedVideos',
     async()=>{
        try{
            const response = await fetch(`${apiUrl}/likes/liked-videos`, {
                method:"GET",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const result = await response.json()
            return result.data 
        }
        catch(error){
            console.log(error)
        }
     }

)

const LikedVideos = createSlice({
    name: "likedVideos",
    initialState: {
        likedVideos: [],
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(getLikedVideos.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(getLikedVideos.fulfilled,(state,action)=>{
            state.status = "succeeded",
            state.likedVideos = action.payload
        })
        .addCase(getLikedVideos.rejected,(state,action)=>{
            state.status = "failed",
            state.error = action.error.message
        })

    }
})
export const selectLikedVideos = (state) => state.likedVideos.likedVideos;
export default LikedVideos.reducer;