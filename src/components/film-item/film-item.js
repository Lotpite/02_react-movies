import { Component } from 'react';
import {Card, Button, Badge} from 'react-bootstrap';
import FilmService from '../../services/FilmService';
import { withRouter } from 'react-router';
import './film-item.css'

// required variables = img, title, genre, description, link for button to openv

class Film extends Component {
    constructor(props) {
        super(props);
        this.updateFilm();
    }

    state = {
        film: {
            
        }
    }

    filmService = new FilmService();

    onFilmLoaded = (film) => {
        this.setState({film})
    }

    updateFilm = () => {
        const {match: {params: {id}}} = this.props;
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
        <h2>{title}</h2>
        <div class='card-body'>
        
        <img src={'https://image.tmdb.org/t/p/w500' + poster_path} alt="hello"></img>
        <p>{description}</p>
        </div>
                {/* <Card bg='light' text='dark' style={{ width: '10rem'}} className='card-body'>
                    <Card.Img align="left" variant="top" src={'https://image.tmdb.org/t/p/w500' + poster_path} alt={title}/>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Badge bg="light" text="dark">
                            {this.props.id}
                        </Badge>
                        <Card.Text>
                            {description}
                        </Card.Text>
                        <Button variant="outline-dark">Go somewhere</Button>
                    </Card.Body>
                </Card>
                <br /> */}
        </>
        )
    }
}

export default withRouter(Film);