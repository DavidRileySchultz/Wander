import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export class SearchMembers extends Component {
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
        const email = target.email;
        this.setState({
            [email]: value
        });
    }

    onInputChange(event, term) {
        this.setState({ term: term });
        this.props.onSearchEnter(event, this.state.term);
    }

    addSelectedMember(term) {
        if(!term) {
            return
        }
        
    }
    render() {
        return (
            <FormGroup>
                <FormControl
                    placeholder="Search for your friends"
                    type="text"
                    name="term"
                    value={this.state.term}
                    onChange={(event) => this.onInputChange(event, event.target.value)}
                />
                <button onClick={() => this.addSelectedMember(this.state.term)}>add</button>
            </FormGroup>
        );
    }
}

export default SearchMembers;