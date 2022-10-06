import React, { useState, useEffect } from "react";

// React-Icons
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';

import { Link } from "react-router-dom";

// APIKALD
import { getAllTours, deleteTour } from "../../helpers/api";

import Loading from "../../compontents/Loading";
import Fejl from "../../compontents/Fejl";

// SCSS
import "../../scss/admin/AdminTours.scss"




const AdminTours = () => {

  const [tours, setTours] = useState() // data/tekst mv. der skal rettes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State til håndtering om en tour er blevet slettet - eller om der opstod en fejl
  const [tourDeleted, setTourDeleted] = useState()



  useEffect(() => {

    setLoading(true)

    getAllTours()

      .then(data => {
        setTours(data);
        // Laver et kald til api'et hvis det går godt, smider den dataen ind i en state, som i dette tilfælde er setAboutcontent. Som ville få hele componentet til at re-render, hvis den ikke havde en dependencylist ( "[]" )

        // Der er 2 ændringer som kan få et compontent til at re-render, hvis der er en ændring i en state, eller i props.
        setError(false);
      })

      .catch((err) => {
        setError(true);
        setTours();
      })

      .finally(() => {
        setLoading(false)
      });

    // [] = En dependencylist når komponentet rerender, spørger den om den skal udfører useeffecten igen eller skal jeg lade vær. Denne dependency list lytter på om der er ændring i staten (setAboutcontent), hvis den ikke havde været der ville den stå og re-render i et uendeligt loop. 

  }, [tourDeleted])  // Lytter på omder bliver slettet en tour = re-render  = nyt api-kald

  // en tom [] dependencylist betyder at useEffect'en kun kører 1 gang => når compontentet loader første  gang (og IKKE ved re-render)




  const handleDelete = (Id, title) => {
    /* alert(Id) */

    if (window.confirm("Er du sikker på du vil slette touren: '" + title + "' med id: " + Id)) {

      // Den spørger om vi er sikre på om vi vil slette. Som består af true ("OK") og false ("Cancel")

      // Brugeren får lov til at vælge true eller false

      // Hvis brugeren svarer ok, bliver der ikke kørt handleDelete. If statement lytter på true eller false, for at se om den skal køre den kode der står i if statementen

      setLoading(true);

      deleteTour(Id)
        .then((data) => {

          setTourDeleted([true, Id])

        })

        .catch((err) => {

          console.log(err);

          setTourDeleted(false)

        })

        .finally(() => {

          setLoading(false)

        })
    }

  }



  return (


    <div className="adminToursContainer">

      <h1>AdminTours</h1>

      <Link className="createTourLink" to="/admin/admintourscreate"> <AiOutlinePlus /></Link>


      {
        // Hvis api-kaldet loader - den venter på error eller data
        loading && <Loading />
      }


      {
        // Hvis der er fejl fra api
        error && <Fejl fejlBesked=" Data kan ikke hentes, prøv senere... " />
      }

      {

        tours &&
        <div className="cardContainer">

          {
            tours.map(t =>

              <section className="card" key={t._id}>



                <h2>{t.destination}</h2>

                <figure>
                  
                  <img src={"http://localhost:4444/images/tours/" + t.image1} alt="Nuværende cover-foto" />

                </figure>

                <p>{t.title}</p>



                <div className="iconContainer">
                  <AiOutlineDelete className="icons" size="2rem" color="red" onClick={() => handleDelete(t._id, t.title)} />

                  <Link to={"/admin/admintoursedit/" + t._id}> <AiOutlineEdit className="icons" size="2rem" color="green" /></Link>

                </div>
              </section>
            )
          }

        </div>

      }

    </div>
  );
};

export default AdminTours;
