import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from "./features/home/trendingSlice.js";
import introReducer from "./features/home/introSlice.js";
import upcomingReducer from "./features/home/upcomingSlice.js";
import topRatedTvReducer from "./features/home/topRatedTvSlice.js";
import mediaReducer from "./features/mediaSlice.js";
import favoritesReducer from "./features/favoritesSlice.js";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    intro: introReducer,
    trendingMedia: trendingReducer,
    upcomingMovies: upcomingReducer,
    topRatedTv: topRatedTvReducer,
    media: mediaReducer,
  },
})