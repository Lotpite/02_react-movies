import {Container, Row, Col} from 'react-bootstrap';
import FilmItem from '../film-item/film-item';

const FilmList =() => {
    return (
        <Container className="justify-content-md-center" >
            <Row>
                <Col>
                    <FilmItem/>
                </Col>
                <Col>
                    <FilmItem/>
                </Col>
                <Col>
                    <FilmItem/>
                </Col>
                <Col>
                    <FilmItem/>
                </Col>
                <Col>
                    <FilmItem/>
                </Col>
                <Col>
                    <FilmItem/>
                </Col>
            </Row>
        </Container>
    )
}

export default FilmList;