import React from 'react'

// SCSS
import "../scss/Header.scss"

const Header = () => {
  return (
    <header>

    <figure><img src={process.env.PUBLIC_URL + "img/logo.png"} /></figure>

    </header>
  )
}

export default Header