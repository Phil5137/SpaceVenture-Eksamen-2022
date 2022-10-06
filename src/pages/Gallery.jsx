import React from 'react'

// SCSS
import "../scss/Gallery.scss"

const Gallery = () => {
  return (
    <section className="galleryContainer">

      <figure className="bannerimg">
        <img src={process.env.PUBLIC_URL + "/img/banner-spaceship.jpg"} />
      </figure>

      <h2>Galleri</h2>

      <h3>Her kan du se billedr af vores fantastiske rum samt vores planter </h3>

      <section className="galleryImgsContainer">
        
        <figure>

          <img src={process.env.PUBLIC_URL + "/img/galleri/1.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/2.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/3.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/4.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/5.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/6.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/7.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/8.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/9.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/10.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/11.jpg"} />

          <img src={process.env.PUBLIC_URL + "/img/galleri/12.jpg"} />




        </figure>

      </section>


    </section>
  )
}

export default Gallery