import api from './api.js'

export default {
    createAccount(firstName, lastName, email, password) {
        
            return api.createAccount(firstName, lastName, email, password)
    },

    login(email, password) {
            return api.requestLogin(email, password)
                .then(resp => localStorage.token = resp.body.token)
                .then(resp => api.requestUserObject(this.getToken()))
                .then(resp => localStorage.userObject = JSON.stringify(resp.body))
    },

    getToken() {
        return localStorage.token;
    },

    getUser() {
        return localStorage.userObject ?
         JSON.parse(localStorage.userObject)
        : null
    },

    logOut(token) {
       return api.requestLogout(token)
            .then(() => {
                delete localStorage.token;
                delete localStorage.userObject
            })
            .catch((err) => {
                delete localStorage.token;
                delete localStorage.userObject
            })
    },

    isLoggedIn() {

    }
}