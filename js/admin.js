// ========================================
// INQUISITIO
// Administration sécurisée
// Pack 4
// ========================================


import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


import { db } from "./firebase.js";



// ================================
// Mot de passe administrateur
// ================================

const MOT_DE_PASSE_ADMIN = "0404";




// ================================
// Éléments HTML
// ================================

const connexionAdmin =
document.getElementById("connexionAdmin");


const zoneAdministration =
document.getElementById("zoneAdministration");


const boutonConnexion =
document.getElementById("connexion");


const champMotDePasse =
document.getElementById("motDePasse");


const erreurConnexion =
document.getElementById("erreurConnexion");


const boutonDeconnexion =
document.getElementById("deconnexion");


const zoneEquipes =
document.getElementById("equipes");


const boutonNouvellePartie =
document.getElementById("nouvellePartie");


const message =
document.getElementById("messageAdmin");




// ================================
// Vérification session
// ================================

if(
    sessionStorage.getItem("adminConnecte")
    ===
    "oui"
){

    ouvrirAdministration();

}




// ================================
// Connexion
// ================================

boutonConnexion.addEventListener(
"click",
function(){


    const motDePasse =
    champMotDePasse.value;



    if(
        motDePasse === MOT_DE_PASSE_ADMIN
    ){


        sessionStorage.setItem(
            "adminConnecte",
            "oui"
        );


        ouvrirAdministration();


    }

    else{


        erreurConnexion.textContent =
        "❌ Mot de passe incorrect.";


    }


});




// ================================
// Ouverture administration
// ================================

function ouvrirAdministration(){


    connexionAdmin.style.display =
    "none";


    zoneAdministration.style.display =
    "block";


    afficherEquipes();


}






// ================================
// Déconnexion
// ================================

boutonDeconnexion.addEventListener(
"click",
function(){


    sessionStorage.removeItem(
        "adminConnecte"
    );


    window.location.reload();


});







// ================================
// Affichage des équipes
// ================================

async function afficherEquipes(){


    zoneEquipes.innerHTML =
    "Chargement...";



    const resultat =
    await getDocs(
        collection(db,"equipes")
    );



    if(resultat.empty){


        zoneEquipes.innerHTML =
        "<p>Aucune équipe.</p>";


        return;

    }




    let html = "";



    resultat.forEach(
        (element)=>{


            const equipe =
            element.data();



            html += `

            <div class="carte-classement">


                <h3>
                ${equipe.nom}
                </h3>


                <p>
                ⭐ Score : ${equipe.score}
                </p>


                <p>
                🧙 Sorcières :
                ${equipe.sorcieres} / 40
                </p>


                <p>
                👩 Erreurs :
                ${equipe.erreurs}
                </p>


                <button onclick="supprimerEquipe('${element.id}')">

                ❌ Supprimer

                </button>


            </div>

            `;


        }
    );



    zoneEquipes.innerHTML =
    html;


}






// ================================
// Suppression équipe
// ================================

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







// ================================
// Nouvelle partie
// ================================

boutonNouvellePartie.addEventListener(
"click",
async function(){


    const confirmation =
    prompt(
        "Tapez RESET pour supprimer toutes les équipes."
    );



    if(
        confirmation !== "RESET"
    ){

        return;

    }





    const equipes =
    await getDocs(
        collection(db,"equipes")
    );



    const suppressions = [];



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
    "✅ Nouvelle partie prête.";


    afficherEquipes();


});
