import React, { useContext, useState } from 'react'
import { NavLink } from "react-router-dom";

// Context til at måle om brugeren er logget ind eller ej
import { LoginContext } from "../../context/LoginContext";

// SCSS
import "../../scss/admin/AdminNavbar.scss"

const AdminNavbar = () => {
  const { signOut } = useContext(LoginContext);

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

    

    <nav className="adminNavbar">

 {/* BURGERMENU */}

      {/* Her sætter vi burgermenuen til at være det modsatte af hvad den var før (hvis den er true bliver den false når man klikker.) (og hvis den er false, bliver den til true når der klikkes) */}
      <div className={showBugerMenu ? "toggleButton changeAnimation" : "toggleButton"} onClick={() => setShowBugerMenu(!showBugerMenu)}>
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>

        {/* Hvis man ville have den skifter mellem to ikoner, istedet for at have en animation er den her!!!! */}
        {/* { showBugerMenu ? <span>&#9747;</span> : <span>&#9776;</span>} */}
      </div>

      <div className={showBugerMenu ? "navbarLinks active" : "navbarLinks"} >  {/* Her bruger vi en Turnary Expression */}



      <ul onClick={() => setShowBugerMenu(!showBugerMenu)}>
        <li >
          <NavLink to="/admin" end>ADMIN Home</NavLink>
        </li>

        <li>
          <NavLink to="admintours">Tours (admin)</NavLink>
        </li>

        <li>
          <NavLink to="adminabout">About (admin)</NavLink>
        </li>

        <li>
          <NavLink to="adminaspaceshuttle">Rumfærge (admin)</NavLink>
        </li>

        <li>
          <NavLink to="/">Forsiden</NavLink>
        </li>

        
      </ul>






{/* SØGNING */}

{/*  <div className="searchbarContainer">
  <form onSubmit={handleSearch}>
    <input type="text" name="searchBar" required placeholder="Search..." />
    <button type="submit">Søg</button>
  </form>
</div> */}

</div>


    </nav>
  );
};

export default AdminNavbar;
