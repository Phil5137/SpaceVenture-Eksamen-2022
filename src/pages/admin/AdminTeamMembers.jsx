import React, { useState, useEffect } from "react";

// React-Icons
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';

import { Link } from "react-router-dom";

// APIKALD
import { getOurTeam, deleteTeamMember } from "../../helpers/api";

import Loading from "../../compontents/Loading";
import Fejl from "../../compontents/Fejl";

// SCSS
import "../../scss/admin/AdminTeamMembers.scss"




const AdminTeamMembers = () => {

    const [teamMembers, setTeamMembers] = useState() // data/tekst mv. der skal rettes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // State til håndtering om en team member er blevet slettet - eller om der opstod en fejl
    const [teamMemberDeleted, setTeamMemberDeleted] = useState()



    useEffect(() => {

        setLoading(true)

        getOurTeam()

            .then(data => {
                setTeamMembers(data);
                // Laver et kald til api'et hvis det går godt, smider den dataen ind i en state, som i dette tilfælde er setAboutcontent. Som ville få hele componentet til at re-render, hvis den ikke havde en dependencylist ( "[]" )

                // Der er 2 ændringer som kan få et compontent til at re-render, hvis der er en ændring i en state, eller i props.
                setError(false);
            })

            .catch((err) => {
                setError(true);
                setTeamMembers();
            })

            .finally(() => {
                setLoading(false)
            });

        // [] = En dependencylist når komponentet rerender, spørger den om den skal udfører useeffecten igen eller skal jeg lade vær. Denne dependency list lytter på om der er ændring i staten (setAboutcontent), hvis den ikke havde været der ville den stå og re-render i et uendeligt loop. 

    }, [teamMemberDeleted])  // Lytter på omder bliver slettet en tour = re-render  = nyt api-kald

    // en tom [] dependencylist betyder at useEffect'en kun kører 1 gang => når compontentet loader første  gang (og IKKE ved re-render)




    const handleDelete = (Id, name) => {
        /* alert(Id) */

        if (window.confirm("Er du sikker på du vil slette team medlemmet: '" + name)) {

            // Den spørger om vi er sikre på om vi vil slette. Som består af true ("OK") og false ("Cancel")

            // Brugeren får lov til at vælge true eller false

            // Hvis brugeren svarer ok, bliver der ikke kørt handleDelete. If statement lytter på true eller false, for at se om den skal køre den kode der står i if statementen

            setLoading(true);

            deleteTeamMember(Id)
                .then((data) => {

                    setTeamMemberDeleted([true, Id])

                })

                .catch((err) => {

                    console.log(err);

                    setTeamMemberDeleted(false)

                })

                .finally(() => {

                    setLoading(false)

                })
        }

    }



    return (


        <section className="adminTeamMembersContainer">

            <h1 className="topBannerText">Opret, ret & slet - Team medlemmer</h1>

            <figure className="tourBannerImg">
                <img src={process.env.PUBLIC_URL + "/img/spaceship1.jpg"} alt="billede af mars - fra turen Mars" />
            </figure>



            <div className="adminTeamMembersContentContainer">



                <h2>Team medlemmer</h2>

                <Link className="createTeamMemberLink" to="/admin/adminteammemberscreate"> <AiOutlinePlus /></Link>


                {
                    // Hvis api-kaldet loader - den venter på error eller data
                    loading && <Loading />
                }


                {
                    // Hvis der er fejl fra api
                    error && <Fejl fejlBesked=" Data kan ikke hentes, prøv senere... " />
                }

                {

                    teamMembers &&
                    <div className="cardContainer">

                        {
                            teamMembers.map(tm =>

                                <section className="card" key={tm._id}>

                                    <figure>

                                        <img src={"http://localhost:4444/images/team/" + tm.image} alt="Nuværende cover-foto" />

                                    </figure>

                                    <h4> {tm.name} </h4>

                                    <h5> {tm.role} </h5>

                                    <p > {tm.phone} </p>



                                    <div className="iconContainer">
                                        <AiOutlineDelete className="icons" size="2rem" color="red" onClick={() => handleDelete(tm._id, tm.name)} />

                                        <Link to={"/admin/adminteammembersedit/" + tm._id}> <AiOutlineEdit className="icons" size="2rem" color="green" /></Link>

                                    </div>
                                </section>
                            )
                        }

                    </div>

                }

            </div>
        </section>
    );
};

export default AdminTeamMembers;
