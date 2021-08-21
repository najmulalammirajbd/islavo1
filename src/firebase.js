import firebase from 'firebase/firebase'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyCgkgA565HbPrKBg1Mhj9t5HsNcmUNkzv8",
  authDomain: "islavo.firebaseapp.com",
  projectId: "islavo",
  storageBucket: "islavo.appspot.com",
  messagingSenderId: "742033489853",
  appId: "1:742033489853:web:4ce5eea32657d9afbd1cd4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
