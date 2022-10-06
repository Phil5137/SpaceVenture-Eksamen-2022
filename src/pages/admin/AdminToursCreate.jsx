import React, { useState } from 'react'

// SCSS
import "../../scss/admin/AdminToursCreate.scss"

// Components
import Fejl from '../../compontents/Fejl'
import Loading from '../../compontents/Loading'

// RTE - rich text editer - wysiwyg
import Editor from "ckeditor5-custom-build"
import { CKEditor } from '@ckeditor/ckeditor5-react';


// API-Kald
import { createTour } from '../../helpers/api'


const AdminToursCreate = () => {

    // TJEKLISTE    
    /* 
      1. Hvad skal der ske når component loader? Kald fra API eller andet? useEffect hvis API
      2. Events - fx. gem ny tour - hvor der skal ske kald til API eller andet? useEffect hvis API kald
  
      useEffect skal bruges når der er fx API kald - fx når compententet loader - eller ved re-render (fx slet)
    */



    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Til svar fra API'et, så brugeren kan aflæse om det er gået godt eller skidt - (hvad statusen fra API'et er)
    const [message, setMessage] = useState()

    // state til indhold fra texteditoren (bruges af textarea)
    const [editorTextContent, setEditorTextContent] = useState()


    const handleSubmit = (e) => {

        e.preventDefault()

        // Kald api og opret/POST ny tour

        setLoading(true) // loader loader

        let newTour = new FormData(e.target);

        // Promise Chain (then, catch og finally)
        createTour(newTour)

            .then((data) => {

                setMessage("Ny tour er oprettet - med titlen: " + data.oprettet.title)

                setError(false)

                e.target.reset() // Tøm formularfelterne

                setEditorTextContent("") // Tøm state -> tømmer ckEditor


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

        <div className="adminToursCreateContainer">

            <h1>Opret en ny tour</h1>



            {
                // Hvis Api-kaldet loader - Den venter på error eller data fra api'et
                loading && <Loading />

            }


            {
                // Hvis der er fejl i API-kaldet viser den en fejlbesked
                error && <Fejl />

            }

            <form onSubmit={handleSubmit}>

                <label>Titel:
                    <input type="text" name="title" required placeholder="Titel..." />
                </label>

                <label>Tur beskrivelse:
                    {/* TEXTAREA HAR FÅET DISPLAY NONE HER!!!!!!!!!!!!!!!!!!!!!!!! */}
                    <textarea style={{ display: "none" }} name="content" defaultValue={editorTextContent} required placeholder="Beskrivelse..." />
                </label>
                <div className="ckeEditor">
                    <CKEditor className="editor"
                        editor={Editor}
                        data={editorTextContent}
                        // Vi laver en onChange som siger at når der ændres i teksten, skal den hente data
                        onChange={(event, editor) => {

                            setEditorTextContent(editor.getData())
                        }}

                    />
                </div>

                <label>Destination:
                    <input type="text" name="destination" required placeholder="Destination..." />
                </label>

                <label>Turens pris:
                    <input type="text" name="price" required placeholder="Pris..." />
                </label>

                <label>Rejsetid:
                    <input type="text" name="traveltime" required placeholder="Rejsetid..." />
                </label>


                <label>Afstand fra jorden:
                    <input type="text" name="distance" required placeholder="Afstand fra jorden..." />
                </label>


                <label>Upload øverste billede (bliver også coverbiledet):
                    <input type="file" name="image1" accept="image/x-png,image/jpeg" required />
                </label>

                <label>Upload nederste billede (kommer ikke med ud på teasersiden)
                    <input type="file" name="image2" accept="image/x-png,image/jpeg" required />
                </label>

                <button type="submit">Opret ny tur</button>

                {/* Hvis der er en besked, så hvis mig den i et h2 tag */}
                {
                    message && <h2 style={{ color: "lightgreen" }}>{message}</h2>
                }

            </form>

        </div>

    )
}

export default AdminToursCreate
