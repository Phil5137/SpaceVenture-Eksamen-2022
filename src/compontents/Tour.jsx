// React
import React, { useState, useEffect } from 'react'

// REACT-ROUTER-DOM
import { useParams } from 'react-router-dom';

// Components
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';

// APIKALD
import { getTourById } from '../helpers/api';




const Tour = () => {

    const {tourId} = useParams()

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
    <section>

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

            <div>

                <p key={singleTour._id}>{singleTour.title}</p>

            </div>
        
      }

    </section>
  )
}

export default Tour