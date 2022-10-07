import React from 'react'

// SCSS
import "../scss/Header.scss"

const Header = () => {
  return (
    <header>

    <figure>
      <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="spaceventures Logo" />
    </figure>

    </header>
  )
}

export default Header