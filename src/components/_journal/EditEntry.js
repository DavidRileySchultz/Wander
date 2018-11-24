import React, { Component } from 'react';
import api from '../../api.js'
import auth from '../../auth.js'
import { Header, Button, Form, Grid, Input } from 'semantic-ui-react'
import Autocomplete from 'react-google-autocomplete';
import PickImage from "./PickImage"
import firebase from 'firebase'



const config = {
    apiKey: "AIzaSyANRTOu6PW7PLUeIlLd4S91EJxawTkbV2g",
    authDomain: "wander-d271d.firebaseapp.com",
    databaseURL: "https://wander-d271d.firebaseio.com",
    projectId: "wander-d271d",
    storageBucket: "wander-d271d.appspot.com",
    messagingSenderId: "93575872728"
};

// firebase.initializeApp(config);

const storage = firebase.storage()
const storageRef = storage.ref("")

class EditEntry extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            content: "",
            lat: "",
            lng: "",
            id: '',
            place:"",
            chosenPhoto: {
                fromOriginalEntryToEdit: null,
                userUploaded: true,
                urls: {
                    regular: null
                }
            }
        }
    }

    componentDidMount() {
        console.log('editEntry', this.props.match.params.id)
        api.requestSingleEntry(this.props.match.params.id, auth.getToken())
            .then(reply => {
                console.log("response came back with the entry info. Let's edit:",reply.body)
                this.setState(
                    {
                        title: reply.body.title,
                        content: reply.body.content,
                        id: reply.body.id,
                        place:reply.body.place,
                        lat: reply.body.lat,
                        lng: reply.body.lng,
                        chosenPhoto: {
                            fromOriginalEntryToEdit: true,
                            userUploaded: true,
                            urls: {
                                regular: reply.body.full_image_url
                            }
                        }
                    }
                )
            })
    }

    selectImage = (photo) => {
        this.setState({
            chosenPhoto: photo
        })
    }

    deleteChosenPhoto = () => {
        this.setState({
            chosenPhoto: null
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
        let entryPhoto = this.state.chosenPhoto;
        let entryDataObj = {
            title: this.state.title,
            content: this.state.content,
            place:this.state.place
        }

        const p1 = !!this.state.placeFormatted ? api.requestLatLong(this.state.placeFormatted)
            .then(object => {
                entryDataObj.lat = object.lat; entryDataObj.lng = object.lng
            }
            ) : null

        const p2 = !entryPhoto.fromOriginalEntryToEdit ? (
            entryPhoto.userUploaded ? (
                console.log("User chose to upload photo. Uploadng to Firebase:", entryPhoto),
                this.setState({ loadingWrite: true }),
                storageRef.child(`user_uploaded_photos/${auth.getUser().user_id}/${this.state.title}/${entryPhoto.name}`)
                    .put(entryPhoto)
                    .then(snapshot => {
                        entryDataObj.full_image_url = snapshot.downloadURL;
                        entryDataObj.thumbnail_image_url = snapshot.downloadURL;
                    })) 
                    
                    :
                
                (console.log("user chose an unSplash image, image urls are:", entryPhoto.urls),
                    entryDataObj.full_image_url = entryPhoto.urls.regular,
                    entryDataObj.thumbnail_image_url = entryPhoto.urls.thumb)
        ) 
        
        : 
        
        null

        Promise.all([p1, p2])
            .then(() => {
                console.log("creating an entry with obj:", entryDataObj);
                api.editSingleEntry(entryDataObj, auth.getToken(),this.props.match.params.id).then(
                    results => console.log(results)
                )
            })
            .then(() => this.props.reloadEntries())
            .then(() => this.props.history.push(`/dashboard/readentry/${this.state.id}`))
    }

    render() {
        console.log('edit entry state ', this.state)
        return (
            <div className="write-entry">
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 700 }}>
                        <PickImage
                            chosenPhoto={this.state.chosenPhoto}
                            selectImage={this.selectImage}
                            deleteChosenPhoto={this.deleteChosenPhoto}
                        />
                        <Header as="h2" textAlign="center">Edit your entry</Header>
                        <Form size="big" widths="equal" onKeyPress={this.handleKeyPress}>
                            <Form.Field>
                                <label>Give today a title</label>
                                <Input value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                            </Form.Field>
                            <Form.Field >
                                <label>What did you do today?</label>
                                <Input type="text" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} />
                            </Form.Field>
                            <Form.Field >
                                <label>Where did you go today?</label>
                                <Autocomplete placeholder={`${this.state.place}`}
                                    style={{ width: '90%' }} onPlaceSelected={(place) => {
                                        this.setState({
                                            lat: null,
                                            lng: null,
                                            place:place.name,
                                            placeFormatted: place.formatted_address
                                        });
                                        console.log("we formatted the user submitted address to:", place.formatted_address);
                                    }}
                                    types={[]}
                                    componentRestrictions={{}}
                                />
                            </Form.Field>
                            <Button onClick={this.handleSubmit}>{this.state.loadingWrite ? 'Uploading...' : 'Submit Changes'}</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default EditEntry;
