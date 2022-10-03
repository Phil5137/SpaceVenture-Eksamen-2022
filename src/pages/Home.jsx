// SCSS

import Newssubscription from "../compontents/Newssubscription"
import OurTeam from "../compontents/OurTeam"
import "../scss/Home.scss"




const Home = () => {


  return (

    <div className="homeContainer">


      <div className="ourTeamContainer">

        <OurTeam />

      </div>

      
    <div className="newsSubscriptionContainer">

      <Newssubscription />

    </div>


    </div>
    
  )
}

export default Home