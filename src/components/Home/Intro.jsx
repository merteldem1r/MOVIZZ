import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getIntroMedia } from "../../features/home/introSlice.js";
import IntroCard from "../Cards/IntroCard.jsx";
import Slider from "react-slick";
import Loader from "../UI/Loader/Loader.jsx";

const Intro = () => {
  const { medias, isLoading, error } = useSelector(homeStore => homeStore.intro);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIntroMedia());
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
  };

  return (
    <section className="container">
      <div className="px-5">
        <Slider {...settings}>
          {isLoading && <Loader />}
          {medias.map(media => {
            return (
              <IntroCard key={media.id} media={media} />
            )
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Intro;