import { createSlice } from "@reduxjs/toolkit";

const LikedVideos = createSlice({
    name: "likedVideos",
    initialState: {
        likedVideos: [],
    },
    reducers: {
        addLikedVideo: (state, action) => {
            state.likedVideos.push(action.payload);
        },
        removeLikedVideo: (state, action) => {
            state.likedVideos = state.likedVideos.filter(
                (video) => video.id !== action.payload.id
            );
        },
    },
})
export const { addLikedVideo, removeLikedVideo } = LikedVideos.actions;
export const selectLikedVideos = (state) => state.likedVideos.likedVideos;
export default LikedVideos.reducer;