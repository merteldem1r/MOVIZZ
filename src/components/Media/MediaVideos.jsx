import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getMediaVideos } from "../../features/mediaSlice.js";
import ReactPlayer from "react-player/youtube";
import Loader from "../UI/Loader/Loader.jsx";

const MediaVideos = ({ url }) => {
  const { videos, isLoading, error } = useSelector(store => store.media.mediaVideos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMediaVideos(url));
  }, [url]);

  return (
    <section className="container flex flex-col gap-5 mt-12">
      <h3 className="lg:text-3xl md:text-2xl">Videos</h3>
      <div className="flex overflow-x-scroll gap-5 pb-3 scrollSlider">
        {isLoading && <Loader />}

        {videos.slice(0, 11).map(video => {
          return (
            <ReactPlayer
              key={video.key}
              url={`https://www.youtube.com/watch?v=${video.key}`}
              className="react-player md:min-w-[575px] sm:min-w-[325px] min-w-[300px] max-h-[175px] sm:max-h-[200px] md:max-h-[350px]"
              controls
            />
          )
        })}

      </div>
    </section>
  );
};

export default MediaVideos;