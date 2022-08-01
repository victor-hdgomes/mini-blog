import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBJstnOSdgDeyb1N2cQ5Zq8hWqdNmPD1pE",
  authDomain: "miniblog-b0da2.firebaseapp.com",
  projectId: "miniblog-b0da2",
  storageBucket: "miniblog-b0da2.appspot.com",
  messagingSenderId: "857538427853",
  appId: "1:857538427853:web:bd46846745103bb6f3a284"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };