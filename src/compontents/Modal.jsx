import React, { useState, useEffect } from 'react'

// APIKALD
import { getTourById, getToursTeaser } from "./../helpers/api";

import { AiOutlineClose } from 'react-icons/ai';

// SCSS
import "../scss/Modal.scss"

import parser from "html-react-parser";

// Compontents
import Loading from './Loading';
import Fejl from './Fejl';
import Slider from './Slider';

const Modal = (props) => {

    const tourID = props.tourID // Tours id sendes med fra parent

    const [tour, setTour] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Hent tour ud fra id (sendes med fra parent)
    useEffect(() => {

             
        document.addEventListener( "keydown", ( e ) => {   // Her lytter vi på om en knap på tastaturet bliver trykket ned. 
            if ( e.key === "Escape") {  // Den lytter på alle knapperne, så her siger at hvis den knap der bliver trykket på er knappen "Escape". Skal den lukke vores modal
                props.setShowTour( false )
            }
        })


        setLoading(true)

        getTourById(tourID)
            .then(data => {
                setTour(data);
                // Laver et kald til api'et hvis det går godt, smider den dataen ind i en state, som i dette tilfælde er setAboutcontent. Som ville få hele componentet til at re-render, hvis den ikke havde en dependencylist ( "[]" )

                // Der er 2 ændringer som kan få et compontent til at re-render, hvis der er en ændring i en state, eller i props.
                setError(false);
            })

            .catch((err) => {
                setError(true);
                setTour();
            })

            .finally(() => {
                setLoading(false) // Slut loading
            });

        // [] = En dependencylist når komponentet rerender, spørger den om den skal udfører useeffecten igen eller skal jeg lade vær. Denne dependency list lytter på om der er ændring i staten (setAboutcontent), hvis den ikke havde været der ville den stå og re-render i et uendeligt loop. 

    }, [tourID])  // lytter til tourID. da den skal hente forskellige data efter hviklen tour modal vi klikker på, på baggrund af tourens Id

    // en tom [] dependencylist betyder at useEffect'en kun kører 1 gang => når compontentet loader første  gang (og IKKE ved re-render)



    return (
        <div className="modal-background-overlay">

            {
                // Hvis api-kaldet loader - den venter på error eller data
                loading && <Loading />
            }

            {
                // Hvis der er fejl fra api
                error && <Fejl fejlBesked=" Data kan ikke hentes, prøv senere... " />
            }

                {/* Vis tour ud fra ID - sendt med fra parent (Home) */}
            {
                // Hvis der apidata i vores state
                tour &&

                <div className="modal">

                <section className="topContentFlex">

                    <div className="close">

                        <button onClick={ () => props.setShowTour( false )}><AiOutlineClose /></button>

                    </div>

                    <h1 className="title">
                        Modal - { tour.title }
                    </h1>

                </section>

                    <Slider tourGallery={ tour.gallery } captionText={ tour.title }/>



                    <div className="modalContent">
          
                        <div>{ parser( tour.content ) }</div>
                
                    </div>

                </div>

            }





        </div>

    )

}

export default Modal