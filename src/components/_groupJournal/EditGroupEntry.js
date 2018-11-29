import React, { Component } from 'react';
import api from '../../api.js';
import auth from '../../auth.js';
import { Header, Button, Form, Grid, Input } from 'semantic-ui-react';
import PickImage from "./PickImage";
import firebase from 'firebase';


class EditEntry extends Component {
    constructor() {
        super()
        this.state = {
            groupTitle: "",
            groupContent: "",
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
                        groupTitle: reply.body.groupTitle,
                        groupContent: reply.body.groupContent,
                        id: reply.body.id,
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
            groupTitle: this.state.groupTitle,
            groupContent: this.state.groupContent,
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
                            <Button onClick={this.handleSubmit}>{this.state.loadingWrite ? 'Uploading...' : 'Submit Changes'}</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default EditEntry;
