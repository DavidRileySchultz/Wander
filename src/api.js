import { unsplashHost, MAPS_API_URL, MAPS_API_KEY } from './_config/config.js';
import superagent from 'superagent';
import firebase from 'firebase';
import { } from "./firebase";

class Api {
    createAccount = (email, password) => {
        return superagent
            .post(`/api/auth/create-account`)
            .send({ email, password })
    }

    requestUserObject = (token) => {
        return superagent
            .get(`/api/auth/me`)
            .set('authorization', token)
    }

    requestLogin = (email, password) => {
        return superagent
            .post(`/api/auth/login`)
            .send({ email, password })   
    }

    requestEntries = () => {
        let userId = window.uid
       return  firebase.database().ref(`users/entries/${userId}/personal`).once('value')
    }

    createNewGroup = (groupObj) => {
        let userId = window.uid
        return firebase.database().ref(`groups`).push({
            groupObj: groupObj
        }).then((group, b) => {

            console.log("ID: g", group.id, "Key", group.name) 
            return firebase.database().ref(`users/entries/${userId}/groups`).push({
                id: group.key,
                name: groupObj.name
            })
        })
    }

    displayGroups() {
        firebase.database().ref(`users/entries/${firebase.auth().currentUser.uid}/groups`).once('value').then((data) => {
            console.log("GROUPS GROUPS!!! ", data.val())
        })        
    }

    requestSingleEntry = (id, token) => {
        let userId = window.uid
        console.log("Current Entry =====++===>>> ", firebase.auth().currentUser.uid)
        return firebase.database().ref(`users/entries/${userId}/personal/${id}`).once('value')
    }

    createSingleEntry = (entryDataObj) => {
        let userId = firebase.auth().currentUser.uid
        return firebase.database().ref(`users/entries/${userId}/personal`).push({
            entryDataObj: entryDataObj
        });
    }

    editSingleEntry = (entryDataObj, token, entry_id) => {
        return superagent
            .post(`/api/entries/${entry_id}`)
            .set('authorization', token)
            .send(entryDataObj)
    }

    createSingleItinerary = (itineraryDataObj, token) => {
        return superagent
            .post(`/api/itineraries`)
            .set('authorization', token)
            .send(itineraryDataObj)
    }

    requestSingleItinerary = (id, token) => {
        return superagent   
            .get(`/api/itineraries${id}`)
            .set('authorization', token)
    }
    editSingleItinerary = (itineraryDataObj, token, itinerary_id) => {
        return superagent
            .post(`/api/intineraries/${itinerary_id}`)
            .set('authorization', token)
            .send(itineraryDataObj)
    }

    getUnsplashImage = (searchQuery) => {
        console.log("searching for images with query:", searchQuery)
        return superagent
            .get(`${unsplashHost}/photos/random/?client_id=7f92d3ebf06a461e3f677efbacab2e65ea790ac68f8eac6c7d46794de6da3bcf&orientation=landscape&query=${searchQuery}`)
    }

    getUnsplashMultiple = (searchQuery,count) => {
        console.log("searching for",count,"images with query:", searchQuery)
        return superagent
            .get(`${unsplashHost}/photos/random/?client_id=7f92d3ebf06a461e3f677efbacab2e65ea790ac68f8eac6c7d46794de6da3bcf&orientation=landscape&query=${searchQuery}&count=${count}`)
    }

    requestLogout = (token) => {
        return superagent
            .delete(`/api/auth/logout`)
            .set('authorization', token)
            .then(response => console.log(response))
    }

    requestDeleteEntry = (id, token) => {
        console.log("Is deleting...")
        return superagent
            .delete(`/api/entries/${id}`)
            .set('authorization', token)
            .then(reply => console.log('working', reply))
    }

    requestDeleteItinerary = (id, token) => {
        return superagent
            .delete(`/api/itineraries/${id}`)
            .set('authorization', token)
            .then(reply => console.log('working', reply))
    }

    requestLatLong = (address) => {
        console.log("Address: ", address)
        return superagent
            .post(`${MAPS_API_URL}address=${address}&key=${MAPS_API_KEY}`)
            .then(data => {
                console.log("Data: ", data)
                const latLong =
                    {
                        lat: data.body.results[0].geometry.location.lat,
                        lng: data.body.results[0].geometry.location.lng
                    }
                return latLong
            }
        )
    }
    requestGetImage = (imageURL) => {
            return fetch(imageURL)
            .then(response => {
                console.log("Response: ", response)
                return response.blob()
            })
            .then((image) => {
                image.lastModifiedDate = new Date()
                image.name = `image${Math.random()}.jpg`
                image.urls={regular:URL.createObjectURL(image),thumb:URL.createObjectURL(image)}
                image.links = {
                    html: imageURL
                }
                image.userUploaded=false
                return image
            })
    }
}

export default new Api();