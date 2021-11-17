import {Container, Row, Col} from 'react-bootstrap';
import Film from '../film-item/film-item';

const FilmList =() => {
    return (
        <Container className="justify-content-md-center" >
            <Row>
                <Col>
                    <Film/>
                </Col>
                {/* <Col>
                    <Film/>
                </Col>
                <Col>
                    <Film/>
                </Col>
                <Col>
                    <Film/>
                </Col>
                <Col>
                    <Film/>
                </Col>
                <Col>
                    <Film/>
                </Col> */}
            </Row>
        </Container>
    )
}

export default FilmList;