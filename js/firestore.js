// ========================================
// INQUISITIO
// Gestion Firestore
// Pack 1
// ========================================


import {
    collection,
    doc,
    getDoc,
    setDoc,
    query,
    where,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


import { db } from "./firebase.js";



// Vérifie si un nom d'équipe existe déjà

export async function equipeExiste(nomEquipe){


    const equipesRef = collection(db,"equipes");


    const recherche = query(
        equipesRef,
        where("nom","==",nomEquipe)
    );


    const resultat = await getDocs(recherche);


    return !resultat.empty;

}



// Crée une nouvelle équipe

export async function creerEquipe(nomEquipe){


    const equipeRef = doc(
        db,
        "equipes",
        nomEquipe
    );


    await setDoc(
        equipeRef,
        {

            nom: nomEquipe,

            score:0,

            sorcieres:0,

            erreurs:0,

            scans:[],

            creeLe:serverTimestamp()

        }
    );


    return true;

}



// Récupère une équipe existante

export async function recupererEquipe(nomEquipe){


    const equipeRef = doc(
        db,
        "equipes",
        nomEquipe
    );


    const resultat = await getDoc(equipeRef);



    if(resultat.exists()){

        return resultat.data();

    }


    return null;

}
