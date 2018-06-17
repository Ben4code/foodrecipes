import firebase from 'firebase';
import firestore from 'firebase/firestore';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCFfvw0mL-xnad1vd8ZkJ3tFdRRxHe5dj4",
    authDomain: "fooditem-cb0fe.firebaseapp.com",
    databaseURL: "https://fooditem-cb0fe.firebaseio.com",
    projectId: "fooditem-cb0fe",
    storageBucket: "fooditem-cb0fe.appspot.com",
    messagingSenderId: "320535819353"
  };
  const firebaseApp = firebase.initializeApp(config);
  
  //Error fix in console
  firebaseApp.firestore().settings({ timestampsInSnapshots: true})

  export default firebaseApp.firestore();