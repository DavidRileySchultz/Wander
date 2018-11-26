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

class ReadItinerary extends Component {
  constructor() {
    super();
    this.state = {
      singleItinerary: {},
      loaded: false
    }
  }

  componentDidMount() {
    console.log('readEntry', this.props.match.params.id)
    api.requestSingleEntry(this.props.match.params.id, auth.getToken())
      .then(reply => {
        console.log(reply.body)
        this.setState(
          {
            singleItinerary: reply.body,
            loaded: true
          }
        )
      })
  }

  displayDate = timeStamp => {
    let newDateArray = timeStamp.split('T');
    let justDate = newDateArray[0];
    return justDate;
  }

  render() {
    return (
      <div style={{display: 'flex', 'align-content': 'center', 'justify-content': 'center'}} >    
        {!this.state.loaded ? <div>loading...</div> :
          <PageWrapper>
            <TitleWrapper>
              <Title>{this.state.singleItinerary.tripName}</Title>
              <p>{this.displayDate(this.state.singleItinerary.createdAt)}</p>
            </TitleWrapper>
            <MainContent>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>When is the start of your trip?</Question>
              </QuestionWrapper>
              <AnswerWrapper>
                <p>{this.state.singleItinerary.startDate}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>When is the end of your trip?</Question>
              </QuestionWrapper>
              <AnswerWrapper>
                <p>{this.state.singleItinerary.endDate}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Day One</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleItinerary.dayOne}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Day Two</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleItinerary.dayTwo}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Day Three</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleItinerary.dayThree}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Day Four</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleItinerary.dayFour}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Day Five</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleItinerary.dayFive}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Day Six</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleItinerary.daySix}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Day Seven</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleItinerary.daySeven}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Day Eight</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleItinerary.dayEight}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Day Nine</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleItinerary.dayNine}</p>
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Day Ten</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleItinerary.dayTen}</p>
              </AnswerWrapper>
            </ContentWrapper>
              <CreateButton size="massive" as={Link} to={`/dashboard/edititinerary/${this.state.singleItinerary.id}`}>
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
