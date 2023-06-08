import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";

const MediaCard = ({ media, type }) => {
  const favorites = useSelector(store => store.favorites);
  const url = `/${type || media.media_type}/${media.id}`
  const imageURL = media.poster_path
    ? `https://image.tmdb.org/t/p/original/${media.poster_path}`
    : '/img/no-image.png'

  return (
    <div className="px-2 cursor-grab">
      <Link
        to={`/${type || media.media_type}/${media.id}`}
        className="hover:opacity-[.6] transition"
      >
        <div>
          <img className="w-full rounded-md" src={imageURL} alt="" />
        </div>
      </Link>

      <div className="md:text-md sm:text-sm text-xs py-2">
        <div className="flex items-center gap-1">
          {favorites.find(fav => fav.url === url) &&
            <StarIcon sx={{ fontSize: 25, color: '#ffce3d' }} />
          }
          {media.title || media.name}
        </div>

        <div className="text-xs">
          {media.release_date || media.first_air_date}
        </div>
      </div>

    </div>
  );
};

export default MediaCard;