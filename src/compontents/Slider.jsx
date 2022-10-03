import React, { useEffect, useState } from 'react'

// SCSS
import "./Slider.scss"




const Slider = (props) => {

    const [slideIndex, setSlideIndex] = useState(0) // første img har index 0, da javascript tæller arrays 0, 1, 2 osv.

    // TEST - for at have billeder at øve sig på
    // http://localhost:5099/images/tours/


    // Image array (liste af billeder fra parent)
    const sliderImages = props.tourGallery                      /* [ "f1_ (1).jpg", "f1_ (2).jpg", "f1_ (3).jpg" ] */

    // Caption tekts fra parent
    const captionText = props.captionText

    // Timeout variabel - så timeout kan clear'es i useEffecf

    let t;

    useEffect(() => {

        // Instantiere i som er tælleren i vores loops - t ovenover er til at styre vores setTimeout
        let i // laver en "tæller" som hedder i 

        // liste med alle mySlides
        let slides = document.getElementsByClassName("mySlides"); // Går ned i dokumente og giver og alle de elemter med classNamen "mySlides"

        // liste med alle dots
        let dots = document.getElementsByClassName("dot"); // Går ned i dokumente og giver og alle de elemter med classNamen "dot"



        // Forhindre at slide image - som skal vises - er -1 -2 osv.
        if (slideIndex >= slides.length) {
            setSlideIndex(0);
            return; // bryd ud af useEffect og start forfra med den nye state - 0
        } // hvis tælleren n er blevet større end eller rammer makx antal billeder. Skal den starte forfra


        // Forhindre at slide image - som skal vises - bliver større end antallet af images
        if (slideIndex < 0) {
            setSlideIndex(slides.length - 1); // antal billeder - 1 > 3 billedr så er sidste billede nr. 2
            return; // bryd ud af useEffect og start forfra med den nye state "sidste slide"
        }
        // return gør at der bliver hoppet ud fra useEffecten og den derefter køere den med vores nye state

        // for hver gang der er et billede inde i vores slide (fra vores liste mySlides) tag alle de slides med classen my slides, og put derefter display none på
        // sluk for alle images og dots (der er kun 1 active/en der skal vises)
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // alle de dots der har classen active lige nu, skal erstattet med ingenting aka fjerne class "active" fra dotten der have det
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }

        // tænd for den slide og dot som skal vises nu

        // slideIndex er et udtryk for den slide der skal vises lige nu

        // gå ind i slideIndex og find billede 1 (0) og giv den display block
        slides[slideIndex].style.display = "block";

        // gå ind i slideIndex og find dot 1 (0) og giv den display block
        dots[slideIndex].classList.add("active");


        // Her siger vi at den skal skifte efter 3000 milisekunder (3sek)
        t = setTimeout(() => setSlideIndex(slideIndex + 1), 3000) // tag slideindex og læg en til, og put det derefter op vores state

        // Cleanup-function (indbygget i useEffect)
            return () => {
                // Nulstil evt.tidligere timer så de ikke hober sig op i en kø i hukommenlse (ved mange klik på fx prev)
                clearTimeout( t )
            }

    }, [ slideIndex ])


    return (
        <div className="sliderContainer">

            {/* <!-- Slideshow container --> */}
            <div className="slideshow-container">

                {/* <!-- Full-width images with number and caption text --> */}


                {
                    sliderImages.map((sliderImgs, i) =>
                        <div className="mySlides slidefade" key={sliderImgs}>
                            <img src={"http://localhost:5099/images/tours/" + sliderImgs} />
                            <h3 className="text">{ " Foto " + (i +1) +  " fra " + captionText }</h3>
                        </div>
                    )
                }

                {/* <!-- Next and previous buttons --> */}
                <span className="prev" onClick={() => setSlideIndex( slideIndex - 1 ) }>&#10094;</span>
                <span className="next" onClick={() => setSlideIndex( slideIndex + 1 ) }>&#10095;</span>

                {/* <!-- The dots/circles --> */}
                {/* Grunden til vi ikke bare har mappet vores dots sammen med vores billeder, er at hvis vi ville mappe en ny dotContainer hver gang, det skal den ikke. Den skal mappe alle dotsne ud i en container (dotContainer) */}
                <div className="dotContainer">
                    {
                        sliderImages.map((sliderImgs, i) =>
                            <span className="dot" onClick= { () =>  setSlideIndex( i ) } key={ "dot" + 1} ></span>
                        )
                    }
                </div>

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