import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

export function fetchFromApi(url, page) {
  const options = {
    method: 'GET',
    url: url,
    params: {
      language: 'en-US',
      page: page,
    },
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
    },
  };

  return axios
    .request(options);
}

export function fetchSearchMedia(query, page) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/multi`,
    params: { query, include_adult: 'false', language: 'en-US', page },
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
    },
  }

  return axios
    .request(options);
}

export function fetchMediaDetails(url) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3${url}`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
    },
  };

  return axios
    .request(options);
}

export function fetchSimilarMedia(url, page) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3${url}/similar`,
    params: { language: 'en-US', page: page },
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
    },
  }

  return axios
    .request(options);
}

export function fetchMediaVideos(url) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3${url}/videos`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
    },
  }

  return axios
    .request(options);
}

export function fetchMediaCredits(url) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3${url}/credits`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
    },
  }

  return axios
    .request(options);
}