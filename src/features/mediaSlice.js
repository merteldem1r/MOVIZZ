import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMediaCredits, fetchMediaDetails, fetchMediaVideos, fetchSimilarMedia } from "../API/fetchFromAPI.js";

const initialState = {
  mediaDetails: {
    details: [],
    isLoading: false,
    error: null,
  },
  mediaCast: {
    cast: [],
    isLoading: false,
    error: null,
  },
  mediaVideos: {
    videos: [],
    isLoading: false,
    error: null,
  },
  similarMedia: {
    medias: [],
    page: 1,
    totalPages: null,
    isLoading: false,
    error: null,
  },
}

// Media Details
export const getMediaDetails = createAsyncThunk('media/getMediaDetails', async (mediaURL, thunkAPI) => {
  try {
    const res = await fetchMediaDetails(mediaURL);
    return res.data;
  } catch (err) {
    thunkAPI.rejectWithValue('Something went wrong');
  }
});

// Media Cast
export const getMediaCast = createAsyncThunk('media/getMediaCast', async (mediaURL, thunkAPI) => {
  try {
    const res = await fetchMediaCredits(mediaURL);
    return res.data.cast;
  } catch (err) {
    return thunkAPI.rejectWithValue('Something went wrong')
  }
})

// Media Videos
export const getMediaVideos = createAsyncThunk('media/getMediaVideos', async (mediaURL, thunkAPI) => {
  try {
    const res = await fetchMediaVideos(mediaURL);
    return res.data.results;
  } catch (err) {
    return thunkAPI.rejectWithValue('Something went wrong')
  }
})

// Similar Media
export const getSimilarMedia = createAsyncThunk('media/getSimilarMedia', async (mediaURL, thunkAPI) => {
  try {
    const { page } = thunkAPI.getState().media.similarMedia;
    const res = await fetchSimilarMedia(mediaURL, page);
    return res.data;
  } catch (err) {
    thunkAPI.rejectWithValue('Something went wrong');
  }
});

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.similarMedia.page = payload;
    },
    resetMedia: state => {
      state.mediaDetails.details = [];
      state.mediaCast.cast = [];
      state.mediaVideos.videos = [];
      state.similarMedia.medias = [];
    },
  },
  extraReducers: builder => {
    builder
      // Media Details
      .addCase(getMediaDetails.pending, state => {
        state.mediaDetails.isLoading = true;
      })
      .addCase(getMediaDetails.fulfilled, (state, { payload }) => {
        state.mediaDetails.isLoading = false;
        state.mediaDetails.details = payload;
      })
      .addCase(getMediaDetails.rejected, (state, { payload }) => {
        state.mediaDetails.isLoading = false;
        state.mediaDetails.error = payload;
      })

      //Media Cast
      .addCase(getMediaCast.pending, state => {
        state.mediaCast.isLoading = true;
      })
      .addCase(getMediaCast.fulfilled, (state, { payload }) => {
        state.mediaCast.isLoading = false;
        state.mediaCast.cast = payload;
      })
      .addCase(getMediaCast.rejected, (state, { payload }) => {
        state.mediaCast.isLoading = false;
        state.mediaCast.error = payload;
      })

      // Media Videos
      .addCase(getMediaVideos.pending, state => {
        state.mediaVideos.isLoading = true;
      })
      .addCase(getMediaVideos.fulfilled, (state, { payload }) => {
        state.mediaVideos.isLoading = false;
        state.mediaVideos.videos = payload;
      })
      .addCase(getMediaVideos.rejected, (state, { payload }) => {
        state.mediaVideos.isLoading = false;
        state.mediaVideos.error = payload;
      })

      // Similar Media
      .addCase(getSimilarMedia.pending, state => {
        state.similarMedia.isLoading = true;
      })
      .addCase(getSimilarMedia.fulfilled, (state, { payload }) => {
        state.similarMedia.isLoading = false;
        state.similarMedia.medias = payload.results;
        state.similarMedia.totalPages = payload.total_pages;
      })
      .addCase(getSimilarMedia.rejected, (state, { payload }) => {
        state.similarMedia.isLoading = false;
        state.similarMedia.error = payload;
      })
  },
})

export const { changePage, resetMedia } = mediaSlice.actions;
export default mediaSlice.reducer;