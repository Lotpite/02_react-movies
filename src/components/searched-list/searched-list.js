import FilmService from '../../services/FilmService';
import {Container, Row, Col, Card, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

const Searched = (props) => {

    const [films, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);
    
    const newService = new FilmService();

    useEffect(() => {
        
        renderSearched();
        
    }, [films]) // atention

        const renderSearched = () => {
            const {match: {params: {query}}} = props;
            getGenresList()
            getFilmsList(query)
            console.log(films)
        }
    
    const onGenresLoaded = (res) => { //(res) is required to send params to function
        setGenres(genres => res)
    }

    const onFilmLoaded = (res) => { //(res) is required to send params to function
        setFilms(films => res)
    }

    const getFilmsList = (query) => {
        newService.getSearched(query)
        .then(onFilmLoaded) 
    }

    const getGenresList = () => {
        newService
        .getGenres()
        .then(onGenresLoaded)
    } 

    function renderFilms(arr) {
        // change img path
        // console.log(arr)
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
                    <Link to={`/film/${item.id}`}>
                        <Card bg='light' text='dark' style={{ width: '14rem'}} className="cardList"> 
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

    const items = renderFilms(films);
    // if (films !== 0 && genres.length !== 0) {
    //     const list = films;
    //     renderFilms(list);
    //     items = renderFilms(list)
        
    // }


    return (
        <>
            <h2>Search Results</h2>
            <Container>
                {items}
            </Container>
        </>
    )
}


export default withRouter(Searched);