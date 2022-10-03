import React, { useContext, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

// React-Icons
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrGooglePlus } from 'react-icons/gr';
import { AiOutlineInstagram } from 'react-icons/ai';




// context - til at måle om logget ind eller ej
import { LoginContext } from '../context/LoginContext';


// Navbar css - burger
import '../scss/Navbar.scss'

const Navbar = () => {
  const { user } = useContext(LoginContext);

  // State om der er klikket på burger (true/false)
  const [showBugerMenu, setShowBugerMenu] = useState(false)

  /* // SØGNING
  const navigate = useNavigate()

  const handleSearch = ( e ) => {

    e.preventDefault(); // For at undgå reload af siden når vi submitter

    console.log();

    navigate("/search/" + e.target.searchBar.value)

  } */


  return (


    <nav className="navbar">


      {/* BURGERMENU */}

      {/* Her sætter vi burgermenuen til at være det modsatte af hvad den var før (hvis den er true bliver den false når man klikker.) (og hvis den er false, bliver den til true når der klikkes) */}
      <div className={showBugerMenu ? "toggleButton changeAnimation" : "toggleButton"} onClick={() => setShowBugerMenu(!showBugerMenu)}>
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>

        {/* Hvis man ville have den skifter mellem to ikoner, istedet for at have en animation er den her!!!! */}
        {/* { showBugerMenu ? <span>&#9747;</span> : <span>&#9776;</span>} */}
      </div>



      {/* NAV - LINKS */}

      {/* Hvis showBurgerMenu (vores useState) er true, skal den både have klassen navbarLinks og active, active gør at den går fra 0 til 300 px i height, ellers skal den kun have klassen navbarLinks */}
      <div className={showBugerMenu ? "navbarLinks active" : "navbarLinks"} >  {/* Her bruger vi en Turnary Expression */}

        <ul>
          <li ><NavLink to="/" >Hjem</NavLink> </li>
          <li> <NavLink to="/rumfaergen" >Rumfærgen</NavLink> </li>
          <li> <NavLink to="/ture" >Ture</NavLink> </li>
          <li><NavLink to="/galleri" >Galleri</NavLink></li>
          <li><NavLink to="/sikkerhed" >Sikkerhed</NavLink></li>
          <li><NavLink to="/kontakt" >Kontakt</NavLink></li>

          {
            user ?
              <li><NavLink to="/admin" >ADMIN</NavLink></li>
              :
              <li><NavLink to="/login" >Login</NavLink></li>
          }

        </ul>




        {/* SØGNING */}

        {/*  <div className="searchbarContainer">
          <form onSubmit={handleSearch}>
            <input type="text" name="searchBar" required placeholder="Search..." />
            <button type="submit">Søg</button>
          </form>
        </div> */}

      </div>


      <figure className="iconContainer">

        {/* React-Icons */}

        <FaFacebookF className="icons" />

        <AiOutlineTwitter className="icons" />

        <GrGooglePlus className="icons" />

        <AiOutlineInstagram className="icons" />

      </figure>


      {/* <a href="#footer" >Footer</a> */}

    </nav >
  )
}
export default Navbar