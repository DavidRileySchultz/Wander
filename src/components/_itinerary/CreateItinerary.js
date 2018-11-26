import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyANRTOu6PW7PLUeIlLd4S91EJxawTkbV2g",
    authDomain: "wander-d271d.firebaseapp.com",
    databaseURL: "https://wander-d271d.firebaseio.com",
    projectId: "wander-d271d",
    storageBucket: "wander-d271d.appspot.com",
    messagingSenderId: "93575872728"
  };
  firebase.initializeApp(config);
  
  const storage = firebase.storage();
  const storageRef = storage.ref('');

const Title = styled.h1`
display: flex;
justify-content: center;
align-items: center;
font-size: 4.3em;
font-family: 'Sue Ellen Francisco', cursive;
color: #7e7c88;
padding-bottom: 0.2em;
`

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
max-wdith: 940px;
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
border-bottom: 1px solid lightgrey;
border-left: 1px solid lightgrey;
border-right: 1px solid lightgrey;
flex-driection: column;
display: flex;
`

const Question = styled.header`
font-family: 'Roboto Slab';
width: 90%;
`

class CreateItinerary extends Component {
    constructor() {
        super();
        this.state = {
            tripName: '',
            startDate: '',
            endDate: '',
            dayOne: '',
            dayTwo: '',
            dayThree: '',
            dayFour: '',
            dayFive: '',
            daySix: '',
            daySeven: '',
            dayEight: '',
            dayNine: '',
            dayTen: ''
        }
    }

    handleKeyPress = event => {
        if (event.which === 13) {
          event.preventDefault();
        }
    };

    handleSubmit = event => {
        event.preventDefault();    
        console.log('submitting form.');
        var entryDataObj = {
          tripName: this.state,tripName,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          dayOne: this.state.dayOne,
          dayTwo: this.state.dayTwo,
          dayThree: this.state.dayThree,
          dayFour: this.state.dayFour,
          dayFive: this.state.dayFive,
          daySix: this.state.daySix,
          daySeven: this.state.daySeven,
          dayEight: this.state.dayEight,
          dayNine: this.state.dayNine,
          dayTen: this.state.dayTen,
          groupId: groupId
        };
    };

    canSubmit() {
        return this.state.tripName !== '';
    }

    render() {
        return (
            <div styler={{ display: 'flex', 'align-content': 'center', 'justify-content': 'center' }} >
                <PageWrapper>
                    <TitleWrapper>
                        <Title>Plan You Trip!</Title>
                    </TitleWrapper>
                    <form>
                        <MainContent>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question> Trip Name:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        value={this.state.tripName}
                                        onChange={e => this.setState({ tripName: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Trip Start Date:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.startDate}
                                        onChange={e => this.setState({ startDate: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Trip End Date:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.endDate}
                                        onChange={e => this.setState({ endDate: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Plans For Day One:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.dayOne}
                                        onChange={e => this.setState({ dayOne: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Plans For Day Two:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.dayTwo}
                                        onChange={e => this.setState({ dayTwo: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Plans For Day Three:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.dayThree}
                                        onChange={e => this.setState({ dayThree: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Plans For Day Four:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.dayFour}
                                        onChange={e => this.setState({ dayFour: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Plans For Day Five:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.dayFive}
                                        onChange={e => this.setState({ dayFive: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Plans For Day Six:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.daySix}
                                        onChange={e => this.setState({ daySix: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Plans For Day Seven:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.daySeven}
                                        onChange={e => this.setState({ daySeven: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Plans For Day Eight:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.dayEight}
                                        onChange={e => this.setState({ dayEight: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Plans For Day Nine:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.dayNine}
                                        onChange={e => this.setState({ dayNine: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <ContentWrapper>
                                <QuestionWrapper>
                                    <Question>Plans For Day Ten:</Question>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    <Input
                                        type="text"
                                        value={this.state.dayTen}
                                        onChange={e => this.setState({ dayTen: e.target.value })}
                                    />
                                </AnswerWrapper>
                            </ContentWrapper>
                            <Button onClick={this.handleSubmit}>
                                {this.state.loadingWrite ? 'Uploading...' : 'Submit'}
                            </Button>
                        </MainContent>
                    </form>
                </PageWrapper>
            </div>
        )
    }
}

export default CreateItinerary;

