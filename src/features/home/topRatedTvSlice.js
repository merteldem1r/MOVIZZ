import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../../API/fetchFromAPI.js";

const initialState = {
  medias: [],
  page: 1,
  totalPages: null,
  isLoading: false,
  error: null,
}

export const getTopRatedTv = createAsyncThunk('topRatedTv/getTopRatedTv', async (name, thunkAPI) => {
  try {
    const { page } = thunkAPI.getState().topRatedTv;
    const res = await fetchFromApi('https://api.themoviedb.org/3/tv/top_rated', page);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Something went wrong');
  }
})

const topRatedTvSlice = createSlice({
  name: 'topRatedTv',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTopRatedTv.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTopRatedTv.fulfilled, (state, { payload }) => {
        state.medias = payload.results;
        state.totalPages = payload.total_pages;
        state.isLoading = false;
      })
      .addCase(getTopRatedTv.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
  },
})

export const { changePage } = topRatedTvSlice.actions;
export default topRatedTvSlice.reducer;