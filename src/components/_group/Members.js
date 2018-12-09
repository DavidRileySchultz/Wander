import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { MemberListItem } from './MemberListItem';

export class Members extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const listItems = this.props.searchedMembers.map((member) => {
            return (<MemberListItem value={member.value} existingMembers={this.props.existingMembers} onMemberSelect={this.props.onMemberSelect} key={member.value} display={member.display}></MemberListItem>
            )
        });
        return (
            <ListGroup>
                {listItems}
            </ListGroup>
        );
    }
}

export default Members;