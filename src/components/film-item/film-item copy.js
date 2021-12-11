import { useState, useEffect } from 'react';
import {Container, Row, Col, Card, Badge} from 'react-bootstrap';
import FilmService from '../../services/FilmService';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import Spinner from '../ui/spinner'
import './film-item.css'

// required variables = img, title, genre, description, link for button to openv

const Film = (props) => {

    const [movie, setMovie] = useState({});
    const [related, setRelated] = useState([]);
    const [genres, setGenres] = useState([]);
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(true)

    const filmService = new FilmService();

    const onFilmLoaded = (res) => {
        setMovie(movie => res)
        setLoading(loading => false)
    }

    const onRelatedLoaded = (res) => {
        setRelated(films => res)
    }

    useEffect (() => { 
            onChange()
        },[movie]) //watching for id

    const onChange = () => {
        const {match: {params: {id}}} = props; // get id from filmlist (through router)
        if (!id) {
            return
        }
        // setLoading(loading => false)
        filmService
        .getFilmByID(id)
        .then(onFilmLoaded) 
        checkStorage(id)
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

    function onToggleFavorites (id, item) {
        const index = related.findIndex((film) => film === item);
        item.onLike = !item.onLike
        const oldRelated = [...related.slice(0, index), ...related.slice(index + 1)]
        const newRelated = [item,...oldRelated]
        setRelated([...newRelated])
        console.log(related)
            localStorage.setItem(id, JSON.stringify(item))
     }

     function onToggleFavorite(id, item) {        
        if (!like) {
            setLike(like => !like)
            
            localStorage.setItem(id, JSON.stringify(item))
        }
        if (like) {
            setLike(like => !like)
            localStorage.removeItem(id)
        }
     }

     function checkStorage(id) {
        const el = localStorage.getItem(id)
        if(localStorage.getItem(id)) {
            setLike(like => true)
        } else {
            setLike(like => false)
        }
     }

     function checkList(list) {
        list.forEach(item => {
            if(localStorage.getItem(item.id)) {
                item.onLike = true
                
            }
        })
        console.log(list)
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
                            <Badge bg="danger" className="favor" onClick={() => onToggleFavorites(item.id, item)}>{!item.onLike === true ? 'Add' : 'Remove'}</Badge>
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

    if(loading) {
        return <Spinner/>
    }
    const {title, description, poster_path, id, onLike} = movie;


    let items = renderFilms(related);
   
    return (
        <>        
            <Container className="justify-content-md-center">
                <Col>
                    <h3>{title}</h3>
                    <div className="some">
                        <Card bg='light' text='dark' style={{ width: '14rem'}} className="cardList"> 
                            <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500' + poster_path} alt={title}/>
                            <Badge bg="danger" className="favor" onClick={() => onToggleFavorite(id, movie)}>{!like === true ? 'Add' : 'Remove'}</Badge>
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