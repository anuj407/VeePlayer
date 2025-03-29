import {configureStore} from "@reduxjs/toolkit"
import VideoReducer from "./Reducers/VideoSlice"
import UserReducer from "./Reducers/UserSlice"
import ChannelReducer from "./Reducers/ChannelSlice"
import UserVideosReducer from "./Reducers/UserVideoSlice"
import LikedVieos from "./Reducers/LikedVideos"
export const store = configureStore({
   
    reducer: {
        videos: VideoReducer,
        user: UserReducer,
        channel: ChannelReducer,
        userVideos:UserVideosReducer,
        likedVideos:LikedVieos
    },
})
