import {API_MOVIE_URL, API_KEY} from './ApisConst'

export const getMoviesBySearch = async (search) => {
    try {
        const url = `${API_MOVIE_URL}?apikey=${API_KEY}&${search}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch {
        return {
            success: false,
            result: [],
            message: 'There is an issue to get data from server. Please try again later.',
        };
    }
}

export const getMoviesInfo = async (movieID = `tt2732442`) => {
    try {
        const url = `${API_MOVIE_URL}?apikey=${API_KEY}&i=${movieID}&plot`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch {
        return {
            success: false,
            result: [],
            message: 'There is an issue to get data from server. Please try again later.',
        };
    }
}

getMoviesInfo()
