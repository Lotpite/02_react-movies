import { Component } from 'react';
import {Card, Button, Badge} from 'react-bootstrap';
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
            poster_path: null
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
         const {film: {title, description, genres, poster_path}} = this.state;
         if (genres != null) {
              this.genres = genres.map((item) => {
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
                            {this.genres}
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