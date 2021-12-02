import { Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SearchPanel = () => {

    const [query, setQuery] = useState();
   
    function getQuery(e) {
        setQuery(query => e.target.value)
    }

        return (
            <Form className="d-flex">
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={getQuery}
                />
                <Link to={`search_results/${query}`}>
                    <Button variant="outline-light"
                    
                    >Search</Button>
                 </Link>
                
            </Form>
        )
    }

export default SearchPanel;