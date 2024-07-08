// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBle13XitMzYJljZ0mA8pYyGC7Suz19CK8",
    authDomain: "authu-46603.firebaseapp.com",
    projectId: "authu-46603",
    storageBucket: "authu-46603.appspot.com",
    messagingSenderId: "129382701246",
    appId: "1:129382701246:web:7568ca613670f0f62da6ef",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
