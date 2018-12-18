import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, FormGroup, FormControl, Col, ListGroupItem, ListGroup, Row, Alert } from 'react-bootstrap';
import { SearchMembers } from './SearchMembers';
import { Members } from './Members';
import _ from 'lodash';
import firebase from 'firebase';
import api from '../../api';
import { firebaseAuth } from '../../firebase';


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

const MembersList = styled.div`
    overflow-y: auto;
    max-height: 200px;
`
export class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [], 
            name: '',
            members: [],
            membersToAdd: [],
            searchedMembers: [],
            errorMessage: '',
        }
        this.submitGroup = this.submitGroup.bind(this);
        this.addItem = this.addItem.bind(this);
    }
    componentWillMount() {
        firebase.database().ref('usersInfo').once('value').then((users) => {
            console.log("Users: ", users.val())
            let usersObj = users.val() || {}
            let fetchedUsers = []
            Object.keys(usersObj).map((key) => {
                let user = {
                    value: usersObj[key].email,
                    display: `${usersObj[key].firstName} ${usersObj[key].lastName}`
                }
                fetchedUsers.push(user)
            })
            console.log("fetched: ", fetchedUsers)
            this.setState({
                searchedMembers: fetchedUsers
            }, () => {
                console.log("users fetched")
            })
        })
    }
    async submitGroup(event) {
        event.preventDefault();
        const groupTitle = document.getElementById("groupTitle").value
        if(!groupTitle || groupTitle.trim() == "" ){
            this.setState({ errorMessage: "Can't create group without a name!" });
        }
        else {
            var uid = "MrUvV1R8xBUH3XPzRiLKj1wWNaS2";
            let userId = firebase.auth().currentUser.uid
            console.log("Current user: ", window.fullName, userId, firebaseAuth.currentUser)
            let ownerName = window.fullName

            const groupObj = {
                name: groupTitle,
                members: this.state.membersToAdd,
                ownerID: uid,
                ownerName
            };
            api.createNewGroup(groupObj).then(() => {
                console.log("Props: ", this.props)
                this.props.returnToGroupsHome()
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    
    searchTest(term2) {
        
        let terms = term2.toString().trim().toLowerCase().replace(/[^A-Za-z0-9\s]/g, "");
        let url = `http://localhost:50271/api/Travellers/UniversalTravellerSearch?term1=${terms}`;
        fetch(url).then(response => response.json())
            .then(jsonData => {
                let membersToSelect = jsonData.map(member => { return { value: member.id, display: `${member.name}` } });
                this.setState({ membersToAdd: membersToSelect });
            })
            .catch(error => console.log(error));
        
    }

    addItem(e, memberSelectedFromSearch) {
        e.preventDefault();
        console.log("Member selected", memberSelectedFromSearch)
        if(memberSelectedFromSearch) {
            let membersToAdd = this.state.membersToAdd
            let currentAddedMembers = this.state.membersToAdd.map(a => a.value).slice();
            let newMemberValue = memberSelectedFromSearch.value
            let selectedExist = currentAddedMembers.indexOf(newMemberValue)

            if(selectedExist === -1) {
                membersToAdd.push(memberSelectedFromSearch)
                this.setState({
                    membersToAdd: membersToAdd,
                    members: membersToAdd
                })
            } else {
                let editableMembers = this.state.membersToAdd.slice()
                editableMembers.splice(selectedExist, 1)
                this.setState({
                    membersToAdd: editableMembers,
                    members: editableMembers
                })
            }
            return
        }
        let membersToAdd = this.state.membersToAdd;
        const newMemberEmail = document.getElementById("addInput").value
        if(newMemberEmail != "") {
            membersToAdd.push({
                display: newMemberEmail
            });

            this.setState({
                membersToAdd: membersToAdd
            })
        }
        document.getElementById("addInput").value = ""
    }

    render() {
        const membersAdded = this.state.membersToAdd.map((member) => <ListGroupItem key={member.value}>{member.display} ({member.value})</ListGroupItem>)
        const memberSearch = _.debounce((event, term) => { this.searchTest(event,term) }, 650);
        const addMember = ((event, selectedMember) => { this.addItem(event, selectedMember) });
        
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
                        </Form>
                    </Col>
                    <Col md={3}>
                        <SearchMembers onSearchEnter={memberSearch} />
                        <MembersList>
                        <Members searchedMembers={this.state.searchedMembers} existingMembers={this.state.members}
                            onMemberSelect={addMember } />
                         </MembersList> 
                            
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
                        <ActionButton>Back</ActionButton>                        
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