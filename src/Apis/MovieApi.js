export const getMoviesBySearch = async (search) => {
    try {
        const uri = `http://www.omdbapi.com/?apikey=1c57d0e2&${search}`;
        const repsonse = await fetch(uri);
        const json = await repsonse.json();
        return json;
    } catch {
        return {
            success: false,
            result: [],
            message: 'There is an issue to get data from server. Please try again later.',
        };
    }
}