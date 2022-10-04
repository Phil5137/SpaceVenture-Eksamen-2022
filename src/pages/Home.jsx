// SCSS
import "../scss/Home.scss";

// Components
import AboutUs from "../compontents/AboutUs";
import Newssubscription from "../compontents/Newssubscription";
import OurTeam from "../compontents/OurTeam";
import MoonAndMarsCards from "../compontents/MoonAndMarsCards";
import Slider from "../compontents/Slider";

const Home = () => {
  return (
    <main className="homeContainer">
      <section className="sliderContainer">
        <figure>
          <Slider />
        </figure>
      </section>

      <section className="moonAndMarsCardsContainer">
        <MoonAndMarsCards />
      </section>

      <section className="aboutContainer">
        <AboutUs />
      </section>

      <section className="ourTeamContainer">
        <OurTeam />
      </section>

      <section className="newsSubscriptionContainer">
        <Newssubscription />
      </section>
    </main>
  );
};

export default Home;
