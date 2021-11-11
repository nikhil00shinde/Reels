import firebase from "firebase/compat/app";

import config from "./config.json";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

firebase.initializeApp(config);

//flag => using google
let provider = new firebase.auth.GoogleAuthProvider();

// object jiske ander login/logout/signup ki functionality hain
export const auth = firebase.auth();

// getting object of firestore
export const firestore = firebase.firestore();

//getting storage object
export const storage = firebase.storage();

export const signInWithGoogle = () => {
	// ki muje popup ko use krke sign up krna with google
	auth.signInWithPopup(provider);
};

export default firebase;
