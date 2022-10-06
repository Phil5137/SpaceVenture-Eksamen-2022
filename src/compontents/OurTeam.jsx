// React
import React, { useState, useEffect } from 'react'


// SCSS
import "../scss/OurTeam.scss"


// APIKALD
import { getOurTeam } from '../helpers/api.js';

// Components
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';
import OurTeamMap from './OurTeamMap';




const OurTeam = () => {

  const [ourTeamData, setOurTeamData] = useState() // data/tekst mv. der skal rettes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  // Kald api og put data (eller error) i state:

  useEffect(() => {

    setLoading(true)

    getOurTeam()

      .then(data => {
        setOurTeamData(data);

        // Der er 2 ændringer som kan få et compontent til at re-render, hvis der er en ændring i en state, eller i props.
        setError(false);
      })

      .catch((err) => {
        setError(true);
        setOurTeamData();
      })

      .finally(() => {
        setLoading(false)
      });

    // [] = En dependencylist når komponentet rerender, spørger den om den skal udfører useeffecten igen eller skal jeg lade vær. Denne dependency list lytter på om der er ændring i staten (setAboutcontent), hvis den ikke havde været der ville den stå og re-render i et uendeligt loop. 
  }, [])
  // en tom [] dependencylist betyder at useEffect'en kun kører 1 gang => når compontentet loader første  gang (og IKKE ved re-render)




  return (
    <div className="ourTeamContainer">

      <h2>Vores Team</h2>

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
        ourTeamData &&

        <div className="ourTeamCardsContainer">

          {


            ourTeamData.map(ourTeamData => (
              <OurTeamMap ourTeamData={ourTeamData} key={ourTeamData._id} />
            ))


          }

        </div>
      }







    </div>
  )
}

export default OurTeam






