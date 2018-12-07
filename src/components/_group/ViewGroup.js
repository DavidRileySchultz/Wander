import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row } from 'react-bootstrap';
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
                    <h4>Coordinator: {this.props.owner}</h4>
                </Row>
                </div>
        }
        else if(this.props.viewingGroupDetails === "Members") {
            var membersAdded = this.props.memberName.map((member, index) => <ListGroupItem key={index} >{member}</ListGroupItem>)
            contents = <Row>
                <h2>Members</h2>
                <ListGroup>
                    {membersAdded}
                </ListGroup>
            </Row>
        }
        else if(this.props.viewingGroupDetails === "Itinerary") {
            contents = <Row>
                <h2>Your Itinerary</h2>
                {/* is this where I want to display the Itinerary?
                or should I be using a homepage that will look like the user's homepage? */}
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