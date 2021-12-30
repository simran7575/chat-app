import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyAMdLL2e42n0WLdC1MbkReAizmZ5Pyp-SQ",
    authDomain: "chat-app-57920.firebaseapp.com",
    databaseURL: "https://chat-app-57920-default-rtdb.firebaseio.com",
    projectId: "chat-app-57920",
    storageBucket: "chat-app-57920.appspot.com",
    messagingSenderId: "544334510318",
    appId: "1:544334510318:web:5228ca586aaca586ea5bff"
};
const app  = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
export {db, auth};