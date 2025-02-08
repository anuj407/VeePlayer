import {configureStore} from "@reduxjs/toolkit"
import VideoReducer from "./Reducers/VideoSlice"
import UserReducer from "./Reducers/UserSlice"
export const store = configureStore({
   
    reducer: {
        videos: VideoReducer,
        user: UserReducer
    },
})
