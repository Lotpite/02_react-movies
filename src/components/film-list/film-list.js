import {Container, Row, Col, Card, Button, Badge} from 'react-bootstrap';
import FilmService from '../../services/FilmService';
import { Component } from 'react';
import './film-list.css';   
import Film from '../film-item/film-item';


class FilmList extends Component {
    
    state = {
        films: [],
        genres: [],
        page: 1,
        newItemLoading: false
    }

    newService = new FilmService();

    componentDidMount() {
        this.onRequest();
        this.newService.getGenres()
            .then(this.onGenresLoaded)
    }

    // load film list (request to server)
    onRequest = (page) => {
        this.onFilmListLoading();
        this.newService
            .getPopular(page)
            .then(this.onListLoaded)
    }

    onFilmListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    // write list to the state
    onListLoaded = (newFilms) => {
        this.setState(({page, films}) => ({
            films: [...films, ...newFilms], // at first time films is empty array
            newItemLoading: false,
            page: page + 1
        }))
    }

    onGenresLoaded = (genres) => {
        this.setState({genres})
    }

    getGenresList = () => {
        this.newService
        .getGenres()
        .then(this.onGenresLoaded)
    }    
        
    findId = (id_name) => {
        
        this.state.genres.forEach(obj => {
            console.log(Object.keys(obj).filter(key => obj[key] === id_name))
        })
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
                    <Card bg='light' text='dark' style={{ width: '14rem'}} className="cardList"
                    onClick={() => console.log(this.state.films[i].id)}> 
                        <Card.Img variant="top" src={item.poster_path} alt="img"/>
                        <Card.Body>
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
    
    render () {       
       
        // if - to avoid empty arrays
        let items = [];
        if (this.state.films.length !== 0 && this.state.genres.length !== 0) {
            const list = this.state.films
            this.renderFilms(list);
            items = this.renderFilms(list)
        }
        const {page, newItemLoading} = this.state

        return (
            <Container className="justify-content-md-center" >
                    {items}
                    <Button variant="dark" size="lg"
                     disabled={newItemLoading}
                     onClick={() => this.onRequest(page)}
                     >show more</Button>
            </Container>
        )
    }
}

export default FilmList;

