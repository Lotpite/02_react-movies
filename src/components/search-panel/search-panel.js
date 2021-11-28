import { Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';

class SearchPanel extends Component {
    state = {
        query: ''
    }

    getQuery = (e) => {
        this.setState({
            query: e.target.value
        })
    }


    render () {
        return (
            <Form className="d-flex">
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={this.getQuery}
                />
                <Link to={`search_results/${this.state.query}`}>
                    <Button variant="outline-light"
                    onClick={this.componentWillUnmount}
                    >Search</Button>
                 </Link>
                
            </Form>
        )
    }
}

export default SearchPanel;