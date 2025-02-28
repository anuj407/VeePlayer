import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch videos
export const fetchUserVideos = createAsyncThunk('videos/fetchUserVideos', async (_id) => { 
  const response = await fetch(`http://localhost:8080/api/v1/videos/getAllVideos/${_id}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result.data; 
});

const UserVideoSlice = createSlice({
  name: 'userVideos',
  initialState: {
    videos: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {}, // No manual reducers needed for fetching
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(fetchUserVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const selectUserVideos = (state)=>state.videos;
export default UserVideoSlice.reducer;
