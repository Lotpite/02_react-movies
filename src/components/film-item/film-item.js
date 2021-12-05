import { useState, useEffect } from 'react';
import {Container, Row, Col, Card, Badge} from 'react-bootstrap';
import FilmService from '../../services/FilmService';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import './film-item.css'

// required variables = img, title, genre, description, link for button to openv

const Film = (props) => {

    const [movie, setMovie] = useState({});
    const [related, setRelated] = useState([]);
    const [genres, setGenres] = useState([]);

    const filmService = new FilmService();

    const onFilmLoaded = (res) => {
        setMovie(movie => res)
    }

    const onRelatedLoaded = (res) => {
        setRelated(related => res)
    }

    useEffect (() => { 
            onChange()
        },[props.id, movie]) //watching for id

    const onChange = () => {
        const {match: {params: {id}}} = props; // get id from filmlist (through router)
        if (!id) {
            return
        }
        filmService
        .getFilmByID(id)
        .then(onFilmLoaded) 
        getRelatedFilms(id)
        getGenresList()
    }

    const getRelatedFilms = (id) => {
            filmService
            .getRelated(id)
            .then(onRelatedLoaded)
    }

    const onGenresLoaded = (res) => {
        setGenres(genres => res)
    }

    const getGenresList = () => {
        filmService
        .getGenres()
        .then(onGenresLoaded)
    } 

    function addToFavorites (id, item) { 
        localStorage.setItem(id, JSON.stringify(item))
     }


    function renderFilms(arr) {
        // change img path
        const items = arr.map((item, i) => {

            // create badge for each id
            const genre = item.genre_ids.map(id => {
                // overwrite id as genre
                genres.forEach((gen) => {
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
                    
                        <Card bg='light' text='dark' style={{ width: '14rem'}} className="cardList" onClick={() => onChange(item.id)}> 
                        <Link to={`/film/${item.id}`}>
                            <Card.Img variant="top" src={item.poster_path} alt={item.title}/>
                        </Link>
                            <Card.Body>
                            <Badge bg="danger" className="favor" onClick={() => addToFavorites(item.id, item)}>Like</Badge>
                                {genre}
                            </Card.Body>
                        </Card>
                    
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

    const {title, description, poster_path} = movie;

    let items = renderFilms(related);

    return (
        <>        
            <Container className="justify-content-md-center">
                <Col>
                    <h3>{title}</h3>
                    <div className="some">
                        <Card bg='light' text='dark' style={{ width: '14rem'}} className="cardList"> 
                            <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500' + poster_path} alt={title}/>
                        </Card>
                        <p>{description}</p>
                    </div>            
                    <br/><br/>
                </Col>
            </Container>

            <Container className="justify-content-md-center" >
                <h2>Recommended Films</h2>
                {items}
            </Container>
        </>
    )
}

export default withRouter(Film);