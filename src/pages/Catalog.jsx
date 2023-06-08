import React, { useEffect, useRef, useState } from 'react';
import { fetchFromApi } from "../API/fetchFromAPI.js";
import MediaCard from "../components/Cards/MediaCard.jsx";
import Loader from "../components/UI/Loader/Loader.jsx";
import { useLocation } from "react-router-dom";

const Catalog = ({ type }) => {
  const [medias, setMedias] = useState([]);
  const page = useRef(1);
  const totalPage = useRef(1);
  const loading = useRef(false)
  const location = useLocation();

  useEffect(() => {
    setMedias([]);
    page.current = 1;
    fetchMedia();
  }, [location])

  useEffect(() => {
    window.addEventListener('scroll', windowScroll);

    return () => {
      window.removeEventListener('scroll', windowScroll);
    }
  }, [])

  async function fetchMedia() {
    try {
      loading.current = true;
      const { data } = await fetchFromApi(`https://api.themoviedb.org/3/${type}/top_rated`, page.current);
      totalPage.current = data.total_pages;
      setMedias(prev => [...prev, ...data.results]);
    } catch (err) {
      console.log(err)
    } finally {
      loading.current = false;
    }
  }

  function windowScroll() {
    if (loading.current) return;

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      if (page.current <= totalPage.current) {
        page.current++;
        fetchMedia();
      }
    }
  }

  return (
    <section className="container flex flex-col gap-5 my-8">
      <h3 className="lg:text-3xl md:text-2xl text-xl">
        {type === 'tv' ? 'Tv Shows' : 'Movies'}
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {medias.map(media => (
          <div key={media.id} className="md:max-w-[200px] max-w-[150px]">
            <MediaCard media={media} type={type} />
          </div>
        ))}
      </div>
      {loading.current && <Loader />}
    </section>
  );
};

export default Catalog;