// REACT
import React, { useState, useEffect } from 'react'

// SCSS
import "../scss/Safety.scss"

// APIKALD
import { getSafety } from '../helpers/api.js';

// COMPONENTS
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';

const Safety = () => {

  const [safetyData, setSafetyData] = useState() // data/tekst mv. der skal rettes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Kald api og put data (eller error) i state:

  useEffect(() => {

    setLoading(true)

    getSafety()
      .then(data => {
        setSafetyData(data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setSafetyData();
      })
      .finally(() => {
        setLoading(false)
      });

    // [] = En dependencylist når komponentet rerender, spørger den om den skal udfører useeffecten igen eller skal jeg lade vær. Denne dependency list lytter på om der er ændring i staten (setAboutcontent), hvis den ikke havde været der ville den stå og re-render i et uendeligt loop. 
  }, [])
  // en tom [] dependencylist betyder at useEffect'en kun kører 1 gang => når compontentet loader første  gang (og IKKE ved re-render)

  return (
    <section className="safetyContainer">

<figure className="safetyBannerimg">
        <img src="/img/banner-ture.jpg" alt="Billede fra rummet - Fra sikkerhedssiden"/>
      </figure>

      <h2>Sikkerhed</h2>

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
        safetyData &&

        <section className="safetyContentContainer">

          <h3>{safetyData.title}</h3>

          <p>{safetyData.content}</p>

        </section>


      }

    </section>
  )
}

export default Safety