import React from 'react'

// SCSS
import "../scss/Contact.scss"

const Contact = () => {
  return (

    <section className="contactContainer">

      <div className="contactMapContainer">

        <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71064.9897678084!2d10.111935250985534!3d56.17817970522993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c4cb15397788b%3A0x8c4dd7d9912ea2af!2sAarhus!5e0!3m2!1sda!2sdk!4v1664982318960!5m2!1sda!2sdk" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

      </div>

      <section className="contactBottomContent">

          <section className="contactTextContainer">

            
        <h4>Kontakt</h4>

        <hr />

        <p>Skulle du side med et spørgsmål eller to, så skriv endelig til os og vi vil kotakte dig hurtugst muligt.</p>
        </section>

          <form action="">
            <input type="text" required placeholder="Dit navn" />

            <input type="email" required placeholder="E-mail" />

            <input type="number" required placeholder="Tlf" />

            <textarea required placeholder="Besked"></textarea>

          </form>



      </section>

    </section>
  )
}

export default Contact