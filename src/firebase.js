// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAxYgK7KOFz0leJL_y-FxwimwwwpDYlX_w",

  authDomain: "pawcare-7b021.firebaseapp.com",

  projectId: "pawcare-7b021",

  storageBucket: "pawcare-7b021.appspot.com",

  messagingSenderId: "386626875659",

  appId: "1:386626875659:web:6fe2528c989ed095c9f20e",

  measurementId: "G-EGX8EJT4Y0"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const analytics = getAnalytics(app);