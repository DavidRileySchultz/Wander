import React, { Component } from 'react';
import api from '../../api.js'
import auth from '../../auth.js'
import { Header, Button, Form, Grid, Input } from 'semantic-ui-react'
import firebase from 'firebase'



const config = {
    apiKey: "AIzaSyANRTOu6PW7PLUeIlLd4S91EJxawTkbV2g",
    authDomain: "wander-d271d.firebaseapp.com",
    databaseURL: "https://wander-d271d.firebaseio.com",
    projectId: "wander-d271d",
    storageBucket: "wander-d271d.appspot.com",
    messagingSenderId: "93575872728"
};

const storage = firebase.storage()
const storageRef = storage.ref("")

class EditItinerary extends Component {
    constructor() {
        super()
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

    componentDidMount() {
        console.log('editEntry', this.props.match.params.id)
        api.requestSingleEntry(this.props.match.params.id, auth.getToken())
            .then(reply => {
                console.log("response came back with the entry info. Let's edit:",reply.body)
                this.setState(
                    {
                        tripName: reply.body.tripName,
                        startDate: reply.body.startDate,
                        endDate: reply.body.endDate,
                        dayOne: reply.body.dayOne,
                        dayTwo: reply.body.dayTwo,
                        dayThree: reply.body.dayThree,
                        dayFour: reply.body.dayFour,
                        dayFive: reply.body.dayFive,
                        daySix: reply.body.daySix,
                        daySeven: reply.body.daySeven,
                        dayEight: reply.body.dayEight,
                        dayNine: reply.body.dayNine,
                        dayTen: reply.body.dayTen,
                        id: reply.body.id,                                                    
                    }
                )
            })
    }

    handleKeyPress = (event) => {
        if (event.which === 13) {
            event.preventDefault()
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitting form.")
        let entryDataObj = {
            tripName: this.state.tripName,
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
            dayTen: this.state.dayTen
        }

        Promise.all()
            .then(() => {
                console.log("creating an entry with obj:", entryDataObj);
                api.editSingleEntry(entryDataObj, auth.getToken(),this.props.match.params.id).then(
                    results => console.log(results)
                )
            })
            .then(() => this.props.reloadEntries())
            .then(() => this.props.history.push(`/dashboard/readitinerary/${this.state.id}`))
    }

    render() {
        console.log('edit itinerary state ', this.state)
        return (
            <div className="write-entry">
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 700 }}>
                        <Header as="h2" textAlign="center">Edit your Itinerary</Header>
                        <Form size="big" widths="equal" onKeyPress={this.handleKeyPress}>
                            <Form.Field>
                                <label>Give your Trip a Name</label>
                                <Input value={this.state.tripName} onChange={(e) => this.setState({ tripName: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Start Date</label>
                                <Input value={this.state.startDate} onChange={(e) => this.setState({ startDate: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>End Date</label>
                                <Input value={this.state.endDate} onChange={(e) => this.setState({ endDate: e.target.value })} />
                            </Form.Field>
                            <Form.Field >
                                <label>Day One</label>
                                <Input type="text" value={this.state.dayOne} onChange={(e) => this.setState({ dayOne: e.target.value })} />                                
                            </Form.Field>
                            <Form.Field>
                                <label>Day Two</label>
                                <Input type='text' value={this.state.dayTwo} onChange={(e) => this.setState({ dayTwo: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Day Three</label>
                                <Input type='text' value={this.state.dayThree} onChange={(e) => this.setState({ dayThree: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Day Four</label>
                                <Input type='text' value={this.state.dayFour} onChange={(e) => this.setState({ dayFour: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Day Five</label>
                                <Input type='text' value={this.state.dayFive} onChange={(e) => this.setState({ dayFive: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Day Six</label>
                                <Input type='text' value={this.state.daySix} onChange={(e) => this.setState({ daySix: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Day Seven</label>
                                <Input type='text' value={this.state.daySeven} onChange={(e) => this.setState({ daySeven: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Day Eight</label>
                                <Input type='text' value={this.state.dayEight} onChange={(e) => this.setState({ dayEight: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Day Nine</label>
                                <Input type='text' value={this.state.dayNine} onChange={(e) => this.setState({ dayNine: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Day Ten</label>
                                <Input type='text' value={this.state.dayTen} onChange={(e) => this.setState({ dayTen: e.target.value })} />
                            </Form.Field>
                            <Button onClick={this.handleSubmit}>{this.state.loadingWrite ? 'Uploading...' : 'Submit Changes'}</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default EditItinerary;
