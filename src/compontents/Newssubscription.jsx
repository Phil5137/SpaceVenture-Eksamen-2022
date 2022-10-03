import React, { useState } from 'react'

// Components
import Loading from '../compontents/Loading';
import Fejl from '../compontents/Fejl';

// SCSS
import "../scss/Newssubscription.scss"

// API
import { subscribeNews, unsubscribeNews } from "../helpers/api"

const Newssubscription = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [tilmeldt, setTilmeldt] = useState(false);

    // Håndter tilmelding
    const handleSubscription = e => {
        e.preventDefault();

        setLoading(true)

        // Snup indhold ra formular og lav et formdata-objekt til API'et
        let formData = new FormData(e.target)

        subscribeNews(formData).then((data) => {
            setTilmeldt(true)
            setError(false)
        })

            .catch((err) => {

                setTilmeldt(false)
                setError(true)
            })

            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <div className="newssubscription">


            {
                loading && <Loading />
            }

            {
                error && <h4>Der er opstået en fejl ... {error}</h4>
            }


                {/* Når du er tilmeldt, skal dette vises */}
            {
                tilmeldt &&

                <>

                    <figure>
                        <img src={process.env.PUBLIC_URL + "/img/newsmail-bg.jpg"} />
                    </figure>

                    <div className="newsContent">
                        <h2>Tak for din tilmedling!</h2>

                        <p>Du vil høre fra os snarest muligt!</p>

                    </div>
                </>
            }

            {/* Hvis der ikke er tilmeldt skal den vise formularen */}
            {
                !tilmeldt &&

                <>

                    <figure>
                        <img src={process.env.PUBLIC_URL + "/img/newsmail-bg.jpg"} />
                    </figure>

                    <div className="newsContent">
                        <h2>Tilmeld dig og få 25% rabat</h2>

                        <p>Tilmeld dig vores nyhedsbrev og få 25% rabat på din første tur!</p>


                        <form onSubmit={handleSubscription}>
                            <input type="email" name="email" placeholder="Din E-mail" required />

                            <button type="submit">Tilmeld</button>



                        </form>
                    </div>
                </>
            }
        </div>
    )
}

export default Newssubscription