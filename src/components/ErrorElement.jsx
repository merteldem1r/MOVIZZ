import React from 'react';
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from "react-router-dom";

const ErrorElement = ({ type }) => {
  const mediaStr = type === 'tv' ? 'TV Show' : 'Movie';

  return (
    <section className="container mt-[10vh]">
      <div className="flex flex-col gap-3 items-center">
        <MovieIcon sx={{ fontSize: '50px' }} />
        <h2 className="text-xl">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Sorry we couldn't find that {mediaStr} details
        </h2>
        <h3 className="text-md mt-[-5px]">Try to find another media, reload page or comeback later</h3>
        <Link
          to="/"
          className="p-2 px-4 bg-mainBlue rounded-sm hover:opacity-70 transition-all"
        >
          Back to home page
        </Link>
      </div>
    </section>
  );
};

export default ErrorElement;