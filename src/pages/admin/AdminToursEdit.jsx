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

                <label>Teaser:
                    <textarea name="teaser" required placeholder="Teaser tekst..." defaultValue={ tour.teaser }></textarea>
                </label>

                <label>Beskrivelse:
                    {/* TEXTAREA HAR FÅET DISPLAY NONE HER!!!!!!!!!!!!!!!!!!!!!!!! */}
                    <textarea style={{ display: "none" }} name="content" defaultValue={ editorTextContent } required placeholder="Beskrivelse..."/>
                </label>
                <div className="ckeEditor">
                    {/* Fødekanal til textarea som skal skjules men være der */}
                    <CKEditor className="editor"
                        editor={ Editor }
                        data = { tour.content }
                        // Vi laver en onChange som siger at når der ændres i teksten, skal den hente data
                        onChange = { ( event, editor ) => {
                            
                            setEditorTextContent( editor.getData())
                        } }

                         onReady={ ( editor ) => {
                            setEditorTextContent( editor.getData() )
                        } }
                   
                    />
                    </div>

                <label>Værelsestype:
                    {/* TEXTAREA HAR FÅET DISPLAY NONE HER!!!!!!!!!!!!!!!!!!!!!!!! */}
                    <textarea style={{ display: "none" }} name="roomtype" defaultValue={ editorTextRoomType } required placeholder="Værelsestype..."/>
                </label>
                <div className="ckeEditor">
                    <CKEditor className="editor"
                        editor={ Editor }
                        data = { tour.roomtype }
                        // Vi laver en onChange som siger at når der ændres i teksten, skal den hente data
                        onChange = { ( event, editor ) => {
                            
                            setEditorTextRoomType( editor.getData())
                        } }

                        onReady={ ( editor ) => {
                            setEditorTextRoomType( editor.getData() )
                        } }

                    />
                    </div>

                <label>Rejsedato:
                    <input type="date" name="traveldate" required placeholder="Rejsedato..."  defaultValue={ new Date( tour.traveldate ).toLocaleDateString( "fr-CA" ) }
                    min={ new Date().toLocaleDateString ( "fr-CA" ) }
                    /* Her gør vi så brugeren ikke kan vælge en dato der er ældre end den idag. Han skal mindst vælge idag også frem. */
                    />
                    {/* Et HACK! Her bruger vi den franske canadiske da de tilfæligvis udskriver deres dato som vi gerne vil have den. Som er yyyy-mm-dd */}
                </label>

                <label>Varighed i dage:
                    <input type="number" name="duration" min="1" max="500" defaultValue={ tour.duration } required placeholder="Tourens varighed (i dage)..."/>
                </label>

                <label>Pris, minimun:
                    <input type="number" name="priceminimum" required defaultValue={ tour.priceminimum } placeholder="Minimumspris..."/>
                </label>

                <label>Pris, maksimum:
                    <input type="number" name="pricemaximum" required defaultValue={ tour.priceminimum } placeholder="Maksimumspris..."/>
                </label>

                        nuværende billede: <img src={ "http://localhost:5099/images/tours/" + tour.coverimage } alt="Nuværende cover-foto" />
                <label>Upload eventuelt et nyt coverbillede (overskriver det nuværende):
                    <input type="file" name="image" accept="image/x-png,image/gif,image/jpeg"/>
                </label>

                Nuværende galleri-billeder:
                {
                    // i er den indbyggede "tæller" i map - tæller 0,1,2 osv. for hver runde - her bruger vi den til key (fordi billederne ikke hver i sær har et unikt id)
                    tour.gallery.map( ( gallery, i ) => <img src={ "http://localhost:5099/images/tours/" + gallery} alt="galleri" key={ i } />)
                }

                <label>
                Upload eventuelt nogen nye galleribilleder (overskriver de nuværende)
                    <input type="file" name="galleryimages" multiple accept="image/x-png,image/gif,image/jpeg" />
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
