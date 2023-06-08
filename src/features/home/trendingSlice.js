import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../../API/fetchFromAPI.js";

const initialState = {
  medias: [],
  timeWindow: 'week',
  mediaType: 'movie',
  isLoading: false,
  error: null,
}

export const getTrendingMedia = createAsyncThunk('trending/getTrendingMedia', async (name, thunkAPI) => {
  try {
    const { timeWindow, mediaType } = thunkAPI.getState().trendingMedia;
    const res = await fetchFromApi(`https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}`, 1);
    return res.data.results;
  } catch (err) {
    return thunkAPI.rejectWithValue('Something went wrong');
  }
})

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    changeTimeWindow: (state, { payload }) => {
      state.timeWindow = payload;
    },
    changeMediaType: (state, { payload }) => {
      state.mediaType = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTrendingMedia.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTrendingMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medias = action.payload;
      })
      .addCase(getTrendingMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
})

export const { changeTimeWindow, changeMediaType } = trendingSlice.actions;
export default trendingSlice.reducer;