// ========================================
// INQUISITIO
// Gestion de l'accueil
// Pack 1
// ========================================


import {
    equipeExiste,
    creerEquipe,
    recupererEquipe
} from "./firestore.js";



// Éléments de la page

const champNom = document.getElementById("nomEquipe");

const bouton = document.getElementById("btnCommencer");

const zoneErreur = document.getElementById("erreur");




// Vérifie si une équipe est déjà enregistrée sur ce téléphone

const ancienneEquipe = localStorage.getItem("equipe");



if(ancienneEquipe !== null){


    const equipe = await recupererEquipe(ancienneEquipe);


    if(equipe){


        window.location.href =
        "scan.html";

    }


}




// Création d'une équipe

bouton.addEventListener(
"click",
async function(){



    zoneErreur.textContent = "";



    const nomEquipe =
    champNom.value.trim();



    if(nomEquipe === ""){


        zoneErreur.textContent =
        "Veuillez entrer un nom d'équipe.";


        return;

    }




    bouton.disabled = true;

    bouton.textContent =
    "Création en cours...";




    try{


        const existe =
        await equipeExiste(nomEquipe);




        if(existe){


            zoneErreur.textContent =
            "Ce nom d'équipe existe déjà. Choisissez-en un autre.";


            bouton.disabled = false;

            bouton.textContent =
            "Commencer la mission";


            return;

        }





        await creerEquipe(nomEquipe);




        localStorage.setItem(
            "equipe",
            nomEquipe
        );




        window.location.href =
        "scan.html";



    }


    catch(erreur){


        console.error(erreur);


        zoneErreur.textContent =
        "Impossible de créer l'équipe. Vérifiez votre connexion.";



        bouton.disabled = false;

        bouton.textContent =
        "Commencer la mission";


    }



});
