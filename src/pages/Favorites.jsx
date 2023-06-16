import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Link } from "react-router-dom";
import { clearAllFavorites, clearFavorite } from "../features/favoritesSlice.js";
import MyModal from "../components/UI/MyModal/MyModal.jsx";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Favorites = () => {
  const [isModal, setIsModal] = useState(false);
  const favorites = useSelector(store => store.favorites);
  const dispatch = useDispatch();

  return (
    <section className="flex justify-center container mt-8">
      {/* no favorites */}
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

      {/* favorites */}
      {favorites.length > 0 &&
        <div className="flex flex-col items-center gap-5">
          <h3 className="mb-3 lg:text-3xl md:text-2xl text-xl">Favorite Medias</h3>
          <div className="flex justify-center flex-wrap gap-4">
            {favorites.map(media => (
              <div
                key={media.url}
                className="md:max-w-[175px] max-w-[125px]">
                <Link to={media.url} className="hover:opacity-70 transition-all">
                  <img
                    className="w-full rounded-md"
                    src={media.poster_path
                      ? `https://image.tmdb.org/t/p/original/${media.poster_path}`
                      : '/img/no-image.png'
                    }
                    alt="" />
                  <div>{media.title || media.name}</div>
                </Link>
                <button
                  onClick={() => {
                    dispatch(clearFavorite(media.url))
                  }}
                  className="flex items-center rounded-sm gap-1 bg-mainBlue px-2"
                >
                  <StarHalfIcon sx={{ fontSize: 20 }} />
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              favorites.length >= 3
                ? setIsModal(true)
                : dispatch(clearAllFavorites())
            }
            className="bg-mainBlue my-5 mb-10 px-10 py-2 rounded-sm self-center hover:scale-[1.05] transition-all"
          >
            Delete All
          </button>

          {/* delete favorites modal */}
          <MyModal visible={isModal} setVisible={setIsModal}>
            <div className="flex flex-col gap-4 items-center rounded-sm bg-mainBlue md:p-10 p-5">
              <DeleteForeverIcon sx={{ fontSize: 50 }} />
              <h3>Are you sure to delete all {favorites.length} media?</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsModal(false);
                    dispatch(clearAllFavorites());
                  }}
                  className="bg-[#0f0f1c] px-10 py-2 rounded-sm self-center hover:scale-[1.05] transition-all"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsModal(false)}
                  className="bg-[#0f0f1c] px-10 py-2 rounded-sm self-center hover:scale-[1.05] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </MyModal>
        </div>
      }
    </section>
  );
};

export default Favorites;