import {Container, Row, Col, Card, Button, Badge} from 'react-bootstrap';
import Film from '../film-item/film-item';
import FilmService from '../../services/FilmService';
import { Component } from 'react';


class FilmList extends Component {
    constructor(props) {
        super(props);
        this.updateList();
    }
    state = {
        films: []
    }

    newService = new FilmService();

    // записуем список фильмов в стейт
    onListLoaded = (films) => {
    this.setState({films})
    }

    // загружаем список фильмов
    updateList = () => {
        this.newService
        .getPopular()
        .then(this.onListLoaded)
    }

    renderFilms(arr) {
        // меняем адрес картинки 
        const items = arr.map((item) => {
            item.poster_path = 'https://image.tmdb.org/t/p/w500' + item.poster_path;

            // создаем бейджик для каждой id
            const genres = item.genre_ids.map(id => {
                return (
                    <Badge bg="light" text="dark">
                        {id}
                    </Badge>
                )
            })

            return (
                <Col>
                    <Card bg='light' text='dark' style={{ width: '14rem'}}>
                        <Card.Img variant="top" src={item.poster_path} alt="img"/>
                        <Card.Body>
                            {genres}
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
        // условие здесь потому что одно из значений приходит undefined
        let items = [];
        if (this.state.films != 0) {
            const list = this.state.films
            this.renderFilms(list);
            items = this.renderFilms(list)
        }

        return (
            <Container className="justify-content-md-center" >
                    {items}
                    <Button variant="dark" size="lg" disabled>Dark</Button>
            </Container>
        )
    }
}

export default FilmList;

