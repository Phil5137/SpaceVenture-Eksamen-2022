import React from 'react'

// SCSS
import "../scss/Tours.scss"

const Tours = () => {
  return (

    <section className="tourContainer">

      <figure>
      <img src={process.env.PUBLIC_URL + "/img/banner-ture.jpg"} />
      </figure>

      <h2>Ture</h2>

    </section>

  )
}

export default Tours