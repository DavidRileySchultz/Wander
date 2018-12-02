import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyANRTOu6PW7PLUeIlLd4S91EJxawTkbV2g",
    authDomain: "wander-d271d.firebaseapp.com",
    databaseURL: "https://wander-d271d.firebaseio.com",
    projectId: "wander-d271d",
    storageBucket: "wander-d271d.appspot.com",
    messagingSenderId: "93575872728"
  };


  if(!firebase.apps.length){
    firebase.initializeApp(config);
  }
 let userData = { uid: ''};
  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      userData = user;
      console.log(user.uid, '========>')
      console.log('logged in')
    } else {
      console.log('not logged in')
    }
  });

  const firebaseAuth = firebase.auth();

  const database = firebase.database();
  
  export { firebase, firebaseAuth, userData };