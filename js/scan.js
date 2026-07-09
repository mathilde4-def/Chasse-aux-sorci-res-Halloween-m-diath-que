// =====================================
// INQUISITIO
// Gestion des scans
// Version 0.2
// =====================================


const parametres = new URLSearchParams(
    window.location.search
);


const idPersonnage = parametres.get("id");



const personnage = personnages[idPersonnage];


const resultat = document.getElementById("resultat");

const message = document.getElementById("message");



let trouvailles = JSON.parse(
    localStorage.getItem("trouvailles")
)
|| [];





if(personnage){


    // Vérifie si déjà trouvé

    if(trouvailles.includes(idPersonnage)){


        resultat.innerHTML =
        "⚠️ Déjà découvert";


        message.innerHTML =
        "Ce personnage a déjà été identifié par votre équipe.";


    }


    else{


        // Ajout de la découverte

        trouvailles.push(idPersonnage);


        localStorage.setItem(
            "trouvailles",
            JSON.stringify(trouvailles)
        );



        resultat.innerHTML =
        "🧙 " + personnage.nom;



        message.innerHTML =
        personnage.message
        +
        "<br><br>"
        +
        "⭐ Vous gagnez "
        +
        personnage.points
        +
        " point !";


    }


}



else{


    resultat.innerHTML =
    "⚠️ Parchemin inconnu";


    message.innerHTML =
    "Cette personne n'existe pas dans les archives.";

}
