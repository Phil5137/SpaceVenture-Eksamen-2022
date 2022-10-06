import React, { useState, useEffect } from 'react'


// SCSS
import "../../scss/admin/AdminSpaceShuttleEdit.scss"

// APIKALD
import { getSpaceShuttle, updateSpaceShuttle } from '../../helpers/api';

// RTE - rich text editer - wysiwyg
import Editor from "ckeditor5-custom-build"
import { CKEditor } from '@ckeditor/ckeditor5-react';

// Components
import Loading from '../../compontents/Loading';
import Fejl from '../../compontents/Fejl';




const AdminSpaceShuttleEdit = () => {

    const [spaceShuttleData, setSpaceShuttleData] = useState() // data/tekst mv. der skal rettes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // State til status på opdatering
    const [message, setMessage] = useState()

    // state til indhold fra texteditoren (bruges af textarea)
    const [ckEditorText, setCkEditorText] = useState()



    useEffect(() => {

        setLoading(true)

        // Henter indholdet fra "Spacecraft" fra API'et
        getSpaceShuttle()
            .then(data => {
                setSpaceShuttleData(data);
            })
            .catch((err) => {
                setError(true);
                setSpaceShuttleData();
            })
            .finally(() => {
                setLoading(false)
            });

    }, [])



    const handleSubmit = (e) => {

        e.preventDefault() // Undgå reload af component (Så vil vi miste dataen)

        // lav formularindhold om til formdata
        let spaceShuttleRettet = new FormData(e.target)

        updateSpaceShuttle(spaceShuttleRettet)
            .then(data => {
                setMessage(data.message)
            })
            .catch(err => {
                setMessage("Der er sket en fejl - prøv igen senere")
            })

    }


    return (

        <section className="adminSpaceShuttleContainer">

            <h1 className="topBannerText">Ret "Rumfærgen"</h1>

            <figure className="tourBannerImg">
                <img src="/img/banner-spaceship.jpg" alt="Billede af rummet" />
            </figure>

            <div className="adminSpaceShuttleContentContainer">
                <h2>Ret indhold på Rumfærge siden</h2>

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
                    spaceShuttleData &&

                    <form onSubmit={handleSubmit}>

                        <label>Undertitel:
                            <input type="text" name="title" defaultValue={spaceShuttleData.title} placeholder="Titel..." />
                        </label>

                        <label>Indhold:
                            {/* Textareas inhold sendes i update */}
                            {/* TEXTAREA HAR DISPLAY NONE!!!!!!!!!!!!! */}
                            <textarea style={{ display: "none" }} name="content" defaultValue={ckEditorText} placeholder="Indhold..." ></textarea> {/* Vi siger at textarea skal holde øje med vores textEditor */}
                        </label>
                        <div className="ckeEditor">
                            <CKEditor className="editor"
                                editor={Editor}
                                data={spaceShuttleData.content}

                                // Vi laver en onChange som siger at når der ændres i teksten, skal den hente data
                                onChange={(event, editor) => {
                                    setCkEditorText(editor.getData())
                                }}

                                // Vi laver en onReady så den kun ersatter inholdet i vores textArea, når den er klar 
                                onReady={(editor) => {
                                    setCkEditorText(editor.getData())
                                }}
                            />
                        </div>

                        <hr />

                        <div>

                            <figure className="imgContainer">
                                <label>Vælg evt. et nyt billede: <br /> (overskriver det eksisterende billede)
                                    <input type="file" name="image" />
                                </label>
                                <div> <img src={"http://localhost:4444/images/spacecraft/" + spaceShuttleData.image} alt="Hvorfor vælge os billede" /> </div>
                            </figure>

                        </div>
                        <button className="sendBtn" type="submit" >Gem rettelse</button>

                    </form>

                }
                {
                    message && <h2 style={{ color: "lightgreen" }}>{message} ✔</h2>
                }
            </div>

        </section>

    )
}

export default AdminSpaceShuttleEdit



