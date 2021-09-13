import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage";
import FIREBASE_CONFIG from "./firebaseConfig"

const Firebase =firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseDate=firebase.firestore.FieldValue.serverTimestamp()
export const firebaseAuth=Firebase.auth()
export const firebaseDB=Firebase.firestore()
export const firebaseStorage=Firebase.storage()