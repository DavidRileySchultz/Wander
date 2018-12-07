import React, { Component } from 'react';
import GroupEntryPreview from './GroupEntryPreview';
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const CreateButton = styled(Button)`
&& {
background-color: #7e7c88;
color: rgb(246, 244, 244);
}
`;

const ButtonPosition = styled(Card.Content)`
&&{
padding: 6rem 0 3rem 
}
`
const CardWrapper = styled.div `
grid-template-columns : repeat(auto-fit, 290px);
grid-template-rows: repeat(auto-fit, 408.44px);
display: grid; 
grid-gap: 1em 3%;
width: 100%;
`


class DisplayGroupEntries extends Component {

    displayGroupEntryPreview = (entryObj) => {
        return (<GroupEntryPreview data={entryObj} key={entryObj.id} />)
    }

    render() {
        return (
            <CardWrapper>
                <Card>
                    <div />
                    <div className="card-content">
                        <ButtonPosition extra>
                        <Button size="massive" as={Link} to='/dashboard/writegroupentry'> + </Button>
                        </ButtonPosition>
                        <Card.Header>
                            Create a new entry! 
                        </Card.Header>
                    </div>
                </Card>
                {this.props.entries.length ?
                    this.props.entries.map(this.displayGroupEntryPreview) :
                    null}
            </CardWrapper>
        )
    }
}
export default DisplayGroupEntries;
