import { Form, FormControl, Button } from 'react-bootstrap';

const SearchPanel = () => {
    return (
        <Form className="d-flex">
            <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            />
            <Button variant="outline-light"
            onClick={() => console.log('his')}>Search</Button>
        </Form>
    )
};

export default SearchPanel;