import { createSlice } from "@reduxjs/toolkit";

export const getLocalStorage = () => {
  const localStorageData = localStorage.getItem('favorites');
  return localStorageData ? JSON.parse(localStorageData) : [];
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: getLocalStorage(),
  reducers: {
    saveFavorites: (state, { payload }) => {
      const existingIndex = state
        .findIndex(fav => fav.url === payload.url);

      if (existingIndex !== -1) {
        state.splice(existingIndex, 1)
      } else {
        state.push(payload);
      }

      localStorage.setItem('favorites', JSON.stringify(state));
    },
    clearFavorite: (state, { payload }) => {
      const newState = state.filter(fav => fav.url !== payload);
      localStorage.setItem('favorites', JSON.stringify(newState));

      return newState;
    },
    clearAllFavorites: () => {
      localStorage.removeItem('favorites');
      return [];
    },
  },
})

export const { saveFavorites, clearFavorite, clearAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;