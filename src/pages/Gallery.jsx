import React from 'react'

// SCSS
import "../scss/Gallery.scss"

const Gallery = () => {
  return (
    <section className="galleryContainer">

      <figure className="bannerimg">
        <img src="/img/banner-spaceship.jpg" alt="Billede af jorden - Fra gallerisiden"/>
      </figure>

      <h2>Galleri</h2>

      <h3>Her kan du se billeder af vores fantastiske rum samt vores planter </h3>

      <section className="galleryImgsContainer">
        
        <figure>

          <img src="/img/galleri/1.jpg" alt=" 1 billede i galleriet"/>

          <img src="/img/galleri/2.jpg" alt=" 2 billede i galleriet"/>

          <img src="/img/galleri/3.jpg" alt=" 3 billede i galleriet"/>

          <img src="/img/galleri/4.jpg" alt=" 4 billede i galleriet"/>

          <img src="/img/galleri/5.jpg" alt=" 5 billede i galleriet"/>

          <img src="/img/galleri/6.jpg" alt=" 6 billede i galleriet"/>

          <img src="/img/galleri/7.jpg" alt=" 7 billede i galleriet"/>

          <img src="/img/galleri/8.jpg" alt=" 8 billede i galleriet"/>

          <img src="/img/galleri/9.jpg" alt=" 9 billede i galleriet"/>

          <img src="/img/galleri/10.jpg" alt=" 10 billede i galleriet"/>

          <img src="/img/galleri/11.jpg" alt=" 11 billede i galleriet"/>

          <img src="/img/galleri/12.jpg" alt=" 12 billede i galleriet"/>




        </figure>

      </section>


    </section>
  )
}

export default Gallery