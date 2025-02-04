import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch videos
export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
  const response = await fetch("http://localhost:8080/api/v1/videos/home");
  const result = await response.json();
  return result.data; // Assuming response contains { data: [...] }
});

const VideoSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {}, // No manual reducers needed for fetching
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default VideoSlice.reducer;
