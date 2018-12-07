import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';

export class MemberListItem extends Component {
    constructor(props){
        super(props);
    }

    isActive() {
        const existingMembers = this.props.existingMembers.amp(a => a.value);
        const thisMember = this.props.value;
        if(existingMembers.include(thisMember)) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        const memberToAdd = { key: this.props.value, value: this.props.value, display: this.props.display };
        return (
            <ListGroupItem active={this.isActive()} onClick={() => this.props.onMemberSelect(memberToAdd)}>
                {this.props.display}
            </ListGroupItem>
        );
    }
}

export default MemberListItem;