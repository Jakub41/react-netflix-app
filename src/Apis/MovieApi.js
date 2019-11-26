import {API_MOVIE_URL, API_KEY} from "./ApisConst";

const createMoviesQuery = urlGenerator => async (...params) => {
  try {
    const url = urlGenerator(...params);
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch {
    return {
      success: false,
      result: [],
      message: "There is an issue to get data from server. Please try again later.",
    };
  }
};

export const getMoviesBySearch = createMoviesQuery(
  search => `${API_MOVIE_URL}?apikey=${API_KEY}&${search}`
);

export const getMoviesInfo = createMoviesQuery(
  movieID => `${API_MOVIE_URL}?apikey=${API_KEY}&i=${movieID}&plot`
);
