import firebase from "firebase";
import config from "./config";
var firebaseConfig = config;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
