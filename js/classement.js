// ========================================
// INQUISITIO
// Classement en direct
// Pack 3
// ========================================


import {
    collection,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


import { db } from "./firebase.js";



const zoneClassement =
document.getElementById("classement");





const equipesRef =
collection(db,"equipes");





const classementQuery =
query(
    equipesRef,
    orderBy("score","desc")
);






onSnapshot(
    classementQuery,
    (snapshot)=>{


        if(snapshot.empty){


            zoneClassement.innerHTML =
            `
            <p>
            Aucune équipe inscrite.
            </p>
            `;


            return;

        }





        let html = "";

        let position = 1;




        snapshot.forEach(
            (document)=>{


                const equipe =
                document.data();



                let medaille = "";



                if(position === 1){

                    medaille = "🥇";

                }

                else if(position === 2){

                    medaille = "🥈";

                }

                else if(position === 3){

                    medaille = "🥉";

                }

                else{

                    medaille = "⚜️";

                }





                html +=
                `

                <div class="carte-classement">

                    <h2>
                    ${medaille}
                    ${position} - ${equipe.nom}
                    </h2>


                    <p>
                    ⭐ Score : ${equipe.score}
                    </p>


                    <p>
                    🧙 Sorcières : ${equipe.sorcieres} / 40
                    </p>


                    <p>
                    👩 Erreurs : ${equipe.erreurs}
                    </p>


                </div>


                `;



                position++;


            }
        );




        zoneClassement.innerHTML =
        html;



    },


    (erreur)=>{


        console.error(
            erreur
        );


        zoneClassement.innerHTML =
        `
        <p>
        Impossible de charger le classement.
        </p>
        `;


    }

);
