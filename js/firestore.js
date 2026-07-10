// ========================================
// INQUISITION
// Gestion Firestore
// Pack 2
// ========================================


import {
    collection,
    doc,
    getDoc,
    setDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
    updateDoc,
    arrayUnion,
    increment
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


import { db } from "./firebase.js";



// Vérifie si un nom d'équipe existe

export async function equipeExiste(nomEquipe){


    const equipesRef = collection(db,"equipes");


    const recherche = query(
        equipesRef,
        where("nom","==",nomEquipe)
    );


    const resultat = await getDocs(recherche);


    return !resultat.empty;

}



// Création d'une équipe

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

}



// Récupérer une équipe

export async function recupererEquipe(nomEquipe){


    const equipeRef =
    doc(db,"equipes",nomEquipe);


    const resultat =
    await getDoc(equipeRef);



    if(resultat.exists()){

        return resultat.data();

    }


    return null;

}




// Enregistrer un nouveau scan

export async function enregistrerScan(
    nomEquipe,
    personnage
){


    const equipeRef =
    doc(db,"equipes",nomEquipe);



    const points =
    personnage.points;



    let modification = {

        scans: arrayUnion(personnage.id),

        score: increment(points)

    };




    if(personnage.type === "sorciere"){


        modification.sorcieres =
        increment(1);

    }


    else{


        modification.erreurs =
        increment(1);

    }




    await updateDoc(
        equipeRef,
        modification
    );


}
