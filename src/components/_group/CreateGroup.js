import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, FormGroup, FormControl, Col, ListGroupItem, ListGroup, Row, Alert } from 'react-bootstrap';
import { SearchMembers } from './SearchMembers';
import { Members } from './Members';
import _ from 'lodash';
import { firebase, firebaseAuth } from 'firebase';
import api from '../../api';

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
            members: [{

            }, {

            }],
            membersToAdd: [{
                email: "johndoe@fb.com",
                id: "sampleID1"
            }, {
                email: "janedoe@fb.com",
                id: "sampleID2"
            }],
            errorMessage: '',
        }
        this.submitGroup = this.submitGroup.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    async submitGroup(event) {
        event.preventDefault();
        const groupTitle = document.getElementById("groupTitle").value
        if(!groupTitle || groupTitle.trim() == "" ){
            this.setState({ errorMessage: "Can't create group without a name!" });
        }
        else {
            // console.log("CURRENT USER ID", firebaseAuth)
            var uid = "Z7dihXJSTWSL1TI6TqBGm4HF1Pp1";
            const groupObj = {
                name: this.state.name,
                memberIDS: this.state.membersToAdd,
                ownerID: uid,
            };
            api.createNewGroup(groupObj)
            .then((createdUser) => {
                console.log("Created User")
            })
            .catch((error=> {
                console.log("Error ",(error))
            } ) )
        }
    }

    addItem(e) {
        e.preventDefault();
        let membersToAdd = this.state.membersToAdd;
        const newMemberEmail = document.getElementById("addInput").value
        if(newMemberEmail != "") {
            membersToAdd.push({
                email: newMemberEmail
            });

            this.setState({
                membersToAdd: membersToAdd
            })
        }
        document.getElementById("addInput").value = ""
    }

    render() {
        const membersAdded = this.state.membersToAdd.map((member) => <ListGroupItem key={firebaseAuth}>{member.email}</ListGroupItem>)
        const memberSearch = _.debounce((event, term) => { this.addItem(event,term) }, 650);
        const addMember = ((selectedMember) => { this.addItem(selectedMember) });

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
                        <h2 className="page-subtitle"> Create A New Group!</h2>
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
                                    id="groupTitle"
                                    onChange={() => {}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    placeholder="Name to add"
                                    type="text"
                                    name="name"
                                    id="addInput"
                                    value={this.state.addInput}
                                    onChange={this.handleChange}
                                />
                                <button className="button" onClick={(event) => this.addItem(event)} >Add</button>
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