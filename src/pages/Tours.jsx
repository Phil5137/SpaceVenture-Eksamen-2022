// React
import React, { useState, useEffect } from 'react'

// REACT-ROUTER-DOM
import { Link } from 'react-router-dom';

// SCSS
import "../scss/Tours.scss"

// APIKALD
import { getTours } from '../helpers/api.js';

// Components
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';

// Parser
import parser from "html-react-parser";

// Pagination
import Pagination from '../compontents/Pagination';

const Tours = () => {

  const [toursData, setToursData] = useState() // data/tekst mv. der skal rettes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  // State til pagination
  const [numberPerPage, setNumberPerPage] = useState(2) // Hvor mange vi vil have per side

  // State til 
  const [currentPage, setCurrentPage] = useState(0) // 0 svarer til side 1!!!

  // Kald api og put data (eller error) i state:

  useEffect(() => {

    setLoading(true)

    getTours()

      .then(data => {
        setToursData(data);

        // Der er 2 ændringer som kan få et compontent til at re-render, hvis der er en ændring i en state, eller i props.
        setError(false);
      })

      .catch((err) => {
        setError(true);
        setToursData(false);
      })

      .finally(() => {
        setLoading(false)
      });

  }, [])

  return (

    <section className="tourContainer">

      <figure className="tourBannerImg">
        <img src={process.env.PUBLIC_URL + "/img/banner-ture.jpg"} />
      </figure>

      <h2>Ture</h2>

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
        toursData &&

        <div className="ToursCardsContainer">

          {
            toursData.reverse().slice((currentPage * numberPerPage), (currentPage * numberPerPage) + numberPerPage).map(toursData =>
              <article className="toursCards">


                <figure>
                  <img className="cardImg" src={"http://localhost:4444/images/tours/" + toursData.image1} />
                </figure>


                  <div className="cardContent">

                    <h4 className="cardName"> {toursData.title} </h4>

                    <div className="cardText"> {parser(toursData.content)} </div>


                    <Link to={"/tour/" + toursData._id}>
                      <button>Se mere</button>
                    </Link>

                  </div>


                <p className="cardPrice"> {toursData.price}</p>

              </article>
            )
          }

          <Pagination
            setCurrentPage={setCurrentPage} // Fra state
            currentPage={currentPage} // Fra state
            numberOfPages={Math.ceil(toursData.length / numberPerPage)} // beregning af hvor mange sidelink/-knapper der skal laves7
          />

        </div>
      }




    </section>

  )
}

export default Tours