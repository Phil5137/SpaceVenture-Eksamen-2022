import React from 'react'

// Her har jeg destructure jeg props, så jeg kan skrive den ind med dens navn, i stedet for at skulle skrive props, for derefter at lave en variabel med den

const OurTeamData = ({ ourTeamData }) => {

    return (

        <article className="ourTeamCards">

            <div className="cardContent">
                
                    <img className="cardImg" src={"http://localhost:4444/images/team/" + ourTeamData.image} />

                <h4 className="cardName"> {ourTeamData.name} </h4>

                <h5 className="cardRole"> {ourTeamData.role} </h5>

                <p className="cardPhone"> {ourTeamData.phone} </p>
            </div>

        </article>



    )
}

export default OurTeamData