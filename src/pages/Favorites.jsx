import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import MediaCard from "../components/Cards/MediaCard.jsx";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Link } from "react-router-dom";
import { clearAllFavorites } from "../features/favoritesSlice.js";

const Favorites = () => {
  const favorites = useSelector(store => store.favorites);
  const dispatch = useDispatch();

  return (
    <section className="flex justify-center container mt-8">
      {favorites.length === 0 &&
        <div className="flex flex-col gap-3 items-center mt-[15vh]">
          <StarHalfIcon sx={{ fontSize: 50 }} />
          <h3 className="text-xl">No favorite medias in your list</h3>
          <div className="flex gap-3">
            <Link
              to="/movie"
              className="px-4 py-2 bg-mainBlue rounded-sm hover:scale-[1.05] transition-all"
            >
              Movies
            </Link>
            <Link
              to="/tv"
              className="px-4 py-2 bg-mainBlue rounded-sm hover:scale-[1.05] transition-all"
            >
              Tv Shows
            </Link>
          </div>
        </div>
      }
      {favorites.length > 0 &&
        <div className="flex flex-col items-center gap-5">
          <h3 className="mb-3 lg:text-3xl md:text-2xl text-xl">Favorite Medias</h3>
          <div className="flex justify-center flex-wrap gap-3">
            {favorites.map(media => (
              <div key={media.url} className="md:max-w-[200px] max-w-[125px]">
                <MediaCard
                  type={media.url.match(/(?<=\/)\w+(?=\/)/g)[0]}
                  media={media}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => dispatch(clearAllFavorites())}
            className="bg-mainBlue my-5 mb-10 px-10 py-2 rounded-sm self-center hover:scale-[1.05] transition-all"
          >
            Clear All
          </button>
        </div>
      }
    </section>
  );
};

export default Favorites;