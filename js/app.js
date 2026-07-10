```javascript
// ========================================
// INQUISITIO
// Gestion de l'équipe
// Version Firebase 1.1
// ========================================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


// Vérifie si une équipe existe déjà

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


            const equipes = query(
                collection(db,"equipes"),
                where("nom","==",nom)
            );


            const resultat = await getDocs(equipes);


            let equipeId;


            if(!resultat.empty){

                equipeId = resultat.docs[0].id;


            } else {


                const nouvelleEquipe = await addDoc(
                    collection(db,"equipes"),
                    {
                        nom: nom,
                        score: 0,
                        trouvailles: []
                    }
                );


                equipeId = nouvelleEquipe.id;

            }



            localStorage.setItem(
                "equipeId",
                equipeId
            );


            localStorage.setItem(
                "equipeNom",
                nom
            );


            afficherCarte(nom);


        }

        catch(erreur){

            console.error(erreur);

            alert("Erreur de connexion Firebase.");

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

<button id="mission">
Commencer la mission
</button>

</div>

`;


document
.getElementById("mission")
.addEventListener("click", function(){

    window.location.href = "scan.html?id=S01";

});


}
```
