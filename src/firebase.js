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
  firebase.auth().onAuthStateChanged(function(data){
    if (data){
      let userId = data.uid
      console.log(firebaseAuth.currentUser)
      console.log('logged in', userId)
      window.uid = data.uid;

      firebase.database().ref(`usersInfo/${userId}`).once('value').then((data) => {
        console.log("Data data data", data, data.val())
        let userDetails = data.val()
        window.fullName = `${userDetails.firstName} ${userDetails.lastName}`
        console.log("Full Name'", window.fullName)
      })
      console.log("Logged i", window.fullName)
    } else {
      console.log('not logged in')
    }
  });

  const firebaseAuth = firebase.auth();
  
  export { firebase, firebaseAuth, userData };