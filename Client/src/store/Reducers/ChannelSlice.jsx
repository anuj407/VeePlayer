import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiUrl } from "../../utils/constants"

export const fetchProfile = createAsyncThunk(
    "channel/fetchProfile",
    async ({ username, userId }, { rejectWithValue }) => {
      try {
        const url = userId
          ? `${apiUrl}/users/channel/${username}?userId=${userId}`
          : `${apiUrl}/users/channel/${username}`;
  
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) throw new Error("Failed to fetch profile");
        
        const result = await response.json();
        return result.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

const initialState = {
    fullName: null,
    email: null,
    username: null,
    avatar: null,
    coverImage: null,        
    subscribersCount: null,
    subscribedToCount: null,
    isSubscribed: false,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
}

const ChannelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannelData: (state, action) => {
           state.fullName = action.payload.fullName;
           state.email = action.payload.email;
           state.username = action.payload.username;
           state.avatar = action.payload.avatar;
           state.coverImage = action.payload.coverImage;        
           state.subscribersCount = action.payload.subscribersCount;
           state.subscribedToCount = action.payload.subscribedToCount;
           state.isSubscribed = action.payload.isSubscribed;
        },       
    },
    extraReducers: (builder) => {
        builder
       .addCase(fetchProfile.pending, (state) => {
           state.status = "loading";
       })
       .addCase(fetchProfile.fulfilled, (state, action) => {
           state.status = "succeeded";
           Object.assign(state, action.payload); // Properly updating state
       })
       .addCase(fetchProfile.rejected, (state, action) => {
           state.status = "failed";
           state.error = action.payload; // Using rejectWithValue payload
       });
    }
})

export const { setChannelData } = ChannelSlice.actions;
export const getChannel = (state) => state.channel;
export default ChannelSlice.reducer; // Correctly exporting the reducer
