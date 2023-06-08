import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getMediaDetails } from "../../features/mediaSlice.js";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { saveFavorites } from "../../features/favoritesSlice.js";
import StarIcon from '@mui/icons-material/Star';

const MediaOverview = ({ url }) => {
  const { details, isLoading, error } = useSelector(store => store.media.mediaDetails);
  const favorites = useSelector(store => store.favorites)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMediaDetails(url))
  }, [url]);

  return (
    <section>
      <div className="relative">
        <img
          className="block w-full max-h-[50vh] opacity-70 object-cover"
          src={
            details.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
              : '/img/no-image-big.png'
          }
          alt="backdrop"
        />
        <div className="overlay-film-cover"></div>
      </div>

      <div className="container mb-[-25vh] flex sm:flex-row flex-col gap-7 items-center relative top-[-25vh]">
        <div className="sm:min-w-[200px] max-w-[175px]">
          <img
            className="block w-full rounded-sm"
            src={
              details.poster_path
                ? `https://image.tmdb.org/t/p/original/${details.poster_path}`
                : '/img/no-image.png'
            }
            alt="poster" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">{details.title || details.name}</h2>
          <div>{details.release_date || details.first_air_date}</div>
          <div className="flex flex-wrap gap-3">
            {details.genres && details.genres.map(obj => {
              return (
                <span
                  key={obj.id}
                  className="bg-mainBlue px-4 py-1 rounded-sm md:text-md text-xs"
                >
                  {obj.name}
                </span>
              )
            })}
          </div>
          <div>{details.overview}</div>
          <button
            onClick={() => dispatch(saveFavorites({ url, ...details }))}
            className="flex max-w-[130px] rounded-sm gap-1 justify-center items-center p-2 bg-mainBlue"
          >
            {favorites.find(fav => fav.url === url)
              ? <><StarIcon sx={{ color: '#ffce3d' }} /> <span>Unfavorite</span></>
              : <><StarOutlineIcon sx={{ color: '#ffce3d' }} /> <span>Favorite</span></>
            }
          </button>
        </div>
      </div>
    </section>
  );
};

export default MediaOverview;