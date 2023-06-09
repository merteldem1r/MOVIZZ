import React from 'react';
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 6,
  slidesToScroll: 5,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 3500,
  cssEase: "ease",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 4,
        infinite: true,
        dots: false,
      },
    },

    {
      breakpoint: 940,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },

    {
      breakpoint: 680,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
  ],
}

const MediaSlider = props => {

  return (
    <Slider {...settings}>
      {props.children}
    </Slider>
  );
};

export default MediaSlider;