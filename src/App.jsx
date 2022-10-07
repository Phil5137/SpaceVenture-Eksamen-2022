import { Routes, Route } from "react-router-dom";
import "./App.scss";

// Components
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Tours from "./pages/Tours";
import Gallery from "./pages/Gallery";
import Safety from "./pages/Safety";
import SpaceShuttle from "./pages/SpaceShuttle";
import Contact from "./pages/Contact";
import Tour from "./compontents/Tour";

// ADMIN Compontents
import AdminLayout from "./layout/admin/AdminLayout"
import AdminHome from "./pages/admin/AdminHome";
import AdminTours from "./pages/admin/AdminTours";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminToursCreate from "./pages/admin/AdminToursCreate";
import AdminToursEdit from "./pages/admin/AdminToursEdit";
import AdminSpaceShuttleEdit from "./pages/admin/AdminSpaceShuttleEdit";
import AdminNewsSubscription from "./pages/admin/AdminNewsSubscription";
import AdminTeamMembers from "./pages/admin/AdminTeamMembers";
import AdminTeamMembersCreate from "./pages/admin/AdminTeamMembersCreate";
import AdminTeamMembersEdit from "./pages/admin/AdminTeamMembersEdit";



function App() {
  return (

    //********************************************************************************
    // HUSK at <BrowserRouter> OG <LoginContextProvider> er placeret i index.js!!!!!!
    //********************************************************************************

    
    <Routes>

      {/* --------------- PUBLIC */}
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />
        <Route path="rumfaergen" element={<SpaceShuttle />} />
        <Route path="ture" element={<Tours />} />

        <Route path="ture/tour/:tourId" element={<Tour />} />
        <Route path="galleri" element={<Gallery />} />
        <Route path="Sikkerhed" element={<Safety />} />
        <Route path="kontakt" element={<Contact />} />
        <Route path="Login" element={<Login />} />

        

        {/* SØGNING */}

{/*         <Route path="search/:searchWord" element={ <SearchResult /> } /> */}


        {/* ------ NoMatch SKAL ligge nederst, da den spørg om alle url'erne matcher, hvis de gør bliver de vist, og url'en ikke matcher med noget, skal den vise siden NoMatch ------ */}

        <Route path="*" element={<NoMatch />} />

      </Route>



      {/* --------------- ADMIN */}

      <Route path="/admin" element={<AdminLayout />}>

        <Route index element={<AdminHome />} />
        <Route path="admintours" element={<AdminTours />} />
        <Route path="admintourscreate" element={<AdminToursCreate />} />
        <Route path="admintoursedit/:tourId" element={<AdminToursEdit />} /> {/* : parametre og er ikke em del af path'et*/}
        <Route path="adminabout" element={<AdminAbout />} />
        <Route path="adminspaceshuttle" element={<AdminSpaceShuttleEdit />} />
        <Route path="adminnewssubscription" element={<AdminNewsSubscription />} />
        <Route path="adminteammembers" element={<AdminTeamMembers />} />
        <Route path="adminteammemberscreate" element={<AdminTeamMembersCreate />} />
        <Route path="adminteammembersedit/:teammemberId" element={<AdminTeamMembersEdit />} /> {/* : parametre og er ikke em del af path'et*/}
        <Route path="*" element={<NoMatch />} />

      </Route>

    </Routes>
  );
}

export default App;
