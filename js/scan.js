// ========================================
// INQUISITIO
// Gestion des scans QR
// Pack 4
// ========================================


import {
    recupererEquipe,
    enregistrerScan
} from "./firestore.js";



// Récupération équipe

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


const barre =
document.getElementById("barreProgression");


const zoneVictoire =
document.getElementById("victoire");




// Vérification équipe

if(!nomEquipe){


    resultat.textContent =
    "⚠️ Aucune équipe";


    message.textContent =
    "Retournez à l'accueil.";


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






function afficherStatistiques(equipe){


    affichageScore.textContent =
    equipe.score;



    affichageSorcieres.textContent =
    equipe.sorcieres;



    affichageErreurs.textContent =
    equipe.erreurs;



    let progression =
    (equipe.sorcieres / 40) * 100;



    if(progression > 100){

        progression = 100;

    }



    barre.style.width =
    progression + "%";



    if(equipe.sorcieres >= 40){


        zoneVictoire.style.display =
        "block";


    }


}








// QR inconnu

if(!personnage){


    resultat.textContent =
    "⚠️ Parchemin inconnu";


    message.textContent =
    "Cette personne n'existe pas dans les archives.";

}


else{


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


        afficherStatistiques(equipe);




        // Déjà trouvé

        if(
            equipe.scans &&
            equipe.scans.includes(idPersonnage)
        ){


            resultat.textContent =
            "⚠️ Déjà découvert";


            message.textContent =
            "Votre équipe a déjà trouvé ce personnage.";


        }


        else{


            await enregistrerScan(
                nomEquipe,
                personnage
            );



            resultat.textContent =
            personnage.nom;



            if(personnage.points > 0){


                message.innerHTML =
                personnage.message
                +
                "<br><br>⭐ Vous gagnez "
                +
                personnage.points
                +
                " point.";

            }

            else{


                message.innerHTML =
                personnage.message
                +
                "<br><br>❌ Vous perdez "
                +
                Math.abs(personnage.points)
                +
                " point.";

            }





            // Rechargement des statistiques

            const nouvelleEquipe =
            await recupererEquipe(nomEquipe);



            afficherStatistiques(
                nouvelleEquipe
            );


        }


    }


}
