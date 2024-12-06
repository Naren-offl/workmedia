import { initializeApp } from "firebase/app";
import{getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDhb1idPUDcjXYoI0h4SDPHPG6rqvyc0U0",
  authDomain: "work-media-4add5.firebaseapp.com",
  projectId: "work-media-4add5",
  storageBucket: "work-media-4add5.appspot.com",
  messagingSenderId: "933713077920",
  appId: "1:933713077920:web:8ce80b6cb3cbef16440bc5"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)