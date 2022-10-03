import React, { useState, useEffect } from 'react'

import { NavLink, Link, useNavigate } from 'react-router-dom'

// React-Icons
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrGooglePlus } from 'react-icons/gr';
import { AiOutlineInstagram } from 'react-icons/ai';


// SCSS
import "../scss/Footer.scss"

// React-Icons
import { FaPhoneAlt } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';


// APIKALD
import { getFooter } from '../helpers/api.js';

// Components
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';




const Footer = () => {

  const [footerData, setFooterData] = useState() // data/tekst mv. der skal rettes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  // Kald api og put data (eller error) i state:

  useEffect(() => {

    setLoading(true)

    getFooter()
      .then(data => {
        setFooterData(data);

        // Der er 2 ændringer som kan få et compontent til at re-render, hvis der er en ændring i en state, eller i props.
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setFooterData();
      })
      .finally(() => {
        setLoading(false)
      });

    // [] = En dependencylist når komponentet rerender, spørger den om den skal udfører useeffecten igen eller skal jeg lade vær. Denne dependency list lytter på om der er ændring i staten (setAboutcontent), hvis den ikke havde været der ville den stå og re-render i et uendeligt loop. 
  }, [])
  // en tom [] dependencylist betyder at useEffect'en kun kører 1 gang => når compontentet loader første  gang (og IKKE ved re-render)




  return (
    <footer>
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
        footerData &&

        <section className="footerUpper">

          <section className="footerContact">

            <h3>KONTAKT</h3>

            <div className="footerPhone">

              <FaPhoneAlt className="icons" />

              <p> +45 {footerData.phone}</p>

            </div>

            <div className="footerMail">

              <FaEnvelope className="icons" />

              <p>{footerData.email}</p>

            </div>

            <div className="footerAddress">

              <FaLocationArrow className="icons" />

              <p>{footerData.address}</p>

            </div>

          </section>

          <section className="footerLinks">

            <h3>HURTIGE LINKS</h3>

            <ul>

              <section>

                <div>
                  <li> <NavLink to="/rumfaergen" >Rumfærgen</NavLink> </li>
                  <li> <NavLink to="/ture" >Ture</NavLink> </li>
                  <li> <a href=".ourTeamContainer"> Vores team </a> </li>

                </div>

                <div>
                  <li> <NavLink to="/galleri" >Galleri</NavLink></li>
                  <li><NavLink to="/sikkerhed" >Sikkerhed</NavLink></li>
                </div>

              </section>

            </ul>

            <button> <li><NavLink to="/kontakt" >Kontakt</NavLink></li> </button>

          </section>

        </section>


      }

      <section className="footerBottom">


        <p>	&#169; 2021 Space Venture. All rights reserved.</p>

        <figure className="iconContainer">

          {/* React-Icons */}

          <FaFacebookF className="icons" />

          <AiOutlineTwitter className="icons" />

          <GrGooglePlus className="icons" />

          <AiOutlineInstagram className="icons" />

        </figure>

      </section>





    </footer>
  )
}

export default Footer