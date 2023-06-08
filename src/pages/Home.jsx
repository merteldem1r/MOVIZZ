import React from 'react';
import TrendingMedia from "../components/Home/TrendingMedia.jsx";
import Intro from "../components/Home/Intro.jsx";
import UpcomingMovies from "../components/Home/UpcomingMovies.jsx";
import TopRatedTv from "../components/Home/TopRatedTv.jsx";

const Home = () => {
  return (
    <>
      <Intro />
      <TrendingMedia />
      <UpcomingMovies />
      <TopRatedTv />
    </>
  );
};

export default Home;