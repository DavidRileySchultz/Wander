import { apiHost, unsplashHost, MAPS_API_URL, MAPS_API_KEY } from './_config/config.js';
import superagent from 'superagent';


class Api {
    createAccount = (firstName, lastName, email, password) => {
        return superagent
            .post(`${apiHost}/api/auth/create-account`)
            .send({ firstName, lastName, email, password })
    }

    requestUserObject = (token) => {
        return superagent
            .get(`${apiHost}/api/auth/me`)
            .set('authorization', token)
    }

    requestLogin = (email, password) => {
        return superagent
            .post(`${apiHost}/api/auth/login`)
            .send({ email, password })   
    }

    requestEntries = (token, days, searchTerm) => {
        console.log("requesting entries in last", days, "days.",
            `using searchterm ${searchTerm}`)
        return superagent
            .get(`${apiHost}/api/entries`)
            .set({
                'authorization': token,
                'days': days,
                'searchTerm': searchTerm
            })
    }

    requestSingleEntry = (id, token) => {
        return superagent
            .get(`${apiHost}/api/entries/${id}`)
            .set('authorization', token)
    }

    createSingleEntry = (entryDataObj, token) => {
        return superagent
            .post(`${apiHost}/api/entries`)
            .set('authorization', token)
            .send(entryDataObj)
    }

    editSingleEntry = (entryDataObj, token, entry_id) => {
        return superagent
            .post(`${apiHost}/api/entries/${entry_id}`)
            .set('authorization', token)
            .send(entryDataObj)
    }

    createSingleItinerary = (itineraryDataObj, token) => {
        return superagent
            .post(`${apiHost}/api/itineraries`)
            .set('authorization', token)
            .send(itineraryDataObj)
    }

    requestSingleItinerary = (id, token) => {
        return superagent   
            .get(`${apiHost}/api/itineraries${id}`)
            .set('authorization', token)
    }
    editSingleItinerary = (itineraryDataObj, token, itinerary_id) => {
        return superagent
            .post(`${apiHost}/api/intineraries/${itinerary_id}`)
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
            .delete(`${apiHost}/api/auth/logout`)
            .set('authorization', token)
            .then(response => console.log(response))
    }

    requestDeleteEntry = (id, token) => {
        return superagent
            .delete(`${apiHost}/api/entries/${id}`)
            .set('authorization', token)
            .then(reply => console.log('working', reply))
    }

    requestDeleteItinerary = (id, token) => {
        return superagent
            .delete(`${apiHost}/api/itineraries/${id}`)
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