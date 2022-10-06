// React
import React, { useState, useEffect } from 'react'

// REACT-ROUTER-DOM
import { useParams } from 'react-router-dom';

// SCSS
import "../scss/Tour.scss"

// Components
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';

// APIKALD
import { getTourById } from '../helpers/api';

// Parser
import parser from "html-react-parser";

// React-Icons
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrGooglePlus } from 'react-icons/gr';
import { AiOutlineInstagram } from 'react-icons/ai';





const Tour = () => {

  const { tourId } = useParams()

  const [singleTour, setSingleTour] = useState() // data/tekst mv. der skal rettes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

    setLoading(true)

    getTourById(tourId)
      .then(data => {
        setSingleTour(data);

        // Der er 2 ændringer som kan få et compontent til at re-render, hvis der er en ændring i en state, eller i props.
        setError(false);
      })

      .catch((err) => {
        setError(true);
        setSingleTour(false);
      })

      .finally(() => {
        setLoading(false)
      });

  }, [])


  return (
    <section className="singleTourContainer">

      {
        // Hvis api-kaldet loader - den venter på error eller data
        loading && <Loading />
      }

      {
        // Hvis der er fejl fra api
        error && <Fejl fejlBesked=" Data kan ikke hentes, prøv senere... " />
      }

      {
        // Hvis der apidata i vores state
        singleTour &&



        <section className="tourContentContainer">

          <div className="tourImgContainer">

            <figure>

              <img src={"http://localhost:4444/images/tours/" + singleTour.image1} />

            </figure>

            <figure>

              <img src={"http://localhost:4444/images/tours/" + singleTour.image2} />

            </figure>

          </div>

          <div className="tourTextContainer">

            <h3>{singleTour.destination}</h3>

            <hr className="topBlueHr" />

            <p className="tourPrice">{singleTour.price}</p>

            <div className="tourTopTextContainer">

              <p className="tourTitle">{singleTour.title}</p>


              <div className="tourContentText">{parser(singleTour.content)}</div>


            </div>


            <hr />

            <ul>

              <div>
                <p>Desination:</p>



                <li>{singleTour.destination}</li>
              </div>


              <div>
                <p>Pris:</p>



                <li>{singleTour.price}</li>

              </div>


              <div>
                <p>Afstand fra jorden:</p>


                <li>{singleTour.distance}</li>
              </div>

              <div>
                <p>Flyvetid:</p>



                <li>{singleTour.traveltime}</li>
              </div>
            </ul>



            <hr />



            <figure className="tourLinkContainer">

              <p>SHARE</p>

              {/* React-Icons - samt links til de forskellige sociale medier*/}

              <a href="https://www.facebook.com/" target="_blank">

                <FaFacebookF className="icons" />


              </a>

              <a href="https://twitter.com/" target="blank">

                <AiOutlineTwitter className="icons" />

              </a>


              <a href="https://www.google.com/search?q=google+plus&rlz=1C1GCEB_enDK988DK988&oq=google+plus&aqs=chrome.0.0i512l5j69i60l3.1886j0j4&sourceid=chrome&ie=UTF-8" target="_blank">

                <GrGooglePlus className="icons" />

              </a>


              <a href="https://www.instagram.com/" target="_blank">

                <AiOutlineInstagram className="icons" />

              </a>


            </figure>



          </div>

        </section>


      }

    </section>
  )
}

export default Tour