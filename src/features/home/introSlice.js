import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../../API/fetchFromAPI.js";

const initialState = {
  medias: [],
  page: 1,
  isLoading: false,
  error: null,
}

export const getIntroMedia = createAsyncThunk('intro/getIntroMedia', async (name, thunkAPI) => {
  try {
    const res = await fetchFromApi('https://api.themoviedb.org/3/movie/now_playing', 1)
    return res.data.results;
  } catch (err) {
    return thunkAPI.rejectWithValue('Something went wrong');
  }
})

const introSlice = createSlice({
  name: 'intro',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getIntroMedia.pending, state => {
        state.isLoading = true;
      })
      .addCase(getIntroMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medias = action.payload;
      })
      .addCase(getIntroMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
})

export default introSlice.reducer;