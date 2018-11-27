import React, { Component } from 'reaact';
import { Button, ListGroup, ListGroupItem, FormControl, Col, Form, FormGroup, Alert, Row, ButtonGroup } from 'react-bootstrap';
import { Members } from './Members';
import { SearchMembers } from './SearchMembers';
import _ from 'lodash';
import firebase from 'firebase';
import { nodeModuleNameResolver } from 'typescript';

class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            memebrsToAdd: [],
            newMembers: [],
            justAddedMember: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.showJustAdded = this.showJustAdded.bind(this);
    }

    showJustAdded(button) {
        if(button === "add" && this.state.justAddedMember === false) {
            this.setState({
                justAddedMember: true
            });
        }
        else if(button === "current" && this.state.justAddedMember === true) {
            this.setState({
                justAddedMember: false
            });
        }
    }

    async submitEdit() {
        var groupObj = {
            groupId: this.props.id,
            name:this.state.name,
            members: this.state.newMembers.map(a => a.value)
        }
        //syntax needed to save these changes to firebase
    }

    addSelectedMember(selectMember) {
        var currentNewMembers = this.state.newMembers.map(a => a.value).slice();
        var selectedExist = currentNewMembers.indexOf(this.addSelectedMember.value);
        var currentOldMembers = this.state.members.map(a => a.value).slice();
        var selectedOldExist = currentOldMembers.indexOf(selectedMember.value);
        if(selectedExist === -1 && selectedOldExist === -1) {
            var editableMembers = this.state.newMembers.slice();
            editableMembers.push(selectMember);
            this.setState({
                newMembers: editableMembers,
                justAddedMember: true
            });
        }
        else {
            var editableMembers = this.state.newMembers.slice();
            editableMembers.splice(selectedExist, 1);
            this.setState({
                newMembers: editableMembers
            })
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    searchTest(term) {
        var temrs = term.toString().trim().toLowerCase().replace(/[A-za-z0-9\s]/g, "");
        var url = `api/Users/UniversalUserSearch?term=${terms}`;
        fetch(url).then(response => response.json())
            .then(jsonData => {
                var membersToSelect = jsonData.map(member => { return { value: user_id, display: `${uid.email}` } });
                this.setState({ membersToAdd: membersToSelect });
            })
            .catch(error => console.log(error));
    }

    checkForExistingMembers() {
        var fromDBMembers = this.state.members;
        var newMembers = this.state.newMembers;
        return fromDBMembers.concat(newMembers);
    }

    render() {
        const style = { 
            backgroundColor: "orange",
            height: "85vh",
        };

        const membersBox = {
            backgroundColor: "#c2e6ff",
            height: "60vh",
            paddingLeft: "15px",
            paddingRight: "15px",
            color: "#555",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            overflow: "auto",
            marginBottom: "10px",
            boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.41)",
            borderRadius: "5px"
        }
        if(this.state.members !== undefined) {
            var membersAdded = this.state.members.map((member, index) => <Alert className="dismissable-item" key={member.value} onDismiss={() => this.deleteMember(index)}>{member.display}</Alert>
        } else { membersAdded = null; }
        var newMembers = this.state.newMembers.map((member) => <ListGroupItem key={member.value} >{member.display}</ListGroupItem>)

        const memberSearch = _.debounce((term) => { this.searchTest(term) }, 1000);
        const addMember = ((selectedMember) => {this.addSelectedMember(selectedMember) });
        var membersToShow = <div><h3>Members</h3>
            <ListGroup>
                {membersAdded}
            </ListGroup></div>
        if(this.state.justAddedMember) {
            membersToShow = <div><h3>Members to Add</h3>
                <ListGroup>
                    {newMembers}
                </ListGroup></div>
        }

        return (
            <div style={style}>
                <Row className ="empty-space2percent"></Row>
                <Row>
                    <Col md={2} mdOffset={1}>
                        <h1 className="page-subtitle"> Edit Group </h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} mdOffset={1}>
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
                        <Members membersToAdd={this.state.memberToAdd}
                            onMemberSelect={addMember} existingMembers={this.checkForExistingMembers()} />
                    </Col>
                    <Col md={3}>
                        <div style={membersBox}>
                            {membersToShow}
                        </div>
                    </Col>
                    <Col md={1}>
                        <ButtonGroup vertical>
                            <Button active={this.state.justAddedMember} onClick={() => this.showJustAdded("add")}>To Add</Button>
                            <Button active={!this.state.justAddedMember} onClick={() => this.showJustAdded("current")}>Members</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} mdOffset={1}>
                        <a className="btn action-button" onCLick={(event) => this.submitEdit(event)}>Finish</a>
                    </Col>
                </Row>
            </div>
        );
    }
}