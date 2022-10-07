import React, { useState, useEffect } from "react";

// React-Icons
import { AiOutlineDelete } from 'react-icons/ai';

import { FiSend } from 'react-icons/fi';



import { Link } from "react-router-dom";

// APIKALD
import { getNewsSubscription, deleteEmail } from "../../helpers/api";

import Loading from "../../compontents/Loading";
import Fejl from "../../compontents/Fejl";

// SCSS
import "../../scss/admin/AdminNewssubscription.scss"




const AdminTours = () => {

  const [newsSubscriptionData, setNewsSubscriptionData] = useState() // data/tekst mv. der skal rettes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State til håndtering om en tour er blevet slettet - eller om der opstod en fejl
  const [emailDeleted, setEmailDeleted] = useState()



  useEffect(() => {

    setLoading(true)

    getNewsSubscription()

      .then(data => {
        setNewsSubscriptionData(data);
        // Laver et kald til api'et hvis det går godt, smider den dataen ind i en state, som i dette tilfælde er setAboutcontent. Som ville få hele componentet til at re-render, hvis den ikke havde en dependencylist ( "[]" )

        // Der er 2 ændringer som kan få et compontent til at re-render, hvis der er en ændring i en state, eller i props.
        setError(false);
      })

      .catch((err) => {
        setError(true);
        setNewsSubscriptionData();
      })

      .finally(() => {
        setLoading(false)
      });

    // [] = En dependencylist når komponentet rerender, spørger den om den skal udfører useeffecten igen eller skal jeg lade vær. Denne dependency list lytter på om der er ændring i staten (setAboutcontent), hvis den ikke havde været der ville den stå og re-render i et uendeligt loop. 

  }, [emailDeleted])  // Lytter på omder bliver slettet en tour = re-render  = nyt api-kald

  // en tom [] dependencylist betyder at useEffect'en kun kører 1 gang => når compontentet loader første  gang (og IKKE ved re-render)




  const handleDelete = (Id, email) => {
    /* alert(Id) */

    if (window.confirm("Er du sikker på du vil slette tilmeldingen fra: " + email )) {

      // Den spørger om vi er sikre på om vi vil slette. Som består af true ("OK") og false ("Cancel")

      // Brugeren får lov til at vælge true eller false

      // Hvis brugeren svarer ok, bliver der ikke kørt handleDelete. If statement lytter på true eller false, for at se om den skal køre den kode der står i if statementen

      setLoading(true);

      deleteEmail(Id)
        .then((data) => {

            setEmailDeleted([true, Id])

        })

        .catch((err) => {

          console.log(err);

          setEmailDeleted(false)

        })

        .finally(() => {

          setLoading(false)

        })
    }

  }



  return (


    <section className="adminNewssubscriptionContainer">

      <h1 className="topBannerText">Administration af tilmedlte - Nyhedsbrev</h1>

      <figure className="tourBannerImg">
        <img src={process.env.PUBLIC_URL + "/img/newsmail-bg.jpg"} alt="billede af mars - fra turen Mars" />
      </figure>



      <div className="adminNewssubscriptionContentContainer">



        <h2>Admin Nyhedsbrev</h2>

        {
          // Hvis api-kaldet loader - den venter på error eller data
          loading && <Loading />
        }


        {
          // Hvis der er fejl fra api
          error && <Fejl fejlBesked=" Data kan ikke hentes, prøv senere... " />
        }

        {

            newsSubscriptionData &&
          <div className="cardContainer">

            {
              newsSubscriptionData.map(n =>

                <section className="card" key={n._id}>

                  <p>{n.email}</p>


                  <div className="iconContainer">
                    <AiOutlineDelete className="icons" size="2rem" color="red" onClick={() => handleDelete(n._id, n.email)} />

                    <a href={"mailto:" + n.email}> <FiSend className="icons" size="2rem" color="green" /></a>

                  </div>
                </section>
              )
            }

          </div>

        }

      </div>
    </section>
  );
};

export default AdminTours;
