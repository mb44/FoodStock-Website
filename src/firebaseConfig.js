import Firebase from 'firebase'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxlo2I0gI-2c5nb3w9feXabKInEvVotj8",
    authDomain: "foodwastereduction-6ca48.firebaseapp.com",
    databaseURL: "https://foodwastereduction-6ca48.firebaseio.com",
    projectId: "foodwastereduction-6ca48",
    storageBucket: "foodwastereduction-6ca48.appspot.com",
    messagingSenderId: "1042753730745"
  };
  const firebaseApp = Firebase.initializeApp(config);
  const db = firebaseApp.database();
  export const containerRef = db.containerRef('/containers')