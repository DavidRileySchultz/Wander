import React, { Component } from 'react';
import api from '../../api.js'
import auth from '../../auth.js';
import { Grid, Segment, Header,Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {Form,  Input } from 'semantic-ui-react';
import PickGroupImage from './PickGroupImage';
import firebase from 'firebase';
import styled from 'styled-components'

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
    flex-direction: column;
    display: flex;
`

const Question = styled.header`
  font-family: 'Roboto Slab';
  width: 90%;
`


class WriteGroupEntry extends Component {
    constructor() {
        super();
        this.state = {
          groupTitle: '',
          groupContent: ''
        };
      }

      selectImage = photo => {
        this.setState({
          chosenPhoto: photo
        });
      };

      deleteChosenPhoto = () => {
        this.setState({
          chosenPhoto: null
        });
      };

      handleKeyPress = event => {
        if (event.which === 13) {
          event.preventDefault();
        }
      };

      handleSubmit = event => {
        event.preventDefault();    
        console.log('submitting form.');
        let entryPhoto = this.state.chosenPhoto;
        let entryDataObj = {
          title: this.state.groupTitle,
          content: this.state.groupContent
        };

        const p2 = entryPhoto.userUploaded
          ? (console.log(
              'User chose to upload photo. Uploadng to Firebase:',
              entryPhoto
            ),
            this.setState({ loadingWrite: true }),
            firebase
              .child(
                `user_uploaded_photos/${auth.getGroup().group_id}/${
                  this.state.groupTitle
                }/${entryPhoto.name}`
              )
              .put(entryPhoto)
              .then(snapshot => {
                entryDataObj.full_image_url = snapshot.downloadURL;
                entryDataObj.thumbnail_image_url = snapshot.downloadURL;
              }))
          : 

            (console.log(
              'user chose an unSplash image, image urls are:',
              entryPhoto.urls
            ),
            (entryDataObj.full_image_url = entryPhoto.urls.regular),
            (entryDataObj.thumbnail_image_url = entryPhoto.urls.thumb));

            Promise.all([p2])
            .then(() => {
              console.log('creating an entry with obj:', entryDataObj);
              api
                .createSingleEntry(entryDataObj, auth.getToken())
                .then(results => console.log(results));
            })
            .then(() => this.props.reloadEntries())
            .then(() => this.props.history.push('/dashboard'));
        };
       
          render() {
    return (
      <div style={{display: 'flex', 'align-content': 'center', 'justify-content': 'center'}} >    
          <PageWrapper>
          <PickGroupImage
              chosenPhoto={this.state.chosenPhoto}
              selectImage={this.selectImage}
              deleteChosenPhoto={this.deleteChosenPhoto}
            />
            <TitleWrapper>
              <Title>Write a new group entry</Title>
            </TitleWrapper>
             <form>
             <MainContent>
             <ContentWrapper>
              <QuestionWrapper>
                <Question>Title</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <Input
                  value={this.state.groupTitle}
                  onChange={e => this.setState({ groupTitle: e.target.value })}
                />
              </AnswerWrapper>
             </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>What did you do today?</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <Input
                  type="text"
                  value={this.state.groupContent}
                  onChange={e => this.setState({ groupContent: e.target.value })}
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

export default WriteGroupEntry;