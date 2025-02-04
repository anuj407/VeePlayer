import {configureStore} from "@reduxjs/toolkit"
import VideoReducer from "./Reducers/VideoSlice"
export const store = configureStore({
   
    reducer: {
        videos: VideoReducer,
    },
})
