/**
 * Firebase Login
 * Firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase 
let config = {
    apiKey: "AIzaSyC1-h8rCnZxHlmurFYnZyWlFsULuSqJ-rI",
    authDomain: "automated-trader-c5bca.firebaseapp.com",
    databaseURL: "https://automated-trader-c5bca.firebaseio.com",
    projectId: "automated-trader-c5bca",
    storageBucket: "automated-trader-c5bca.appspot.com",
    messagingSenderId: "616078201114"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const database = firebase.database();

export {
    auth,
    googleAuthProvider,
    githubAuthProvider,
    facebookAuthProvider,
    twitterAuthProvider,
    database
};
