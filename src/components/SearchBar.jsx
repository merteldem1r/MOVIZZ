import React, { useEffect, useState } from 'react';
import { fetchSearchMedia } from "../API/fetchFromAPI.js";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search.js";

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      fetchSearchMedia(query, 1)
        .then(res => {
          const media = res.data.results.filter(item => item.media_type !== 'person');
          setQueryResult(media);
        });
    } else setQueryResult([]);
  }, [query])

  useEffect(() => {
    window.addEventListener('click', windowClick);

    return () => {
      window.removeEventListener('click', windowClick)
    }
  }, [])

  const windowClick = () => {
    setIsFocused(false);
  }

  const navigateToSearch = e => {
    if (query && e.key === 'Enter') {
      navigate(`/search?q=${query}`);
      setQuery('');
    }
  }

  return (
    <div
      className="search-box relative flex justify-between border-[#cccccc] border-b-2 lg:w-[350px] md:w-[250px] sm:w-[200px] w-[150px] max-h-[35px]">
        <input
          className="w-[85%] bg-mainBlue focus:outline-none"
          type="text"
          placeholder="search..."
          value={query}
          onClick={e => {
            e.stopPropagation();
            setIsFocused(true);
          }}
          onKeyDown={e => navigateToSearch(e)}
          onInput={e => setQuery(e.target.value)}
        />
        <button onClick={() => query && navigate(`/search?q=${query}`)}>
          <SearchIcon />
        </button>

      {/* search bar */}
      {isFocused && query && (
        <div
          className="absolute max-h-[60vh] flex scrollSlider overflow-y-scroll flex-col top-[105%] w-full bg-mainBlue">
          {queryResult.map(media => (
            <Link
              to={`/${media.media_type}/${media.id}`}
              key={media.id}
              className="flex gap-3 p-4 hover:bg-[#181730] transition-all"
            >
              <div className="basis-2/5 w-[125px] h-[100px]">
                <img
                  className="w-full h-full object-cover"
                  src={
                    media.poster_path
                      ? `https://image.tmdb.org/t/p/original/${media.poster_path}`
                      : '/img/no-image-big.png'
                  }
                  alt="media"
                />
              </div>

              <div className="basis-3/5 overflow-hidden">
                <h5 className="text-md">
                  <p className="truncate ...">
                    {media.title || media.name}
                  </p>
                </h5>

                <div className="text-xs">
                  {media.release_date || media.first_air_date}
                </div>

                <div className="text-sm capitalize">
                  {media.media_type === 'tv' ? 'tv show' : 'movie'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;