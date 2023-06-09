import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { fetchSearchMedia } from "../API/fetchFromAPI.js";
import MediaCard from "../components/Cards/MediaCard.jsx";
import MovieIcon from '@mui/icons-material/Movie';

const SearchPage = () => {
  const params = useSearchParams();
  const keyword = params[0].get('q');
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    fetchSearchMedia(keyword, 1)
      .then(res => {
        const filtered = res.data.results
          .filter(item => item.media_type !== 'person');
        setMedias(filtered);
      })
  }, [keyword])

  return (
    <section className="container flex flex-col gap-5 my-8">
      <h3 className="lg:text-3xl md:text-2xl text-xl">Search results for: {keyword}</h3>

      <div className="flex flex-wrap justify-center gap-2">
        {medias.length === 0 && (
          <div className="flex flex-col items-center gap-3 mt-[10vh]">
            <MovieIcon sx={{ fontSize: '40px' }} />
            <div>Sorry we didn't find any media</div>
          </div>
        )}

        {medias.map(media => (
          <div key={media.id} className="md:max-w-[200px] max-w-[150px]">
            <MediaCard media={media} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchPage;