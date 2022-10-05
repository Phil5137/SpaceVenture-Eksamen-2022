import React from 'react'

// Her har jeg destructure jeg props, så jeg kan skrive den ind med dens navn, i stedet for at skulle skrive props, for derefter at lave en variabel med den

const OurTeamMap = ({ ourTeamData }) => {

    return (

        <article className="ourTeamCards">



             <img className="cardImg" src={"http://localhost:4444/images/team/" + ourTeamData.image} />


            <div className="cardContent">
                <h4 className="cardName"> {ourTeamData.name} </h4>

                <h5 className="cardRole"> {ourTeamData.role} </h5>

                <p className="cardPhone"> {ourTeamData.phone} </p>
            </div>

        </article>



    )
}

export default OurTeamMap