import { Component } from 'react';
import {Container, Row, Col, Card, Badge} from 'react-bootstrap';
import FilmService from '../../services/FilmService';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import './film-item.css'

// required variables = img, title, genre, description, link for button to openv

class Film extends Component {
    

    state = {
        film: {},
        related: [],
        genres: []
    }

    filmService = new FilmService();

    onFilmLoaded = (film) => {
        this.setState({film})
    }

    onRelatedLoaded = (related) => {
        this.setState({related})
    }

    componentDidMount () {
        const {match: {params: {id}}} = this.props; // get id from filmlist (through router)
        this.onChange(id)
    }

    onChange = (id) => {
        this.filmService
        .getFilmByID(id)
        .then(this.onFilmLoaded) 
        this.getRelated(id)
        this.getGenresList()
    }

    getRelated = (id) => {
        this.filmService
            .getRelated(id)
            .then(this.onRelatedLoaded)
    }

    onGenresLoaded = (genres) => {
        this.setState({genres})
    }

    getGenresList = () => {
        this.filmService
        .getGenres()
        .then(this.onGenresLoaded)
    } 

    renderFilms(arr) {
        // change img path
        const items = arr.map((item, i) => {

            // create badge for each id
            const genre = item.genre_ids.map(id => {
                // overwrite id as genre
                this.state.genres.forEach((gen) => {
                    if (id === gen.id) {
                        id = gen.name
                    }
                })
                return (
                    <Badge bg="light" text="dark" key={id}> 
                        {id}
                    </Badge>
                )
            })

            return (
                <Col key={item.id}>
                    <Link to={`/film/${item.id}`}>
                        <Card bg='light' text='dark' style={{ width: '14rem'}} className="cardList" onClick={() => this.onChange(item.id)}> 
                            <Card.Img variant="top" src={item.poster_path} alt={item.title}/>
                            <Card.Body>
                                {genre}
                            </Card.Body>
                        </Card>
                    </Link>
                    <br />
                </Col>
            )
        });

        return (
            <Row>
                {items}
            </Row>
        )
    }

    
    render() {
        // console.log(this.state)
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

        let items = [];
        if (this.state.related!== 0 && this.state.genres.length !== 0) {
            const list = this.state.related
            this.renderFilms(list);
            items = this.renderFilms(list)
        }


        return (
        <>
        <h2>{title}</h2>
        <div className='some'>
        
        <img src={'https://image.tmdb.org/t/p/w500' + poster_path} alt="hello"></img>
        <Badge>{this.genres}</Badge>
        <p>{description}</p>
        </div> 
        <Container className="justify-content-md-center" >
            <h2>Recommended Films</h2>
                    {items}
            </Container>

        </>
        )
    }
}

export default withRouter(Film);