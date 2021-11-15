import {Navbar, Nav, Container, Form, FormControl, Button, Figure, Pagination } from 'react-bootstrap';
import SearchPanel from '../search-panel/search-panel';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href="#">Filmzzz</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="#action1" variant="light">Popular</Nav.Link>
                <Nav.Link href="#action2">Favorites</Nav.Link>
            </Nav>
            <SearchPanel/>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default Navigation;
