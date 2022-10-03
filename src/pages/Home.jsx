import React, { useState, useEffect } from 'react'

import { AiFillStar } from 'react-icons/ai';

// SCSS
import "../scss/Home.scss"

// API KALD
import { getToursTeaser } from "../helpers/api"
import Fejl from '../compontents/Fejl'
import Loading from '../compontents/Loading'
import Modal from '../compontents/Modal';
import Pagination from '../compontents/Pagination';

const Home = () => {

  const [tours, setTours] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  // Ved klik på læs mere skal den gemme ID på den klikkede tour
  const [showTour, setShowTour] = useState()

  // State til pagination
  const [numberPerPage, setNumberPerPage] = useState(3) // Hvor mange vi vil have per side

  // State til 
  const [currentPage, setCurrentPage] = useState(0) // 0 svarer til side 1!!!

  // Kald api og hent alle tours (teaser-versionen)
  useEffect(() => {

    setLoading(true)

    getToursTeaser()

      .then((data) => {
        // Der er data
        setTours(data)
        setError(false)
      })

      .catch((err) => {
        setError(true)
        setTours()
      })

      .finally(() => {
        // uanset om der er data eler fejl
        setLoading(false)
      })

  }, [])


  /* SHUFFLE FUNCTION */


  // Modtager et array/liste og shuffler/blander listen og returnere den blandede liste

  function shuffleTours(arr) {

    // Loop gennem array (arr) og byt rundt på pladserne - bagfra
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = arr[i];
      arr[i] = arr[j];
      arr[j] = k;
    }

    return arr; // udsend/returner det shufflede array
  }


  /* ------------------------- Simpel for loop kald ------------------------------- */

  // Metode (for loop) som modtager et tal/antal og laver et tilsvarende antal stjerner

  const createStars = (numberOfStars) => {
    let stars = []
    // Hvis react icon eller anden "child" skal let stars være = [] istedet for = ""
    for (let index = 0; index < numberOfStars; index++) {
      /* stars += "X" */
      stars.push( <AiFillStar className="icons" size= "1.5rem" color="red" key={index} /> )
      // Stars.push(<GrStar />)
    }
    return stars
  }

  // Vi starter med at lave en variabel som hedder stjerner, den lader vi være tom for nu.
  // Derefter laver vi en for loop. Hvori vi starter med at lave variblen "index"
  // Derefter siger vi at hvis index er mindre end antalet stjerner, skal den lægge 1 til index
  // Så udfylder vi vores varibel "stjerner" ved at sige at hvis den er højere eller det samme som "X", så bliver antalet stjerner vist, i form at et "x", selvfølgelig tilsvarende vores tours





  return (


    <div id="homeContainer">
      <h1>Home</h1>

      {/* Hvis der er fejl, så vis mit fejl component */}
      {error && <Fejl />}

      {/* Hvis der loades, så vis mit Loading component*/}
      {loading && <Loading />}

      {showTour && <Modal tourID={showTour} setShowTour={setShowTour} />}


      {/* Hvis der er data, så læg det ind i en div. Hvor efter vi mapper hver tour ud fra api'et*/}

      {tours &&

        <div className="toursContainer">

          <div className="toursGrid">

            {

              /* ------------Her henter vi alle tours og returnere dem i omvendt rækkefølge (alfabetisk i det her tilfælde) ---------------- */

              /* tours.reverse().map(tour => */
              // VI BRUGER REVERSE TIL AT VENDE TOURSNE PÅ HOVEDET, NORMALT KOMMER DE I DET ER FTATRAVELS TILFÆLDE I ALFABETISK RÆKKEFØLGE. DET VI HAR GJORT HER FÅR DEM UD FRA Å-A ISTEDET FOR A-Å


              /* ------------ Her slicer vi tours, det vil sige vi kun henter 3 i dette tilfælde, da der står 3 i slice ---------------- */

              /* tours.slice( 0, 3 ).map(tour => */
              // Det er til det sidste tal som her er 3, IKKE TIL OG MED


              /* ------------ Her starter vi med at shuffle, derefter henter vi vores tours, men kun 4 pga slice ---------------- */

              /* shuffleTours(tours.slice(0,4)).map(tour =>  */
              // Her har vi kaldet vores "shuffleTours funktion", og derefter sagt at den kun skal hente de første 4 tours fra api'et og blande dem


              /* ------------ Her henter vi alle tours og shuffler dem ---------------- */

              /* shuffleTours(tours).map(tour =>  */
              // Her har vi bare blandet alle tours



              // 0,3 ... 3,6 ... 6,9
              // Den første del regner det første tal ud  // Anden del regner andet tal ud
              tours.slice((currentPage * numberPerPage), (currentPage * numberPerPage) + numberPerPage).map((tour, i) =>


                /* MAN KAN LIGGE DET I ET SELVSTÆNDIGT COMPONENT, SÅ MAN KAN BRUGE DEN ANDRE STEDER OGSÅ, SAMMENTIDIG MED AT DET SER MERE OVERSKUELIGT UD */

                // Man skal give sin container en unik key. Det skal den bruge til at give de enkelte tours
                <div key={tour._id} className="tours">

                  <img src={"http://localhost:5099/images/tours/" + tour.coverimage} alt={"Et foto fra touren til" + tour.title} />

                  <div className="contentFlex">


                    <h2>{tour.title}</h2>




                    {

                      /* ------------------------- TRYHARD SVEDERN LOOP ARRAY TING (Array form) ------------------------------- */


                      /* ------------------------- HUSK DET ER ENTEN ELLER, HUSK AT UDKOMMENTERE DEN ENE HVIS DU BRUGER DEN ANDEN ------------------------------- */

                      /* Item er det indhold der er i et array. Et normalt array ville indeholde noget, og det er så item */

                      /* Index er en indbygget tæller, som bare tæller for hver gang den mapper noget data ud */

                      /* "lenght: tour.rating", er så den ved hvor mange den skal loope ud. Den får afhvide den skal loppe det antal stjerner ud, som tilhører den enkelte tour  */

                      /*   Array.from({ length: tour.rating }, (item, index) => {
                        
                        return "X" + item + index;
                        
                       }) */

                      /* ------------------------- Simpel for loop kald ------------------------------- */


                      createStars(tour.rating)

                    }


                  </div>
                  {/* 30/10/2022 skal blive til: 30. oktober 2022 */}    {/* Her indstiller vi hvordan vi gerne vil have vores dato skrevet ud. */}
                  <p className="tourDate">Dato: {new Date(tour.traveldate).toLocaleDateString("da-DK", { year: "numeric", day: "numeric", month: "long" })} </p>

                  <p className="tourTeaserText"> {tour.teaser} </p>

                  <button onClick={() => setShowTour(tour._id)}>Læs mere</button>

                </div>)
            }

          </div>

          <Pagination
            setCurrentPage={setCurrentPage} // Fra state
            currentPage={currentPage} // Fra state
            numberOfPages={Math.ceil(tours.length / numberPerPage)} // beregning af hvor mange sidelink/-knapper der skal laves7
          />

        </div>
      }

    </div>
  )
}

export default Home