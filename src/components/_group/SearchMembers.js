import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

class SearchMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    onInputChange(term) {
        this.setState({ term: term });
        this.props.onSearchEnter(this.state.term);
    }

    render() {
        return (
            <FormGroup>
                <FormControl
                    placeholder="Search for your friends"
                    type="text"
                    name="term"
                    value={this.state.term}
                    onChange={(event) => this.onInputChange(event.target.value)}
                />
            </FormGroup>
        );
    }
}

export default SearchMembers;