import React from "react";
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Media from "./pages/Media.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import ErrorElement from "./components/ErrorElement.jsx";
import NotFound from "./pages/NotFound.jsx";
import Catalog from "./pages/Catalog.jsx";
import Favorites from "./pages/Favorites.jsx";
import SearchPage from "./pages/SearchPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="movie" element={<Catalog type="movie" />} />
      <Route
        path="movie/:id"
        element={<Media />}
        errorElement={<ErrorElement type="movie" />}
      />

      <Route path="tv" element={<Catalog type="tv" />} />
      <Route
        path="tv/:id"
        element={<Media />}
        errorElement={<ErrorElement type="tv" />}
      />

      <Route path="favorites" element={<Favorites />} />

      <Route path="search" element={<SearchPage />} />

      <Route path="*" element={<NotFound />}></Route>
    </Route>,
  ),
)

function App() {
  return (
    <div className="page">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default App
