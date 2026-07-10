// =====================================
// INQUISITION
// Générateur de QR Codes
// Version 0.1
// =====================================


function generer(){


    const zone = document.getElementById("zone");


    zone.innerHTML = "";



    for(let id in personnages){


        let bloc = document.createElement("div");

        bloc.className = "qr";



        let titre = document.createElement("h3");

        titre.innerHTML =
        personnages[id].nom
        +
        "<br>"
        +
        id;



        let qr = document.createElement("div");


        qr.id = "qr-" + id;



        bloc.appendChild(titre);

        bloc.appendChild(qr);


        zone.appendChild(bloc);



        // Création du lien

        let adresse =

        window.location.origin
        +
        "/scan.html?id="
        +
        id;



        new QRCode(

            qr,

            {

            text:adresse,

            width:150,

            height:150

            }

        );


    }


}
