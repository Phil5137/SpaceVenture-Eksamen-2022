import React, { useState, useEffect } from 'react'


// SCSS
import "../../scss/admin/AdminAbout.scss"

// APIKALD
import { getAbout, updateAbout } from '../../helpers/api';

// RTE - rich text editer - wysiwyg
import Editor from "ckeditor5-custom-build"
import { CKEditor } from '@ckeditor/ckeditor5-react';

// Components
import Loading from '../../compontents/Loading';
import Fejl from '../../compontents/Fejl';




const AdminAbout = () => {

    const [ aboutData, setAboutData ] = useState() // data/tekst mv. der skal rettes
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( false );

    // State til status på opdatering
    const [ message, setMessage ] = useState()

    // state til indhold fra texteditoren (bruges af textarea)
    const [ ckEditorText, setCkEditorText ] = useState()
    


    // Kald api og put data (eller error) i state:

    useEffect(() => {
      
        setLoading ( true )

        getAbout()
            .then( data => {
                setAboutData( data ); 
                // Laver et kald til api'et hvis det går godt, smider den dataen ind i en state, som i dette tilfælde er setAboutcontent. Som ville få hele componentet til at re-render, hvis den ikke havde en dependencylist ( "[]" )

                // Der er 2 ændringer som kan få et compontent til at re-render, hvis der er en ændring i en state, eller i props.
                setError( false ); 
            } )
            .catch( ( err ) => {
                setError( true );
                setAboutData();
            }) 
            .finally( () => {
                setLoading( false )
            });
        
            // [] = En dependencylist når komponentet rerender, spørger den om den skal udfører useeffecten igen eller skal jeg lade vær. Denne dependency list lytter på om der er ændring i staten (setAboutcontent), hvis den ikke havde været der ville den stå og re-render i et uendeligt loop. 
    }, []) 
    // en tom [] dependencylist betyder at useEffect'en kun kører 1 gang => når compontentet loader første  gang (og IKKE ved re-render)

    

    const handleSubmit = ( e ) => {
        
        e.preventDefault() // Undgå reload af component (Så vil vi miste dataen)
    
        // lav formularindhold om til formdata
        let aboutRettet = new FormData( e.target )

        updateAbout( aboutRettet )
            .then( data => {
                setMessage( data.message )
            })
            .catch( err => {
                setMessage( "Der er sket en fejl - prøv igen senere" ) 
            })
    
    }


  return (

    <div className="adminAboutContainer"> 
        <h2>Ret indhold på Lidt om os siden</h2>

            {
                // Hvis api-kaldet loader - den venter på error eller data
                loading && <Loading />
            }

            {
                // Hvis der er fejl fra api
                error && <Fejl fejlBesked=" Data kan ikke hentes, prøv senere... "/>
            }

            {
                // Hvis der apidata i vores state
                aboutData &&  
                
                <form onSubmit={ handleSubmit }>

                    <label>Undertitel:  
                        <input type="text" name="title" defaultValue={ aboutData.title } placeholder="Titel..."/>
                    </label>

                    <label>Indhold: 
                        {/* Textareas inhold sendes i update */}
                        {/* TEXTAREA HAR DISPLAY NONE!!!!!!!!!!!!! */}
                   <textarea style={{display: "none"}} name="content" defaultValue={ ckEditorText } placeholder="Indhold..." ></textarea> {/* Vi siger at textarea skal holde øje med vores textEditor */}
                    </label>    
                    <div className="ckeEditor">
                    <CKEditor className="editor"
                        editor={ Editor }
                        data={ aboutData.content }

                        // Vi laver en onChange som siger at når der ændres i teksten, skal den hente data
                        onChange = { ( event, editor ) => {
                            setCkEditorText( editor.getData())
                        } }

                        // Vi laver en onReady så den kun ersatter inholdet i vores textArea, når den er klar 
                        onReady = { ( editor ) => {
                            setCkEditorText( editor.getData())
                        } }
                    />
                    </div>

                  
                    <div>
                        <label>Vælg evt. et nyt billede: (overskriver det eksisterende billede) 
                            <input type="file" name="image"/>
                        </label>
                           <div><img src="/img/om-os.jpg" alt="Foto" /></div>
                 </div>
                    <button type="submit" >Gem rettelse</button>

                </form>
            
            }
                {
                    message && <h2 style={{color: "lightgreen"}}>{ message } ✔</h2>
                }
    </div>
      
      )
}

export default AdminAbout