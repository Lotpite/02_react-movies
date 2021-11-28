import FilmService from '../../services/FilmService';
import {Container, Row, Col, Card, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { withRouter } from 'react-router';

class Searched extends Component {
    
    state = {
        films: [],
        genres: []
    }

    newService = new FilmService();

    componentDidMount () {
        const {match: {params: {query}}} = this.props; // get id from filmlist (through router)
        this.getGenresList()
        this.getFilmsList(query)
    }

    onGenresLoaded = (genres) => {
        this.setState({genres})
    }

    onFilmLoaded = (films) => {
        this.setState({films})
    }

    getFilmsList = (query) => {
        this.newService
        .getSearched(query)
        .then(this.onFilmLoaded)
    }

    getGenresList = () => {
        this.newService
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

    render() {
        let items = [];
        if (this.state.films !== 0 && this.state.genres.length !== 0) {
            const list = this.state.films
            this.renderFilms(list);
            items = this.renderFilms(list)
        }

        return (
            <>
                <h2>Search Results</h2>
                <Container>
                    {items}
                </Container>
            </>
        )
    }
}

export default withRouter(Searched);