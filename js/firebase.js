// ========================================
// INQUISITIO
// Configuration Firebase
// Pack 1
// ========================================


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";



// Configuration du projet Firebase

const firebaseConfig = {

    apiKey: "AIzaSyAGkWiSUykzzGuz_PgcVTfVeFLkHB9Mj3",

    authDomain: "inquisitio-halloween.firebaseapp.com",

    projectId: "inquisitio-halloween",

    storageBucket: "inquisitio-halloween.firebasestorage.app",

    messagingSenderId: "191062565005",

    appId: "1:191062565005:web:54b0eb60e2bf81d52282c4"

};



// Initialisation Firebase

const app = initializeApp(firebaseConfig);


// Connexion Firestore

const db = getFirestore(app);



export { db };
