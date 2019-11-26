import {API_MOVIE_URL, API_KEY} from "./ApisConst";

export const getMoviesBySearch = async search => {
  try {
    const url = `${API_MOVIE_URL}?apikey=${API_KEY}&${search}`;
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

export const getMoviesInfo = async movieID => {
  try {
    const url = `${API_MOVIE_URL}?apikey=${API_KEY}&i=${movieID}&plot`;
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

// const fetchAPI = async ({type, query}) => {
//   const queryParams = {
//     byString: `&${query}`,
//     byMovieId: `&i=${query}&plot`,
//   };

//   const endpoint = `${API_MOVIE_URL}?apikey=${API_KEY}${queryParams[type]}`;
//   console.log("fetching", endpoint);

//   return fetch(endpoint)
//     .then(res => res)
//     .catch(() => ({
//       success: false,
//       result: [],
//       message: "There is an issue to get data from server. Please try again later.",
//     }));
// };

// export const getMoviesBySearch = async search =>
//   await fetchAPI({type: "byString", query: search});

// export const getMoviesInfo = async movieID =>
//   await fetchAPI({type: "byMovieId", query: movieID});
