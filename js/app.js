// ========================================
// INQUISITIO
// Gestion du joueur
// Version 0.1
// ========================================

// Vérifie si un inquisiteur existe déjà

let ancienInquisiteur = localStorage.getItem("inquisiteur");


if(ancienInquisiteur !== null){


    document.addEventListener("DOMContentLoaded", function(){


        document.body.innerHTML = `

        <div class="carte">

        <h1>⚜️ CARTE D'INQUISITEUR</h1>

        <h2>
        Ordre du Grand Tribunal
        </h2>


        <p>
        Nom de l'inquisiteur :
        </p>


        <h2>
        ${ancienInquisiteur}
        </h2>


        <hr>


        <h3>
        🧙 Sorcières trouvées : 0 / 40
        </h3>


        <h3>
        👩 Erreurs : 0
        </h3>


        <button>
        Continuer la mission
        </button>


        </div>

        `;


    });


}

const bouton = document.querySelector("button");

const champNom = document.querySelector("input");


bouton.addEventListener("click", function(){


    let nom = champNom.value.trim();


    if(nom === ""){

        alert("Veuillez entrer votre nom d'inquisiteur.");

        return;

    }


    // Enregistrement du joueur sur le téléphone

    localStorage.setItem(
        "inquisiteur",
        nom
    );


    // Passage à la carte d'inquisiteur

    document.body.innerHTML = `

    <div class="carte">

        <h1>⚜️ CARTE D'INQUISITEUR</h1>

        <h2>
        Ordre du Grand Tribunal
        </h2>


        <p>
        Nom de l'inquisiteur :
        </p>


        <h2>
        ${nom}
        </h2>


        <hr>


        <p>
        Mission :
        </p>


        <p>
        Identifier les sorcières cachées
        dans la médiathèque.
        </p>


        <h3>
        🧙 Sorcières trouvées : 0 / 40
        </h3>


        <h3>
        👩 Erreurs : 0
        </h3>


        <br>


        <button onclick="alert('La mission commencera bientôt !')">
        Recevoir la mission
        </button>


    </div>

    `;


});
