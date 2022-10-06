import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

// SCSS
import "../../scss/admin/AdminToursEdit.scss"

// Components
import Fejl from '../../compontents/Fejl'
import Loading from '../../compontents/Loading'

// RTE - rich text editer - wysiwyg
import Editor from "ckeditor5-custom-build"
import { CKEditor } from '@ckeditor/ckeditor5-react';


// API-Kald
import { getTourById, updateTour } from '../../helpers/api'


const AdminToursEdit = () => {

    // Snup Id (fra url'en) på den tour som skal rettet (er en parameter - se i app.jsx) fordi vi har skrevet :tourId i app.jsx, så er det ikke en del af pathen
    const {tourId} = useParams()

    console.log(tourId);

    // TJEKLISTE    
  /* 
    1. Hvad skal der ske når component loader? Kald fra API eller andet? useEffect hvis API
    2. Events - fx. gem ny tour - hvor der skal ske kald til API eller andet? useEffect hvis API kald

    useEffect skal bruges når der er fx API kald - fx når compententet loader - eller ved re-render (fx slet)
  */
  
  
        const [tour, setTour] = useState()
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(false)

       // Til svar fra API'et, så brugeren kan aflæse om det er gået godt eller skidt - (hvad statusen fra API'et er)
       const [ message, setMessage ] = useState()

       // state til indhold fra texteditoren (bruges af textarea)
        const [ editorTextContent, setEditorTextContent ] = useState()
        const [ editorTextRoomType, setEditorTextRoomType ] = useState()
       

        // Hent tour (ud fra id) som skal rettes
        // Useeffecten kører først når componentet er loaded første gang
        useEffect(() => {
          
            setLoading( true )

            getTourById( tourId )
            .then( ( data ) => {

                setTour( data )
                setError( false )

            })
            .catch( ( err ) => {

                setError( true )
                setTour()

            })
            .finally( () => {

                setLoading( false )

            })
    
        }, [])
        


       const handleSubmit = ( e ) => {

           e.preventDefault()

            // Kald api og opret/POST ny tour

                setLoading(true) // loader loader

            let updatedTour = new FormData(e.target);

            // Promise Chain (then, catch og finally)
            updateTour(updatedTour, tourId)

            .then( ( data ) => {

                setMessage("Tour er rettet - med id'et: " + tour._id)

                setError(false)
           /*      e.target.reset() // Tøm formularfelterne

                setEditorTextContent("") // Tøm state -> tømmer ckEditor
                setEditorTextRoomType("") // Tøm state -> tømmer ckEditor */

                

            } )

            .catch(( err ) => {

                setError(true)

                setMessage() // Tøm besked

            })

            .finally( () => {

                setLoading( false )

            })

       }
  
       return (

    <div className= "adminToursEditContainer">

        <h1>Ret Tour</h1>

       
            
        {
            // Hvis Api-kaldet loader - Den venter på error eller data fra api'et
        loading && <Loading /> 
        
        }


        { 
            // Hvis der er fejl i API-kaldet viser den en fejlbesked
        error && <Fejl />
        
        }

        { tour && 
        
            <form onSubmit={ handleSubmit }>


                <label>Titel:
                    <input type="text" name="title" defaultValue={ tour.title } required placeholder="Titel..."/>
                </label>


                <label>Tur beskrivelse:
                    {/* TEXTAREA HAR FÅET DISPLAY NONE HER!!!!!!!!!!!!!!!!!!!!!!!! */}
                    <textarea style={{ display: "none" }} name="content" defaultValue={ tour.content } required placeholder="Beskrivelse..." />
                </label>
                <div className="ckeEditor">
                    <CKEditor className="editor"
                        editor={Editor}
                        data={tour.content}
                        // Vi laver en onChange som siger at når der ændres i teksten, skal den hente data
                        onChange={(event, editor) => {

                            setEditorTextContent(editor.getData())
                        }}

                    />
                </div>

                <label>Destination:
                    <input type="text" name="destination" required defaultValue={ tour.destination } placeholder="Destination..." />
                </label>

                <label>Turens pris:
                    <input type="text" name="price" required defaultValue={ tour.price } placeholder="Pris..." />
                </label>

                <label>Rejsetid:
                    <input type="text" name="traveltime" required defaultValue={ tour.traveltime } placeholder="Rejsetid..." />
                </label>

                <label>Afstand fra jorden:
                    <input type="text" name="distance" required defaultValue={ tour.distance } placeholder="Afstand fra jorden..." />
                </label>

                <label>
                        nuværende billeder: 
                        <img src={ "http://localhost:4444/images/tours/" + tour.image1 } alt="Nuværende cover-foto" />
                        <img src={ "http://localhost:4444/images/tours/" + tour.image2 } alt="Nuværende cover-foto" />
                        </label>
              

                <button type="submit">Gem rettelse</button>

                     {/* Hvis der er en besked, så hvis mig den i et h2 tag */}
        {
            message && <h2 style={{color: "lightgreen"}}>{ message }</h2>
        }
        
            </form>
        
        }


    </div>
 
  )
}

export default AdminToursEdit
