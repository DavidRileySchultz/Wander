import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Glyphicon, OverlayTrigger } from 'react-bootstrap';
import _ from 'lodash';

export class ViewGroup extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const style = {
            backgroundColor: "#c2e6ff",
            height: "65vh",
            paddingLeft: "30px",
            paddingRight: "30px",
            color: "#555",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            overflow: "auto",
            marginBottom: "10px",
            boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.41)",
            borderRadius: "5px"
        }
        var contents = null;
        if(this.props.viewingGroupDetails === "About") {
            contents = <div><Row>
                    <h2>{this.props.name}</h2>
                </Row>
                <Row>
                    <h4>Coordinator: {this.props.ownerName}</h4>
                </Row>
                </div>
        }
        else if(this.props.viewingGroupDetails === "Members") {
            console.log("Members members: ", this.props)
            var membersAdded = this.props.members.map((member, index) => <ListGroupItem key={index} >{member.display}</ListGroupItem>)
            contents = <Row>
                <h2>Members</h2>
                <ListGroup>
                    {membersAdded}
                </ListGroup>
            </Row>
        }

        return (
            <div style={style}>
                {contents}
            </div>
        );
    }
}

export default ViewGroup;