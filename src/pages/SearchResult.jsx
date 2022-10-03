import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Fejl from '../compontents/Fejl'
import Loading from '../compontents/Loading'


// API
import { getToursSearch } from "../helpers/api"


// Icons
import { AiFillStar  } from 'react-icons/ai';


/* TODO: 
// 1. Dette component skal modatage søgeorder fra navbarens søge-input

// 2. Kalde API'et med søgeordet

// 3. Modtage søgeresultatet fra API'et

// 4. 
*/





const SearchResult = () => {

  let { searchWord } = useParams()
  console.log( "søgt efter", searchWord );



  const [tours, setTours] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  useEffect(() => {

    setLoading(true)

    getToursSearch(searchWord)
      .then((data) => {
        setTours(data)
        setError(false)
      })

      .catch((err) => {
        setTours()
        setError(true)
      })

      .finally(() => {
        setLoading(false)
      })

  }, [searchWord]) // Dependency list


  // STARS

  const createStars = (numberOfStars) => {
    let stars = []
    // Hvis react icon eller anden "child" skal let stars være = [] istedet for = ""
    for (let index = 0; index < numberOfStars; index++) {
      /* stars += "X" */
      stars.push(<AiFillStar className="icons" size="1.5rem" color="red" key={index} />)
      // Stars.push(<GrStar />)
    }
    return stars
  }


  return (



    <div>

      {/* Hvis der er fejl, så vis mit fejl component */}
      {error && <Fejl />}

      {/* Hvis der loades, så vis mit Loading component*/}
      {loading && <Loading />}



      <h1>Søgeresultat</h1>

      {tours &&

        <div className="toursContainer">

          <div className="toursGrid">

            {


              tours.map((tour, i) =>


                /* MAN KAN LIGGE DET I ET SELVSTÆNDIGT COMPONENT, SÅ MAN KAN BRUGE DEN ANDRE STEDER OGSÅ, SAMMENTIDIG MED AT DET SER MERE OVERSKUELIGT UD */

                // Man skal give sin container en unik key. Det skal den bruge til at give de enkelte tours
                <div key={tour._id} className="tours">

                  <img src={"http://localhost:5099/images/tours/" + tour.coverimage} alt={"Et foto fra touren til" + tour.title} />

                  <div className="contentFlex">


                    <h2>{tour.title}</h2>




                    {

                      createStars(tour.rating)

                    }


                  </div>
                  {/* 30/10/2022 skal blive til: 30. oktober 2022 */}    {/* Her indstiller vi hvordan vi gerne vil have vores dato skrevet ud. */}
                  <p className="tourDate">Dato: {new Date(tour.traveldate).toLocaleDateString("da-DK", { year: "numeric", day: "numeric", month: "long" })} </p>

                  <p className="tourTeaserText"> {tour.teaser} </p>

                </div>

              )
            }

          </div>

        </div>
      }

    </div>

  )
}

export default SearchResult