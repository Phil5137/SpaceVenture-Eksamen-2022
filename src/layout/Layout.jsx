import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div>
     
      <Header />
      <Navbar />

      {/* Outlet er de child-path som layout har med sig fra App.jsx */}

      <Outlet />
    
      <Footer />
    </div>
  );
};

export default Layout;
