// React
import React, { useState, useEffect } from 'react'

// React router dom
import { NavLink, Link, useNavigate } from 'react-router-dom'

// Parser
import parser from "html-react-parser";

// SCSS
import "../scss/AboutUs.scss"

// APIKALD
import { getAbout } from '../helpers/api.js';

// Components
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';

const AboutUs = () => {

    const [aboutData, setAboutData] = useState() // data/tekst mv. der skal rettes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  
  
    // Kald api og put data (eller error) i state:
  
    useEffect(() => {
  
      setLoading(true)
  
      getAbout()
        .then(data => {
            setAboutData(data);
  
          
        })
        .catch((err) => {
          setError(true);
          setAboutData();
        })
        .finally(() => {
          setLoading(false)
        });
  
    }, [])



    return (

    <div className="aboutUsContainer">

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
        aboutData &&

        <section className="aboutUsContent">

            <figure>
            <img src="/img/om-os.jpg" alt="Billede af rummet fra om os sektionen"/>
            </figure>

            <div>
                <h3>Lidt om os</h3>

                <h4>{aboutData.title}
                
                <hr />
                                
                </h4>


                <p>{parser(aboutData.content)}</p>

                <button> <li><NavLink to="/kontakt" >Kontakt os</NavLink></li> </button>
            </div>

        </section>

   
      }

    </div>
  )
}

export default AboutUs