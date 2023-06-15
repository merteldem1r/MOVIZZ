import React from 'react';
import { Link } from "react-router-dom";

const IntroCard = ({ media }) => {
  const imageURL = `https://image.tmdb.org/t/p/original/${media.backdrop_path}`

  const mediaOverview = media.overview.length > 175
    ? media.overview.slice(0, 175) + "..."
    : media.overview;

  return (
    <div className="relative max-h-[60vh] cursor-grab">
      <div className="">
        <div className="overlay-film-cover"></div>
        <img className="block w-full min-h-[27vh] object-cover" src={imageURL} alt="" />
      </div>
      <div
        className="flex flex-col items-start sm:gap-3 gap-1 absolute max-w-[500px] top-[50%] left-[3vw] translate-y-[-50%]">
        <h1 className="font-bold lg:text-3xl md:text-2xl sm:text-lg text-md">{media.title}</h1>
        <div className="md:text-md sm:text-sm text-xs">{mediaOverview}</div>
        <Link
          to={`movie/${media.id}`}
          className="md:text-md sm:text-sm text-xs font-medium hover:scale-[1.05] transition-all md:px-7 px-4 py-2 bg-mainBlue rounded-sm"
        >
          ▶ Details
        </Link>
      </div>
    </div>
  );
};

export default IntroCard;