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
       const [ message, setMessage ] = useState()

       // state til indhold fra texteditoren (bruges af textarea)
        const [ editorTextContent, setEditorTextContent ] = useState()
        const [ editorTextRoomType, setEditorTextRoomType ] = useState()
       

       const handleSubmit = ( e ) => {

           e.preventDefault()

            // Kald api og opret/POST ny tour

                setLoading(true) // loader loader

            let newTour = new FormData(e.target);

            // Promise Chain (then, catch og finally)
            createTour(newTour)

            .then( ( data ) => {

                setMessage("Ny tour er oprettet - med titlen: " + data.oprettet.title)

                setError(false)

                e.target.reset() // Tøm formularfelterne

                setEditorTextContent("") // Tøm state -> tømmer ckEditor
                setEditorTextRoomType("") // Tøm state -> tømmer ckEditor

                

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

    <div className= "adminToursCreateContainer">

        <h1>Opret en ny tour</h1>

       
            
        {
            // Hvis Api-kaldet loader - Den venter på error eller data fra api'et
        loading && <Loading /> 
        
        }


        { 
            // Hvis der er fejl i API-kaldet viser den en fejlbesked
        error && <Fejl />
        
        }

            <form onSubmit={ handleSubmit }>

                <label>Titel:
                    <input type="text" name="title" required placeholder="Titel..."/>
                </label>

                <label>Teaser:
                    <textarea name="teaser" required placeholder="Teaser tekst..."></textarea>
                </label>

                <label>Beskrivelse:
                    {/* TEXTAREA HAR FÅET DISPLAY NONE HER!!!!!!!!!!!!!!!!!!!!!!!! */}
                    <textarea style={{ display: "none" }} name="content" defaultValue={ editorTextContent } required placeholder="Beskrivelse..."/>
                </label>
                <div className="ckeEditor">
                    <CKEditor className="editor"
                        editor={ Editor }
                        data = { editorTextContent }
                        // Vi laver en onChange som siger at når der ændres i teksten, skal den hente data
                        onChange = { ( event, editor ) => {
                            
                            setEditorTextContent( editor.getData())
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
                        data = { editorTextRoomType }
                        // Vi laver en onChange som siger at når der ændres i teksten, skal den hente data
                        onChange = { ( event, editor ) => {
                            
                            setEditorTextRoomType( editor.getData())
                        } }

                    />
                    </div>

                <label>Rejsedato:
                    <input type="date" name="traveldate" required placeholder="Rejsedato..." onChange={ e => new Date( e.target.value ) < new Date() ? alert( " Vælg en dato senere end i dag " ) : null }/>
                </label>

                <label>Varighed i dage:
                    <input type="number" name="duration" min="1" max="500" defaultValue="14" required placeholder="Tourens varighed (i dage)..."/>
                </label>

                <label>Pris, minimun:
                    <input type="number" name="priceminimum" required placeholder="Minimumspris..."/>
                </label>

                <label>Pris, maksimum:
                    <input type="number" name="pricemaximum" required placeholder="Maksimumspris..."/>
                </label>

                <label>Upload et coverbillede:
                    <input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" required/>
                </label>

                <label>Upload galleri-billeder:
                    <input type="file" name="galleryimages" multiple accept="image/x-png,image/gif,image/jpeg" required />
                </label>

                <button type="submit">Opret ny</button>

                     {/* Hvis der er en besked, så hvis mig den i et h2 tag */}
        {
            message && <h2 style={{color: "lightgreen"}}>{ message }</h2>
        }
        
            </form>

    </div>
 
  )
}

export default AdminToursCreate
