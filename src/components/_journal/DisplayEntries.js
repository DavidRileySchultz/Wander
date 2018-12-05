import React, { Component } from 'react';
import EntryPreview from './EntryPreview';
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const ButtonPosition = styled(Card.Content)`
&&{
padding: 6rem 0 3rem 
}
`;

const CardWrapper = styled.div `
grid-template-columns : repeat(auto-fit, 290px);
grid-template-rows: repeat(auto-fit, 408.44px);
display: grid; 
grid-gap: 1em 3%;
width: 100%;
`;


class DisplayEntries extends Component {

    componentDidMount() {
        const skyScanner = document.createElement("script");
        skyScanner.src = "http://widgets.skyscanner.net/widget-server/js/loader.js";
        skyScanner.async = true;
        document.body.appendChild(skyScanner);
    }

    displayEntryPreview() {
        console.log("Display Entry called", this.props.entries)
        const entryList = [];
        for(const id in this.props.entires){
            console.log(id, "id")
            if (id){
                entryList.push(
                    <EntryPreview key={id} entry={this.props.entries[id].entryDataObj} id={id} editable={this.props.editable} />
                )
                console.log(entryList);
            }
        }
        return entryList;
    }

    render() {
        console.log(this.props.entries, "<=======")
        return (
            <div>
            <CardWrapper>
                <Card>
                    <div />
                    <div className="card-content">
                        <ButtonPosition extra>
                        <Button size="massive" as={Link} to='/dashboard/writeentry'> + </Button>
                        </ButtonPosition>
                        <Card.Header>
                            Create a new entry! 
                        </Card.Header>
                    </div>
                </Card>
                {true ?
                    Object.keys(this.props.entries).map((id, index) => 
                    <EntryPreview key={id} entry={this.props.entries[id].entryDataObj} id={id} editable={this.props.editable} />
                    )
                 :
                    null}
                
            </CardWrapper>
                <h3>Search For Flight Prices!</h3>
                <div data-skyscanner-widget="SearchWidget" data-locale="en-US" data-enable-placeholders="true" data-params="colour:lunar;fontColour:malt;buttonColour:loch;buttonFontColour:malt;"></div> 
            </div>

            
        )
    }
}
export default DisplayEntries;
//this.props.entries.length