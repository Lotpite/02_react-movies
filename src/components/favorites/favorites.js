import { useState, useEffect } from 'react';
import {Container, Row, Col, Card, Button, Badge} from 'react-bootstrap';
import FilmService from '../../services/FilmService';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';

const Favorites = () => {

    const [films, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);

    // console.log(Object.keys(localStorage))
    const newService = new FilmService();

    const onGenresLoaded = (res) => {
        setGenres(genres => res)
    }

    const getGenresList = () => {
        newService
            .getGenres()
            .then(onGenresLoaded)
    } 

    function removeFavorites (id) { 
        localStorage.removeItem(id)
        
     }

     useEffect(() => {

        getGenresList()
    }, [Object.values(localStorage)])

    function renderFilm (film) {
        const {title, poster_path, id, genre_ids} = film;
        const genre = genre_ids.map(id => {
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
            
                <Col key={id}>
                    
                        <Card bg='light' text='dark' style={{ width: '14rem'}} className="cardList"> 
                        <Link to={`/film/${id}`}> 
                            <Card.Img variant="top" src={poster_path} alt={title}/> 
                        </Link>
                            <Card.Body>
                            <Badge bg="danger" className="favor" onClick={() => removeFavorites(id, film)}>Remove</Badge>
                                {genre}
                            </Card.Body>
                        </Card>
                    
                    
                    <br />
                </Col>
        )
    }

    let list = [];
        Object.values(localStorage).forEach(value => {
        if (value != 'undefined') {
            list.push(renderFilm(JSON.parse(value)))
        }
    })
    
    return (
        <Container className="justify-content-md-center">
            <Row>
                {list}
            </Row>
        </Container>
    )
}

export default Favorites;