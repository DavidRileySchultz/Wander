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

    // addSelectedTerm(e) {
    //     e.preventDefault();
    //     let memberList = this.state.memberList;
    //     const newTerm = document.getElementById("addInput");
    //     if(newTerm.value != "") {
    //         memberList.push(newTerm.value);
    //         this.setState({
    //             memberList: memberList
    //         });
    //     }

    // }
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
                {/* <button className="button is-info" onClick={this.addSelectedTerm}>add</button> */}
            </FormGroup>
        );
    }
}

export default SearchMembers;