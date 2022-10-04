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

                    <NavLink to="/maanen" >

                        <figure>

                            <img src={process.env.PUBLIC_URL + "/img/moon-btn.jpg"} />

                        </figure>

                        <h3>Månen</h3>


                    </NavLink>
                    
                </div>



                <div className="moonCard">

                    <NavLink to="/mars" >

                        <figure>

                            <img src={process.env.PUBLIC_URL + "/img/mars-btn.jpg"} />

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