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

    // getFilmByID = (id = 62) => {
    //     return this.getResource(`https://api.themoviedb.org/3/movie/${id}?api_key=052a7bfc73ba8f24b52cbf7c006da253`); //Request to DB
    // }

    getFilmByID = async (id = 62) => {
        const res = await this.getResource(`https://api.themoviedb.org/3/movie/${id}?api_key=052a7bfc73ba8f24b52cbf7c006da253`); //Request to DBі
        return this._transcriptFilm(res);
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

    _transcriptFilm(film) {
        // const genres = film.genres.map(genre => genre.name)
        // console.log(genres);
        return {
            title: film.original_title,
            genres: film.genres.map(genre => genre.name),
            description: film.overview,
            poster_path: film.poster_path,
            backdrop_path: film.backdrop_path
        }
        // console.log(film)
        // return {
        //     title: film.original_title,
        //     genres: film.genres,
        //     description: film.overview,
        //     poster_path: film.poster_path,
        //     backdrop_path: film.backdrop_path
        // }
    }   
}

export default FilmService;