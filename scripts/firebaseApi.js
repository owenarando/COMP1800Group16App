//---------------------------------------------------------------------
// Your web app's Firebase configuration;
// Specifies which firebase project your application is connected with.
//---------------------------------------------------------------------

var firebaseConfig = {

    // Your API stuff goes here;  get it from firebase console
  
    apiKey: "AIzaSyA0xZVGk19xV7h2lDY1dgBFU8gPprsdH8c",
    authDomain: "mango-83ae0.firebaseapp.com",
    databaseURL: "https://mango-83ae0.firebaseio.com",
    projectId: "mango-83ae0",
    storageBucket: "mango-83ae0.appspot.com",
    messagingSenderId: "1006915683730",
    appId: "1:1006915683730:web:46dd4d2ee5856bb83c2d4b"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Create the Firestore database object
  // Henceforce, any reference to the database can be made with "db"
  const db = firebase.firestore();