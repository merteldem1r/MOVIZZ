import React, { useEffect } from 'react';
import MediaSlider from "../UI/Slider/MediaSlider.jsx";
import MediaCard from "../Cards/MediaCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getUpcomingMovies } from "../../features/home/upcomingSlice.js";
import { pageGenerate } from "../../utils/pageGenerate.js";
import Loader from "../UI/Loader/Loader.jsx";

const UpcomingMovies = () => {
  const { medias, page, totalPages, isLoading, error } = useSelector(store => store.upcomingMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUpcomingMovies())
  }, [page])

  return (
    <section className="container flex flex-col gap-5 mt-8">
      <div className="flex justify-between items-center">
        <h3 className="lg:text-3xl md:text-2xl text-l">Upcoming Movies</h3>

        <div className="flex items-center gap-2">
          {/* page */}
          <label htmlFor="mediaType">page</label>
          <select
            name="mediaType"
            className="md:p-2 p-1 md:text-md text-sm text-white bg-mainBlue cursor-pointer"
            value={page}
            onChange={(e) => dispatch(changePage(e.target.value))}
          >
            {pageGenerate(totalPages).map(page => (
              <option key={page} value={page}>{page}</option>
            ))}
          </select>
        </div>
      </div>

      {/* mediaSlice.js */}
      <div className="px-5">
        {isLoading
          ? <Loader />
          : <MediaSlider>
            {medias.map(media => {
              return (
                <MediaCard key={media.id} media={media} type="movie" />
              )
            })}
          </MediaSlider>
        }
      </div>
    </section>
  );
};

export default UpcomingMovies;