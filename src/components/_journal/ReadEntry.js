import React, { Component } from 'react';
import api from '../../api.js'
import auth from '../../auth.js';
import { Button } from 'semantic-ui-react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const FontAwesome = require('react-fontawesome')

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.3em;
  font-family: 'Sue Ellen Francisco', cursive;
  color: #7e7c88;
  padding-bottom: 0.2em;
`;

const CreateButton = styled(Button)`
  && {
    background-color: #7e7c88;
    color: rgb(246, 244, 244);
    padding: 3px 9px;
    margin-top: 7%;
    }
`;

const PageWrapper = styled.div`
  width: 53.45rem;
  padding-bottom: 10%;
`

const TitleWrapper = styled.div`
  padding: 1.4rem 0;
`

const MainContent = styled.div`
  width: 53.45rem;
`

const ContentWrapper = styled.div`
     max-width: 940px;
     margin: 1rem auto 0 0;
     display: grid;
     grid-template-columns: 1fr 1fr;
     grid-gap: 10px;
`

const QuestionWrapper = styled.div`
  padding-top: 1.5rem;
  text-align: right;
`

const AnswerWrapper = styled.div`
  text-align: left;
  border-top: 1px solid lightgrey;
  padding: 1rem;

`

const Question = styled.header`
  font-family: 'Roboto Slab';
  width: 90%;
`

class ReadEntry extends Component {
  constructor() {
    super();
    this.state = {
      singleEntry: {},
      loaded: false
    }
  }
  
  componentDidMount() {    
    console.log('readEntry', this.props.match.params.id)
    api.requestSingleEntry(this.props.match.params.id)
      .then(reply => {
        console.log("reply ===>", reply.val())
        this.setState(
          {
            singleEntry: reply.val().entryDataObj,
            loaded: true
          },
        )        
      })
  }

  displayDate = timeStamp => {
    let newDateArray = timeStamp.split('T');
    let justDate = newDateArray[0];
    return justDate;
  }

  render() {
    console.log(this.state.singleEntry, "single entry")
    return (
      <div style={{display: 'flex', 'align-content': 'center', 'justify-content': 'center'}} >    
        {!this.state.loaded ? <div>loading...</div> :
          <PageWrapper>
            <img alt="unsplash-or-chosen" src={this.state.singleEntry.full_image_url} style={{ width: '53.45rem' }} />
            <TitleWrapper>
              <Title>{this.state.singleEntry.title}</Title>
              {/* <p>{this.displayDate(this.state.singleEntry.createdAt)}</p> */}
            </TitleWrapper>
            <MainContent>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>What did you do today?</Question>
              </QuestionWrapper>
              <AnswerWrapper>
                <p>{this.state.singleEntry.content}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Visited</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleEntry.place}</p>
              </AnswerWrapper>
            </ContentWrapper>
              <CreateButton size="massive" as={Link} to={`/dashboard/editentry/${this.state.singleEntry.id}`}>
                   <FontAwesome name="pencil"/> 
              </CreateButton>            
             </MainContent>
          </PageWrapper>            
        }
      </div>
    );
  }
}

export default ReadEntry;
