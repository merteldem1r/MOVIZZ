import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getMediaCast } from "../../features/mediaSlice.js";
import CastCard from "../Cards/CastCard.jsx";
import Loader from "../UI/Loader/Loader.jsx";

const MediaCast = ({ url }) => {
  const { cast, isLoading, error } = useSelector(store => store.media.mediaCast);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMediaCast(url));
  }, [url])

  return (
    <section className="container flex flex-col gap-5 mt-12">
      <h3 className="lg:text-3xl md:text-2xl">Media Cast</h3>

      <div className="flex gap-4 sm:pb-3 overflow-x-scroll scrollSlider">
        {isLoading && <Loader />}
        {cast.map(actor => (
          <CastCard key={actor.cast_id} actor={actor} />
        ))}
      </div>
    </section>
  )
    ;
};

export default MediaCast;