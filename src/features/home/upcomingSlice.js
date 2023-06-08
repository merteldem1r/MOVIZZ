import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../../API/fetchFromAPI.js";

const initialState = {
  medias: [],
  page: 1,
  totalPages: null,
  isLoading: false,
  error: null,
}

export const getUpcomingMovies = createAsyncThunk('upcomingMovies/getUpcomingMovies', async (name, thunkAPI) => {
  try {
    const { page } = thunkAPI.getState().upcomingMovies;
    const res = await fetchFromApi('https://api.themoviedb.org/3/movie/upcoming', page);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Something went wrong');
  }
})

const upcomingSlice = createSlice({
  name: 'upcomingMovies',
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUpcomingMovies.pending, state => {
        state.isLoading = true
      })
      .addCase(getUpcomingMovies.fulfilled, (state, { payload }) => {
        state.medias = payload.results;
        state.totalPages = payload.total_pages;
        state.isLoading = false;
      })
      .addCase(getUpcomingMovies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
  },
})


export const { changePage } = upcomingSlice.actions;
export default upcomingSlice.reducer;