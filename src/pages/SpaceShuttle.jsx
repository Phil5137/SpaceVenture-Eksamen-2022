// React
import React, { useState, useEffect } from 'react'

// React router dom
import { NavLink } from 'react-router-dom'

// SCSS
import "../scss/SpaceShuttle.scss"


// Parser
import parser from "html-react-parser";


// APIKALD
import { getSpaceShuttle } from '../helpers/api.js';

// Components
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';



const SpaceShuttle = () => {

  const [spaceShuttleData, setSpaceShuttleData] = useState() // data/tekst mv. der skal rettes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Kald api og put data (eller error) i state:

  useEffect(() => {

    setLoading(true)

    getSpaceShuttle()
      .then(data => {
        setSpaceShuttleData(data);
      })
      .catch((err) => {
        setError(true);
        setSpaceShuttleData();
      })
      .finally(() => {
        setLoading(false)
      });

  }, [])



  return (


    <section className="spaceShuttleContainer">

      <figure>
        <img src={process.env.PUBLIC_URL + "/img/banner-spaceship.jpg"} />
      </figure>

      <h2>Rumfærgen</h2>

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
        spaceShuttleData &&

        <section className="spaceShuttleContent">

          <figure>
            <img src={process.env.PUBLIC_URL + "/img/banner-spaceship.jpg"} />
          </figure>

          <div>
            <h3>Hvorfor vælge os</h3>

            <h4>{spaceShuttleData.title}

              <hr />

            </h4>


            <p>{parser(spaceShuttleData.content)}</p>

          
          </div>

        </section>


      }

      
        <section className="spaceShuttleGallery">

          <h2 className="galleryHeadline">Galleri</h2>

          <figure>

            <img src={process.env.PUBLIC_URL + "/img/spaceship1.jpg"} />

            <img src={process.env.PUBLIC_URL + "/img/spaceship2.jpg"} />

            <img src={process.env.PUBLIC_URL + "/img/spaceship3.jpg"} />

            <img src={process.env.PUBLIC_URL + "/img/spaceship4.jpg"} />

            


          </figure>

        </section>


    </section>



  )
}

export default SpaceShuttle