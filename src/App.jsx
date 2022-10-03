import { Routes, Route } from "react-router-dom";
import "./App.scss";

// Component
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Kontakt from "./pages/Kontakt";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Om from "./pages/Om";

// ADMIN Compontents
import AdminLayout from "./layout/admin/AdminLayout"
import AdminHome from "./pages/admin/AdminHome";
import AdminTours from "./pages/admin/AdminTours";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminToursCreate from "./pages/admin/AdminToursCreate";
import AdminToursEdit from "./pages/admin/AdminToursEdit";
import SearchResult from "./pages/SearchResult";


function App() {
  return (

    //********************************************************************************
    // HUSK at <BrowserRouter> OG <LoginContextProvider> er placeret i index.js!!!!!!
    //********************************************************************************

    
    <Routes>

      {/* --------------- PUBLIC */}
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />
        <Route path="kontakt" element={<Kontakt />} />
        <Route path="om" element={<Om />} />
        <Route path="Login" element={<Login />} />

        {/* SØGNING */}

        <Route path="search/:searchWord" element={ <SearchResult /> } />


        {/* ------ NoMatch SKAL ligge nederst, da den spørg om alle url'erne matcher, hvis de gør bliver de vist, og url'en ikke matcher med noget, skal den vise siden NoMatch ------ */}

        <Route path="*" element={<NoMatch />} />

      </Route>



      {/* --------------- ADMIN */}

      <Route path="/admin" element={<AdminLayout />}>

        <Route index element={<AdminHome />} />
        <Route path="admintours" element={<AdminTours />} />
        <Route path="adminabout" element={<AdminAbout />} />
        <Route path="admintourscreate" element={<AdminToursCreate />} />
        <Route path="admintoursedit/:tourId" element={<AdminToursEdit />} /> {/* : parametre og er ikke em del af path'et*/}
        <Route path="*" element={<NoMatch />} />

      </Route>

    </Routes>
  );
}

export default App;
