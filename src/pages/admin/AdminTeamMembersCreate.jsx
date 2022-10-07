import React, { useState } from 'react'

// SCSS
import "../../scss/admin/AdminTeamMembersCreate.scss"

// Components
import Fejl from '../../compontents/Fejl'
import Loading from '../../compontents/Loading'


// API-Kald
import { createTeamMember } from '../../helpers/api'


const AdminTeamMembersCreate = () => {


    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Til svar fra API'et, så brugeren kan aflæse om det er gået godt eller skidt - (hvad statusen fra API'et er)
    const [message, setMessage] = useState()


    const handleSubmit = (e) => {

        e.preventDefault()

        // Kald api og opret/POST nyt team medlem

        setLoading(true) // loader loader

        let newMember = new FormData(e.target);

        // Promise Chain (then, catch og finally)
        createTeamMember(newMember)

            .then((data) => {

                setMessage("Nyt medlem oprettet - med navnet: " + data.oprettet.name)

                setError(false)

                e.target.reset() // Tøm formularfelterne


            })

            .catch((err) => {

                setError(true)

                setMessage() // Tøm besked

            })

            .finally(() => {

                setLoading(false)

            })

    }

    return (

        <div className="adminTeamMemberCreateContainer">

            <h1>Opret en ny Team medlem</h1>



            {
                // Hvis Api-kaldet loader - Den venter på error eller data fra api'et
                loading && <Loading />

            }


            {
                // Hvis der er fejl i API-kaldet viser den en fejlbesked
                error && <Fejl />

            }

            <form onSubmit={handleSubmit}>

                 <label>Navn:
                    <input type="text" name="name" required placeholder="Navn..." />
                </label>

                <label>Rolle:
                    <input type="text" name="role" required placeholder="Rolle..." />
                </label>

                <label>Email:
                    <input type="email" name="email" required placeholder="E-mail..." />
                </label>

                <label>Telefonnummer: (husk +45)
                    <input type="number" name="phone" required placeholder="Tlf..." />
                </label>

                <label>Upload billede af team member
                    <input type="file" name="image" accept="image/x-png,image/jpeg" required />
                </label>

                <button type="submit">Opret nyt team medlem</button>

                {/* Hvis der er en besked, så hvis mig den i et h2 tag */}
                {
                    message && <h2 style={{ color: "lightgreen" }}>{message}</h2>
                }

            </form>

        </div>

    )
}

export default AdminTeamMembersCreate
