import React, { useState } from 'react'

// Components
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';

// SCSS
import "../scss/Contact.scss"

// API
import { sendMail, unsubscribeNews } from "../helpers/api"

const Contact = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [createdUser, setCreatedUser] = useState(false);

  // Håndter send besked
  const handleCreatedUser = e => {
    e.preventDefault();

    setLoading(true)

    // Snup indhold fra formular og lav et formdata-objekt til API'et
    let formData = new FormData(e.target)

    sendMail(formData).then((data) => {
      setCreatedUser(true)
      setError(false)
    })
      .catch((err) => {

        setCreatedUser(false)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (

    <section className="contactContainer">

      <div className="contactMapContainer">

        <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71064.9897678084!2d10.111935250985534!3d56.17817970522993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c4cb15397788b%3A0x8c4dd7d9912ea2af!2sAarhus!5e0!3m2!1sda!2sdk!4v1664982318960!5m2!1sda!2sdk" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

      </div>


      {
        loading && <Loading />
      }

      {
        error && <h4>Der er opstået en fejl ... {error}</h4>
      }


      {/* Når du er tilmeldt, skal dette vises */}
      {
        createdUser &&

        <>

          <div className="createdUserContent">
            <h2>Tak for din henvendelse!</h2>

            <p>Du vil høre fra os snarest muligt!</p>

          </div>
        </>
      }

      {/* Hvis der ikke er tilmeldt skal den vise formularen */}
      {
        !createdUser &&

        <>

          <section className="contactBottomContent">

            <section className="contactTextContainer">


              <h4>Kontakt</h4>

              <hr />

              <p>Skulle du side med et spørgsmål eller to, så skriv endelig til os og vi vil kotakte dig hurtugst muligt.</p>
            </section>

            <form onSubmit={handleCreatedUser}>
              <input name="name" type="text" placeholder="Dit navn"  required/>

              <input name="email" type="email" placeholder="E-mail" required/>

              <input name="phone" type="number" placeholder="Tlf" required/>

              <textarea name="message" placeholder="Besked" required></textarea>

              <button type="submit">Send</button>

            </form>

            



          </section>

        </>
      }




    </section>
  )
}

export default Contact