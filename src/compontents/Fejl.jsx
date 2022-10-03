import React from 'react'

const Fejl = ( {fejlBesked} ) => {
  return (
    <div  style={{color: "red"}}>Fejl - { fejlBesked } 😥</div>
  )
}

export default Fejl