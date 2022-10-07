import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

// SCSS
import "../../scss/admin/AdminTeamMembersEdit.scss"

// Components
import Fejl from '../../compontents/Fejl'
import Loading from '../../compontents/Loading'

// API-Kald
import { getTeamMemberById, updateTeamMember } from '../../helpers/api'


const AdminTeamMembersEdit = () => {

    // Snup Id (fra url'en) på den tour som skal rettet (er en parameter - se i app.jsx) fordi vi har skrevet :tourId i app.jsx, så er det ikke en del af pathen
    const { teammemberId } = useParams()

    console.log( teammemberId );

    // TJEKLISTE    
    /* 
      1. Hvad skal der ske når component loader? Kald fra API eller andet? useEffect hvis API
      2. Events - fx. gem ny tour - hvor der skal ske kald til API eller andet? useEffect hvis API kald
  
      useEffect skal bruges når der er fx API kald - fx når compententet loader - eller ved re-render (fx slet)
    */


    const [teamMembers, setTeamMembers] = useState() // data/tekst mv. der skal rettes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Til svar fra API'et, så brugeren kan aflæse om det er gået godt eller skidt - (hvad statusen fra API'et er)
    const [message, setMessage] = useState()

    // Hent tour (ud fra id) som skal rettes
    // Useeffecten kører først når componentet er loaded første gang
    useEffect(() => {

        setLoading(true)

        getTeamMemberById(teammemberId)
            .then((data) => {

                setTeamMembers(data)
                setError(false)

            })
            .catch((err) => {

                setError(true)
                setTeamMembers()

            })
            .finally(() => {

                setLoading(false)

            })

    }, [])



    const handleSubmit = (e) => {

        e.preventDefault()

        // Kald api og opret/POST ny tour

        setLoading(true) // loader loader

        let updatedTeamMember = new FormData(e.target);

        // Promise Chain (then, catch og finally)
        updateTeamMember(updatedTeamMember, teammemberId)

            .then((data) => {

                setMessage("Medlem er rettet")

                setError(false)
                /*      e.target.reset() // Tøm formularfelterne
     
                     setEditorTextContent("") // Tøm state -> tømmer ckEditor
                     setEditorTextRoomType("") // Tøm state -> tømmer ckEditor */



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

        <div className="adminTeamMembersEditContainer">

            {
                // Hvis Api-kaldet loader - Den venter på error eller data fra api'et
                loading && <Loading />

            }


            {
                // Hvis der er fejl i API-kaldet viser den en fejlbesked
                error && <Fejl />

            }

            {
                teamMembers &&

                <form onSubmit={handleSubmit}>

                    <label>Navn:
                        <input type="text" name="name" defaultValue={teamMembers.name} placeholder="Navn..." />
                    </label>

                    <label>Rolle:
                        <input type="text" name="role" defaultValue={teamMembers.role} placeholder="Rolle..." />
                    </label>

                    <label>Email:
                        <input type="email" name="email" defaultValue={teamMembers.email} placeholder="E-mail..." />
                    </label>

                    <label>Telefonnummer (husk +45):
                        <input type="text" name="phone" defaultValue={teamMembers.phone} placeholder="Tlf..." />
                    </label>

                    <label >
                        Nuværende team medlem billede:
                        <figure className="imgContainer">
                            <img src={"http://localhost:4444/images/team/" + teamMembers.image} alt="Nuværende medlemsfoto" />

                            Vælg evt. et nyt billede: (overskriver det eksisterende billede)
                            <input type="file" name="image" accept="image/x-png,image/jpeg"/>
                        </figure>
                    </label>

                    <button type="submit">Ret medlem</button>

                    {/* Hvis der er en besked, så hvis mig den i et h2 tag */}
                    {
                        message && <h2 style={{ color: "lightgreen" }}>{message}</h2>
                    }

                </form>

            }


        </div>

    )
}

export default AdminTeamMembersEdit
