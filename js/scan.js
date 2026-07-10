// ========================================
// INQUISITIO
// Gestion des scans QR
// Pack 2
// ========================================


import {
    recupererEquipe,
    enregistrerScan
} from "./firestore.js";



// Récupération de l'équipe

const nomEquipe =
localStorage.getItem("equipe");



const resultat =
document.getElementById("resultat");


const message =
document.getElementById("message");


const affichageEquipe =
document.getElementById("equipe");


const affichageScore =
document.getElementById("score");


const affichageSorcieres =
document.getElementById("sorcieres");


const affichageErreurs =
document.getElementById("erreurs");




// Vérification équipe

if(!nomEquipe){


    resultat.textContent =
    "⚠️ Aucune équipe";


    message.textContent =
    "Retournez à l'accueil pour créer votre équipe.";


    throw new Error(
        "Equipe absente"
    );

}




affichageEquipe.textContent =
nomEquipe;




// Récupération du QR Code

const parametres =
new URLSearchParams(
    window.location.search
);


const idPersonnage =
parametres.get("id");



const personnage =
personnages[idPersonnage];




// Si QR inconnu

if(!personnage){


    resultat.textContent =
    "⚠️ Parchemin inconnu";


    message.textContent =
    "Cette personne n'existe pas dans les archives.";


}

else{


    // Ajout de l'identifiant au personnage
    personnage.id =
    idPersonnage;



    const equipe =
    await recupererEquipe(nomEquipe);



    if(!equipe){


        resultat.textContent =
        "⚠️ Equipe introuvable";


        message.textContent =
        "Impossible de retrouver votre équipe.";


    }

    else{


        // Mise à jour des compteurs actuels

        affichageScore.textContent =
        equipe.score;


        affichageSorcieres.textContent =
        equipe.sorcieres + " / 40";


        affichageErreurs.textContent =
        equipe.erreurs;




        // Vérification double scan

        if(
            equipe.scans &&
            equipe.scans.includes(idPersonnage)
        ){


            resultat.textContent =
            "⚠️ Déjà découvert";


            message.textContent =
            "Votre équipe a déjà identifié cette personne.";


        }


        else{


            // Enregistrement Firebase

            await enregistrerScan(
                nomEquipe,
                personnage
            );



            // Affichage résultat

            resultat.textContent =
            personnage.nom;



            message.innerHTML =
            personnage.message
            +
            "<br><br>"
            +
            (
                personnage.points > 0
                ?
                "⭐ Vous gagnez "
                :
                "❌ Vous perdez "
            )
            +
            Math.abs(personnage.points)
            +
            " point(s).";




            // Mise à jour visuelle immédiate

            const nouvelleEquipe =
            await recupererEquipe(nomEquipe);



            affichageScore.textContent =
            nouvelleEquipe.score;


            affichageSorcieres.textContent =
            nouvelleEquipe.sorcieres
            +
            " / 40";


            affichageErreurs.textContent =
            nouvelleEquipe.erreurs;


        }


    }


}
