import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MediaCard from "../Cards/MediaCard.jsx";
import { changeMediaType, changeTimeWindow, getTrendingMedia } from "../../features/home/trendingSlice.js";
import MediaSlider from "../UI/Slider/MediaSlider.jsx";
import Loader from "../UI/Loader/Loader.jsx";

const TrendingMedia = () => {
  const dispatch = useDispatch();
  const { medias, timeWindow, mediaType, isLoading, error } = useSelector(store => store.trendingMedia);

  useEffect(() => {
    dispatch(getTrendingMedia('Hello world'));
  }, [timeWindow, mediaType])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <section className="container flex flex-col gap-5 mt-8">
      <div className="flex justify-between items-center">
        <h3 className="lg:text-3xl md:text-2xl text-l">Trending Media</h3>

        <div className="flex gap-2">
          {/* mediaSlice.js type */}
          <select
            name="mediaType"
            className="md:px-6 px-3 p-1 md:text-md text-sm text-white bg-mainBlue cursor-pointer"
            value={mediaType}
            onChange={e => dispatch(changeMediaType(e.target.value))}
          >
            <option value="movie">movie</option>
            <option value="tv">tv</option>
          </select>

          {/* time window */}
          <select
            name="timeWindow"
            className="md:px-6 px-3 p-1 md:text-md text-sm text-white bg-mainBlue cursor-pointer"
            value={timeWindow}
            onChange={() => dispatch(changeTimeWindow(
              timeWindow === 'week' ? 'day' : 'week',
            ))}
          >
            <option value="week">week</option>
            <option value="day">day</option>
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
                <MediaCard key={media.id} media={media} />
              )
            })}
          </MediaSlider>
        }
      </div>
    </section>
  );
};

export default TrendingMedia;