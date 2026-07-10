// ========================================
// INQUISITIO
// Gestion de l'équipe
// Version Firebase 1.0
// ========================================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


// Vérifie si une équipe existe déjà sur ce téléphone

let ancienneEquipe = localStorage.getItem("equipeId");
let ancienNom = localStorage.getItem("equipeNom");


document.addEventListener("DOMContentLoaded", function(){


    if(ancienneEquipe && ancienNom){

        afficherCarte(ancienNom);

        return;

    }


    const bouton = document.querySelector("button");
    const champNom = document.querySelector("input");


    bouton.addEventListener("click", async function(){


        let nom = champNom.value.trim();


        if(nom === ""){

            alert("Veuillez entrer un nom d'équipe.");

            return;

        }


        try {


            // Vérifie si le nom existe déjà

            const equipes = query(
                collection(db,"equipes"),
                where("nom","==",nom)
            );


            const resultat = await getDocs(equipes);


            let equipe;


            if(!resultat.empty){

                equipe = resultat.docs[0].id;


            } else {


                const nouvelleEquipe = await addDoc(
                    collection(db,"equipes"),
                    {
                        nom: nom,
                        score: 0,
                        trouvailles: []
                    }
                );


                equipe = nouvelleEquipe.id;

            }



            localStorage.setItem(
                "equipeId",
                equipe
            );


            localStorage.setItem(
                "equipeNom",
                nom
            );


            afficherCarte(nom);


        }

        catch(erreur){

            console.error(erreur);

            alert("Erreur de connexion au serveur.");

        }


    });


});





function afficherCarte(nom){


document.body.innerHTML = `

<div class="carte">


<h1>⚜️ CARTE D'INQUISITEUR</h1>


<h2>
Ordre du Grand Tribunal
</h2>


<p>
Nom de l'équipe :
</p>


<h2>
${nom}
</h2>


<hr>


<h3>
🧙 Sorcières trouvées : 0 / 40
</h3>


<h3>
⭐ Score : 0
</h3>


<br>


<button onclick="alert('La mission commence !')">
Recevoir la mission
</button>


</div>

`;


}
