import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// Context til at måle om brugeren er logget ind eller ej
import { LoginContext } from "../../context/LoginContext";

// SCSS
import "../../scss/admin/AdminNavbar.scss"

const AdminNavbar = () => {
  const { signOut } = useContext(LoginContext);

  const { user } = useContext(LoginContext);

  return (
    <nav className="adminNavbar">
      <ul>
        <li>
          <NavLink to="/admin">ADMIN Home</NavLink>
        </li>

        <li>
          <NavLink to="admintours">Tours (admin)</NavLink>
        </li>

        <li>
          <NavLink to="adminabout">About (admin)</NavLink>
        </li>

        <li>
          <NavLink to="/">Forsiden</NavLink>
        </li>

        {
            user ?
              <li><NavLink to="/admin" >ADMIN</NavLink></li>
              :
              <li><NavLink to="/login" >Login</NavLink></li>
          }
      </ul>
    </nav>
  );
};

export default AdminNavbar;
