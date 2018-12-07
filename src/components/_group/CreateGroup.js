import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, FormGroup, FormControl, Col, ListGroupItem, ListGroup, Row, Alert } from 'react-bootstrap';
import { SearchMembers } from './SearchMembers';
import { Members } from './Members';
import _ from 'lodash';
import { firebase, firebaseAuth } from 'firebase';

const ActionButton = styled.button`
    padding: 0.7rem;
    color: rgb(47,67,88);
    display: inline-block;
    border-radius: 0.35rem;
    &:hover {
    display: inline-block;
    background: rgba(143,159,178,.7);
    cursor: pointer;
    }
`;
export class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            members: [],
            membersToAdd: [],
            errorMessage: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitGroup = this.submitGroup.bind(this);
    }

    async submitGroup(event) {
        event.preventDefault();
        if(!this.canSubmit()) {
            this.setState({ errorMessage: "Can't create group without a name!" });
        }
        else {
            var uid = firebase.auth().currentUser.uid;
            var members = this.state.members.map(a => Number(a.value));
            const groupObj = {
                name: this.state.name,
                members: members,
                uid: uid,
            };
            firebase.database().ref(`/groups/users/`)
        }
    }

    addSelectedMember(selectMember) {
        var currentMembers = this.state.members.map(a => a.value).slice();
        var selectedExist = currentMembers.indexOf(selectMember.value);
        if(selectedExist === -1) {
            var editableMembers = this.state.members.slice();
            editableMembers.push(selectMember);
            this.setState({
                members: editableMembers
            });
        }
        else {
            var editableMembers = this.state.members.slice();
            editableMembers.splice(selectedExist, 1);
            this.setState({
                members: editableMembers
            });
        }
    }

    canSubmit() {
        return this.state.name !== '';
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    
    searchTest(term2) {
        let terms = term2.toString().trim().toLowerCase().replace(/[^A-Za-z0-9\s]/g, "");
        let url = `/api/Travellers/UniversalTravellerSearch?term1=${terms}`;
        fetch(url).then(response => response.json())
            .then(jsonData => {
                let membersToSelect = jsonData.map(member => { return { value: member.id, display: `${member.name}` } });
                this.setState({ membersToAdd: membersToSelect });
            })
            .catch(error => console.log(error));
    }

    addFriend = event => {
        event.preventDefault()
            if(this.state.email) {
                this.setState({friendEmails: [...this.state.emails, this.state.email
                ]})
            this.props.getUsers({
                email: this.state.email,
                id: Number(this.props.match.params.tripId),
                organizer: false,
                joined: false
            })
            }
        this.setState({email: ''})
    }


    render() {
        const membersAdded = this.state.members.map((member) => <ListGroupItem key={firebaseAuth.value}>{firebaseAuth.display}</ListGroupItem>)
        const memberSearch = _.debounce((event, term) => { this.addFriend(event,term) }, 650);
        const addMember = ((selectedMember) => { this.addSelectedMember(selectedMember) });
        const style = {
            height: "85vh",
        };
        const membersBox = {
            backgroundColor: "#c2e6ff",
            height: "60vh",
            paddingLeft: "30px",
            paddingRight: "30px",
            color: "#555",
            fontFamily: "'Segoe UI', sans-serif",
            overflow: "auto",
            marginBottom: "10px",
            boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.41)",
            borderRadius: "5px"
        }
        return(
            <div style={style}>
                <Row className="empty-space2percent" />
                <Row>
                    <Col md={3} mdOffset={3}>
                        <h2 className="page-subtitle"> Create New Group!</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} mdOffset={1}>
                        <div hidden={this.state.errorMessage === ''}>
                            <Alert>{this.state.errorMessage}</Alert>
                        </div>
                        <Form>
                            <FormGroup>
                                <FormControl
                                    placeholder="Group Name"
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md={3}>
                        <SearchMembers onSearchEnter={memberSearch} />
                        <Members membersToAdd={addMember} existingMembers={this.state.members}
                            onMemberSelect={addMember} existingMembers={this.state.members} />
                    </Col>
                    <Col md={4}>
                        <div style={membersBox}>
                            <h3>Travel Buddies!:</h3>
                            <ListGroup>
                                {membersAdded}
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={1} mdOffSet={1}>
                        <ActionButton onClick={this.props.returnToGroup}>Back</ActionButton>
                    </Col>
                    <Col md={2}>
                        <ActionButton onClick={(event) => this.submitGroup(event)}>Create Group</ActionButton>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateGroup;