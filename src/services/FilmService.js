const api = '052a7bfc73ba8f24b52cbf7c006da253';

class FilmService {

    // function template to get resource from db
    getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    }

    getAllFilms = () => {
        return this.getResource('https://api.themoviedb.org/3/movie/550?api_key=052a7bfc73ba8f24b52cbf7c006da253'); //Request to DB
    }

    getPopular = () => {
        return this.getResource('https://api.themoviedb.org/3/movie/popular?api_key=052a7bfc73ba8f24b52cbf7c006da253&language=en-US&page=1'); // required page number
    }

    getGenres = () => {
        return this.getResource('https://api.themoviedb.org/3/genre/movie/list?api_key=052a7bfc73ba8f24b52cbf7c006da253&language=en-US');
    }

    getDescription = () => {
        return this.getResource(`https://api.themoviedb.org/3/movie/{movie_id}?api_key=052a7bfc73ba8f24b52cbf7c006da253&language=en-US`); // required move_id
    }
}

export default FilmService;