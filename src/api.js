import { apiHost, unsplashHost, MAPS_API_URL, MAPS_API_KEY } from './_config/config.js';
import superagent from 'superagent';
import {firebase} from './firebase';

const database = firebase.database();

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

    requestEntries = (userId, days, searchTerm) => {
       return  firebase.database().ref('users/entries').once('value')

    }

    requestSingleEntry = (id, token) => {
        return superagent
            .get(`/api/entries/${id}`)
            .set('authorization', token)
    }

    createSingleEntry = (entryDataObj) => {
        // return superagent
        //     .post(`/api/entries`)
        //     .set('authorization', token)
        //     .send(entryDataObj)
        firebase.database().ref('users/entries').set({
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
        return superagent
            .post(`${MAPS_API_URL}address=${address}&key=${MAPS_API_KEY}`)
            .then(data => {
                const latLong =
                    {
                        lat: data.body.results[0].geometry.location.lat,
                        lng: data.body.results[0].geometry.location.lng
                    }
                return latLong
            }
        )
    }
}

export default new Api();