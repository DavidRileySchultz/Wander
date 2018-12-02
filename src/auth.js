import api from './api.js';
import { firebase, firebaseAuth} from './firebase';

export default {

    createAccount(email, password) {        
            return api.createAccount(email, password)
    },

    login(email, password) {
            return api.requestLogin(email, password)
                .then(resp => firebase.token = resp.body.token)
                .then(resp => api.requestUserObject(this.getToken()))
                .then(resp => firebase.userObject = JSON.stringify(resp.body))
    },

    getToken() {
        console.log(firebase.token, 'token ==[=>')
        return firebase.token;
    },

    getUser() {
        return firebase.UID ?
         JSON.parse(firebase.UID)
        : null
    },

    logOut(token) {
       return api.requestLogout(token)
            .then(() => {
                delete firebase.token;
                delete firebase.userObject
            })
            .catch((err) => {
                delete firebase.token;
                delete firebase.userObject
            })
    },

    isLoggedIn() {

    }
}