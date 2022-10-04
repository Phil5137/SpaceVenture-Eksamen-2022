import React, { useEffect, useState } from 'react'

// SCSS
import "./Slider.scss"

// APIKALD
import { getBanner } from '../helpers/api.js';

// Components
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';


const Slider = () => {

    const [bannerData, setBannerData] = useState() // data/tekst mv. der skal rettes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const [slideIndex, setSlideIndex] = useState(0)


    // Kald api og put data (eller error) i state:

    useEffect(() => {

        setLoading(true)

        getBanner()
            .then(data => {
                setBannerData(data);

                // Der er 2 ændringer som kan få et compontent til at re-render, hvis der er en ændring i en state, eller i props.
                setError(false);
            })
            .catch((err) => {
                setError(true);
                setBannerData();
            })
            .finally(() => {
                setLoading(false)
            });

        // [] = En dependencylist når komponentet rerender, spørger den om den skal udfører useeffecten igen eller skal jeg lade vær. Denne dependency list lytter på om der er ændring i staten (setAboutcontent), hvis den ikke havde været der ville den stå og re-render i et uendeligt loop. 
    }, [])
    // en tom [] dependencylist betyder at useEffect'en kun kører 1 gang => når compontentet loader første  gang (og IKKE ved re-render)


    let t;


    useEffect(() => {


        let i


        let slides = document.getElementsByClassName("mySlides");


        let dots = document.getElementsByClassName("dot");


        if (slideIndex >= slides.length) {
            setSlideIndex(0);
            return;
        }


        if (slideIndex < 0) {
            setSlideIndex(slides.length - 1);
            return;
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }


        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }


        slides[slideIndex].style.display = "block";


        dots[slideIndex].classList.add("active");



        t = setTimeout(() => setSlideIndex(slideIndex + 1), 5000)


        return () => {

            clearTimeout(t)
        }

    }, [slideIndex, bannerData])

    return (
        <div className="sliderContainer">


            <div className="slideshow-container">

                {
                    // Hvis api-kaldet loader - den venter på error eller data
                    loading && <Loading />
                }

                {
                    // Hvis der er fejl fra api
                    error && <Fejl fejlBesked=" Data kan ikke hentes, prøv senere... " />
                }

                {
                    // Hvis der apidata i vores state
                    bannerData &&

                    <div>

                        {

                            bannerData.map((sliderImgs, i) =>
                                <div className="mySlides slidefade" key={sliderImgs + i}>
                                    <img src={"http://localhost:4444/images/banner/" + sliderImgs.image} />

                                    <div className="sliderTextcontainer">
                                    <h2>{sliderImgs.title}</h2>
                                        <h3>{sliderImgs.content}</h3>
                                        
                                    </div>

                                </div>


                            )
                        }

                        <div className="dotContainer">
                            {

                                bannerData.map((sliderImgs, i ) =>
                                    <span className="dot" onClick={() => setSlideIndex(i)} key={"dot" + i} ></span>
                                )
                            }
                        </div>

                    </div>

                }






                {/*  <span className="prev" onClick={() => setSlideIndex(slideIndex - 1)}>&#10094;</span>
                <span className="next" onClick={() => setSlideIndex(slideIndex + 1)}>&#10095;</span> */}



                {/*  <div className="dotContainer">
                    <span className="dot" onClick={ () => { resetTimer(); setSlideIndex( 0 ) } } ></span>
                    <span className="dot" onClick={ () => { resetTimer(); setSlideIndex( 1 ) } } ></span>
                    <span className="dot" onClick={ () => { resetTimer(); setSlideIndex( 2 ) } } ></span>
                </div> */}


            </div>



        </div>
    )
}

export default Slider