import React from 'react'

// React-Icons
import { FaArrowRight } from 'react-icons/fa';

// React router dom
import { NavLink, Link, useNavigate } from 'react-router-dom'

// SCSS
import "../scss/MoonAndMarsCards.scss"

const MoonAndMarsCards = () => {
    return (

        <section className="moonAndMarsCardsContainer">

            <section className="moonAndMarsCardsContent">


                <div className="moonCard">

                    <NavLink to="/tour/617f8116066b123e4c7c941c" >

                        <figure>

                            <img src="/img/moon-btn.jpg" alt="Billede af månekortet" />

                        </figure>

                        <h3>Månen</h3>


                    </NavLink>

                </div>



                <div className="moonCard">

                    <NavLink to="/tour/617f80a6066b123e4c7c941a" >

                        <figure>

                            <img src="/img/mars-btn.jpg" alt="Billede af marskortet" />

                        </figure>

                        <h3>Mars</h3>


                    </NavLink>

                </div>

            </section>

            <div className="tourLinkContainer">

                <li>

                    <NavLink to="/ture" > Vores ture  </NavLink>

                </li>

                <FaArrowRight className="icons" />

            </div>

        </section>


    )
}

export default MoonAndMarsCards