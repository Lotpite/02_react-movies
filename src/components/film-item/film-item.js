import {Card, Button} from 'react-bootstrap';
import poster from '../../img/template.jpg';

const FilmItem = () => {
    return (
        <>
        <Card bg='light' text='dark' style={{ width: '20rem'}}>
            <Card.Img variant="top" src={poster} alt="img"/>
            <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
            </Card.Text>
            <Button variant="outline-dark">Go somewhere</Button>
            </Card.Body>
      </Card>
      <br />
      </>
    )
}

export default FilmItem;