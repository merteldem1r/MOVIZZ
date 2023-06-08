import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import MediaOverview from "../components/Media/MediaOverview.jsx";
import MediaSimilar from "../components/Media/MediaSimilar.jsx";
import MediaCast from "../components/Media/MediaCast.jsx";
import MediaVideos from "../components/Media/MediaVideos.jsx";
import { useDispatch } from "react-redux";
import { resetMedia } from "../features/mediaSlice.js";

const Media = () => {
  const { pathname: mediaURL } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const scrollToTop = () => {
      if (window.scrollY > 0) {
        window.scrollTo(0, window.scrollY - 25);
        window.requestAnimationFrame(scrollToTop);
      }
    };

    window.requestAnimationFrame(scrollToTop);

    return () => {
      dispatch(resetMedia());
    }
  }, [mediaURL]);

  return (
    <main>
      <MediaOverview url={mediaURL} />
      <MediaCast url={mediaURL} />
      <MediaVideos url={mediaURL} />
      <MediaSimilar url={mediaURL} />
    </main>
  );
};

export default Media;