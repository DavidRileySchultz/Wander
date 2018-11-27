import React, { Component } from 'react';
import firebase from 'firebase';
import { Form, Grid, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import 'google-fonts';


const Wrapper = styled.div`
min-height: 100vh;
width: 100%;
background-size: cover;
background-repeat: no-repeat;
background-position: center;
height: 100%;
verticalAlign: center;
background-color: rgb(242, 242, 242);
`;

const AuthButton = styled.button`
margin: 9px .25em 1em 0em;
padding: 0.69em 1.15em;
font-weight: 700;
line-height: 1em;
border-radius: 0.28rem;
font-size: 1.14rem;
background-color: rgb(47,67,88);
color: #fdfbf9;
font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
width: 100%;
`;

const SEFHeader = styled.h1`
  font-family: 'Sue Ellen Francisco', cursive;
  font-size: 4em;
  color: rgb(47,67,88);
`;

class CreateAccount extends Component {
    constructor() {
      super()
      this.state = {
        email: '',
        password: '',
        missingInput: false,
      }
    }

    handleInputChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const { email, password } = this.state;
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.props.history.push('/');
        })
        .catch((error) => {
          this.setState({ error: error})
        })
    }
  
    // handleSubmit = (event) => {
    //   event.preventDefault();
    //   const userRef = firebase.database().ref('users');
    //   if(this.state.firstName && this.state.lastName && this.state.email && this.state.password) {
    //     userRef.createAccount(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
    //     .then(response => console.log('login reply: ', response))
    //     .then(() => this.props.history.push("/login"))
    //     .catch(err => {
    //       console.log('error ', err);
    //       this.props.history.push("/dashboard")
    //     })
    //   }
    //   else {this.setState( {missingInput: true})
  
      // }
      //   }
    
        render() {
            return (
              <Wrapper>
                <style>{`
                body > div,
                body > div > div,
                body > div > div > Wrapper{
                  height: 100%;
                }
              `}</style>
        
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <SEFHeader>Create Account</SEFHeader>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Input type='email' placeholder="Email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                      <Form.Input icon='lock' iconPosition='left' type='password' placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}  />                      
                       {this.state.missingInput && (<Header as="h5" color="red" textAlign="center">Looks like you forgot something</Header>)}
                      <AuthButton>Create</AuthButton>
                    </Form>
                  </Grid.Column>
                </Grid>        
              </Wrapper>
            );
          }
        }
        
        export default CreateAccount;

