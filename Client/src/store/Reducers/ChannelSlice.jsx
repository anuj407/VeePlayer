import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiUrl } from "../../utils/constants"

export const fetchProfile = createAsyncThunk('channel/fetchProfile', async(username)=>{
   try {
     const response = await fetch(`${apiUrl}/users/channel/${username}`)
     if(!response.ok) throw new Error('Failed to fetch profile')
     const data = await response.json()
     return data;
   } catch (error) {
     return (error.message)
   }
})
const initialState ={
    fullName:null,
    email:null,
    avatar:null,
    coverImage:null,        
    subscribersCount:null,
    subscribedToCount:null,
    isSubscribed:false,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
}

const ChannelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannelData: (state, action) => {
           state.fullName = action.payload.fullName,
           state.email = action.payload.email,
           state.avatar = action.payload.avatar,
           state.coverImage = action.payload.coverImage,        
           state.subscribersCount = action.payload.subscribersCount,
           state.subscribedToCount = action.payload.subscribedToCount,
           state.isSubscribed = action.payload.isSubscribed
        },       
    },
    extraReducers: (builder)=>{
        builder
       .addCase(fetchProfile.pending, (state) => {
        state.status= "Loading"
       })
       .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status= "succeeded"
        state.setChannelData(action.payload)
       })
       .addCase(fetchProfile.rejected, (state, action) => {
        state.status= "failed"
        state.error= action.error.message
       })
    }
})
export const {setChannelData}= ChannelSlice.actions;
export const getChannel = (state)=>state.channel
export default ChannelSlice.actions