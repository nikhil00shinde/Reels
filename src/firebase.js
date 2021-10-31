import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAylMWF3xbg2CLNfpKU5YYBQl8QLUVdZP8",
	authDomain: "reels-cd769.firebaseapp.com",
	projectId: "reels-cd769",
	storageBucket: "reels-cd769.appspot.com",
	messagingSenderId: "222432404729",
	appId: "1:222432404729:web:d2cda7a47a769b395cae28",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
