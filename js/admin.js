// ========================================
// INQUISITIO
// Administration
// Pack 3
// ========================================


import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


import { db } from "./firebase.js";



const zoneEquipes =
document.getElementById("equipes");


const boutonNouvellePartie =
document.getElementById("nouvellePartie");


const message =
document.getElementById("messageAdmin");





// Affichage des équipes

async function afficherEquipes(){


    zoneEquipes.innerHTML =
    "Chargement...";



    const resultat =
    await getDocs(
        collection(db,"equipes")
    );



    if(resultat.empty){


        zoneEquipes.innerHTML =
        `
        <p>
        Aucune équipe enregistrée.
        </p>
        `;


        return;

    }




    let html = "";





    resultat.forEach(
        (element)=>{


            const equipe =
            element.data();



            html +=
            `

            <div class="carte-classement">


                <h3>
                ${equipe.nom}
                </h3>


                <p>
                ⭐ Score : ${equipe.score}
                </p>


                <p>
                🧙 Sorcières : ${equipe.sorcieres} / 40
                </p>


                <p>
                👩 Erreurs : ${equipe.erreurs}
                </p>


                <button
                onclick="supprimerEquipe('${element.id}')">

                ❌ Supprimer

                </button>


            </div>

            `;


        }
    );



    zoneEquipes.innerHTML =
    html;


}





// Suppression d'une équipe

window.supprimerEquipe =
async function(id){


    if(
        confirm(
            "Supprimer cette équipe ?"
        )
    ){


        await deleteDoc(
            doc(db,"equipes",id)
        );


        afficherEquipes();


    }


};







// Nouvelle partie

boutonNouvellePartie.addEventListener(
"click",
async function(){



    if(
        !confirm(
            "ATTENTION : supprimer toutes les équipes ?"
        )
    ){

        return;

    }





    const equipes =
    await getDocs(
        collection(db,"equipes")
    );




    const suppressions =
    [];




    equipes.forEach(
        (element)=>{


            suppressions.push(

                deleteDoc(
                    doc(
                        db,
                        "equipes",
                        element.id
                    )
                )

            );


        }
    );




    await Promise.all(
        suppressions
    );



    message.textContent =
    "Nouvelle partie prête !";



    afficherEquipes();


});







// Chargement initial

afficherEquipes();
