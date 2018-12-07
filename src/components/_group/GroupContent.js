import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { CreateGroup } from './CreateGroup';
import { ViewGroup } from './ViewGroup';
import { EditGroup } from './EditGroup';
import { Tooltip, OverlayTrigger, ListGroup, ListGroupItem, ButtonGroup, Button, Col, Row, Glyphicon } from 'react-bootstrap';
import background from '../../_images/Travel.jpg'

const Wrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const Header = styled.h3`
    color: white;
`;

const CreateButton = styled.button`
    padding: 0.7rem;
    color: rgb(47,67,88);
    display: inline-block;
    &:hover {
    display: inline-block;
    background: rgba(143,159,178,.7);
    }
`;



export class GroupContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createGroup: false,
            groupsIn: [],
            groupsOwn: [],
            editGroupId: null,
            viewGroupId: null,
            name: '',
            memberIds: [],
            memberNames: [],
            userId: null,
            owner: '',
            viewGroupDetails: "About"
        }
        this.addNewGroup = this.addNewGroup.bind(this);
        this.backToAllGroups = this.backToAllGroups.bind(this);
        this.goEditGroup = this.goEditGroup.bind(this);
        this.goViewGroup = this.goViewGroup.bind(this);
        //this.goToJournal = this.goToJournal.bind(this);
        //this.goToItinerary = this.goToItinerary.bind(this);
        this.changeViewDetails = this.changeViewDetails.bind(this);
    }

    addNewGroup(event) {
        event.preventDefault();
        this.setState({
            createGroup: true,
        });
    }

    backToAllGroups() {
        // let groupsIn;
        // let groupsOwn;
        // var id = localStorage.getItem('userId');
        // await fetch(`api/Groups/GetGroups?id=${id}`).then(response => response.json())
        //     .then(data => {
        //         groupsOwn = data.groupsOwn;
        //         let groupsOwnIds = groupsOwn.map(g => g.id);
        //         groupsIn = data.groupsIn.filter(g => { return (groupsOwnIds.includes(g.id) === false) });
        //         this.setState({
        //             groupsOwn: groupsOwn,
        //             groupsIn: groupsIn
        //         })
        //     }).catch(g => console.log(g));
        this.setState({
            createGroup: false,
            editGroupId: null,
            viewGroupId: null
        })        
    }

    changeViewDetails(tab) {
        this.setState({
            viewGroupDetails: tab
        });
    }

    goEditGroup() {
        let index = this.state.canEditGroup;
        var groupId = this.state.groupsOwn[index].id;
        fetch(`api/Groups/Details?id=${groupId}`).then(response => response.json()).then(data =>
            this.setState({
                title: data.title,
                memberIds: data.members,
                memberNames: data.memberNames,
                owner: data.owner,
                userId: data.userId,
                editGroupId: groupId
            }))
            .catch(error => console.log(error));
    }

    goViewGroup(index, list) {
        var groupId = (list === "in") ? this.state.groupsIn[index].id : this.state.groupsOwn[index].id;
        var canEdit = (list === "own") ? index : null;
        fetch(`api/Groups/Details?id=${groupId}`).then(response => response.json()).then(data =>
            this.setState({
                name: data.name,
                memberIds: data.members,
                memberNames: data.memberNames,
                owner: data.owner,
                userId: data.userId,
                viewGroupId: groupId,
                viewGroupDetails: "About",
                canEditGroup: canEdit
            }))
            .catch(error => console.log(error));
    }

    componentWillMount() {
        // let groupsIn;
        // let groupsOwn;
        // var id = localStorage.getItem('userId');
        // fetch(`api/Groups/GetGroups?id=${id}`).then(response => response.json())
        //     .then(data => {
        //         groupsOwn = data.groupsOwn;
        //         let groupsOwnIds = groupsOwn.map(g => g.id);
        //         groupsIn = data.groupsIn.filter(g => { return (groupsOwnIds.includes(g.id) === false) });
        //         this.setState({
        //             groupsOwn: groupsOwn,
        //             groupsIn: groupsIn
        //         })
        //     })
        //     .catch(g => console.log(g));
    }

    render() {
        console.log("What's here??")
        const style = {
            bacgroundColor: "orange",
            height: "100vh"
        }

        const tooltip = (
            <Tooltip id="tooltip">
                Hello Group Coordinator!
            </Tooltip>
        );
        let viewGroup = null;
        let viewGroupButtons = null;
        let editGroup = null;
        if (this.state.viewGroupId != null) {
            viewGroup = <ViewGroup
                name={this.state.name}
                memberNames={this.state.memberNames}
                memberIds={this.state.memberIds}
                userId={this.state.userId}
                owner={this.state.owner}
                id={this.state.editGroupId}
                viewGroupDetails={this.state.viewGroupDetails}
            />
            if (this.state.canEditGroup !== null) {
                editGroup = <a className="btn action-button" onClick={() => this.goEditGroup()}>Edit Group</a>
            }
            viewGroupButtons = <ButtonGroup vertical>
                <Button onClick={() => this.changeViewDetails("About")} active={this.state.viewGroupDetails === "About"}>About</Button>
                <Button onClick={() => this.changeViewDetails("Members")} active={this.state.viewGroupDetails === "Members"}>Members</Button>
                <Button onClick={() => this.changeViewDetails("Itinerary")} active={this.state.viewGroupDetails === "Itinerary"}>Itinerary</Button>
                <Button onClick={() => this.chanveViewDetails("Journal")} active={this.state.viewGroupDetails === "Journal"}>Journal</Button>
            </ButtonGroup>
        }
        const returnToGroups = this.backToAllGroups;
        if (this.state.createGroup) {
            return (
                <div>
                    <CreateGroup returnToGroupsHome={returnToGroups} />
                </div>
            );
        }
        else if (this.state.editGroupId !== null) {
            return (
                <EditGroup
                    name={this.state.name}
                    memberIds={this.state.memberIds}
                    memberNames={this.state.memberNames}
                    userId={this.state.userId}
                    owner={this.state.owner}
                    id={this.state.editGroupId}
                    returnToGroupsHome={returnToGroups} />
            );
        }
        else {
            return (
                <Wrapper>
                
                    <Row className="empty-space5percent" />
                    <Row>
                        <Col md={4} mdOffset={1} >
                            <CreateButton className="btn action-button" onClick={(event) => this.addNewGroup(event)}>Create a Group</CreateButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} mdOffset={1}>
                            <Header>Travel Groups:</Header>
                            <ListGroup>
                                {this.state.groupsOwn.map((g, index) =>
                                    (<ListGroupItem key={index} onClick={() => this.goViewGroup(index, "own")} active={this.state.viewGroupId === g.id} value={g.id}>
                                        {g.name}
                                        <span className="pull-right">
                                            <OverlayTrigger placement="right" overlay={tooltip}>
                                                <Glyphicon glyph="star" />
                                            </OverlayTrigger>
                                        </span>
                                    </ListGroupItem>)
                                )}
                                {this.state.groupsIn.map((g, i) =>
                                    (<ListGroupItem onClick={() => this.goViewGroup(i, "in")} key={i} value={g.id} active={this.state.viewGroupId === g.id}>
                                        {g.name}
                                    </ListGroupItem>)
                                )}
                            </ListGroup>
                        </Col>
                        <Col md={4} mdOffset={1}>
                            {viewGroup}
                        </Col>
                        <Col md={1}>
                            {viewGroupButtons}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} mdOffSet={7}>
                            {editGroup}
                        </Col>
                    </Row>
                
                </Wrapper>
            );
        }
    }
}

export default GroupContent;