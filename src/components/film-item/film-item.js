import { Component } from 'react';
import {Card, Button, Badge} from 'react-bootstrap';
import poster from '../../img/template.jpg';
import FilmService from '../../services/FilmService';

// required variables = img, title, genre, description, link for button to openv

class Film extends Component {
    constructor(props) {
        super(props);
        this.updateFilm();
    }

    state = {
        film: {
            title: null,
            genres: null,
            description: null,
            poster_path: null,
            backdrop_path: null
        }
    }

    filmService = new FilmService();

    onFilmLoaded = (film) => {
        this.setState({film})
    }

    updateFilm = (id = 62) => {
        this.filmService
        .getFilmByID(id)
        .then(this.onFilmLoaded) 
    }

    
    render() {
         const {film: {title, description, genres, poster_path, backdrop_path}} = this.state;
        //  const poster_path1 = 'https://image.tmdb.org/t/p/w500' + poster_path
         if (genres != null) {
             var elements = genres.map((item) => {
                 return (
                     <Badge bg="light" text="dark">
                         {item}
                     </Badge>
                 )
             })
         }

        return (
            <>
                <Card bg='light' text='dark' style={{ width: '20rem'}}>
                    <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500' + poster_path} alt="img"/>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Badge bg="light" text="dark">
                            {elements}
                        </Badge>
                        <Card.Text>
                            {description}
                        </Card.Text>
                        <Button variant="outline-dark">Go somewhere</Button>
                    </Card.Body>
                </Card>
                <br />
            </>
        )
    }
}

export default Film;