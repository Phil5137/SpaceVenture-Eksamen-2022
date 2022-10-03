import React from 'react'

// SCSS
import "./Pagination.scss"

const Pagination = ( props ) => {

    // Fra
    let setCurrentPage = props.setCurrentPage   // Besked fra parent (output)
    let currentPage = props.currentPage         // Input fra parent
    let numberOfPages = props.numberOfPages     // antal sider ialt ( beregnes i parent ved at dividere ) input fra parent
    
    // Skift side/visning - modtager den side, som skal vises nu
    const turnPage = ( page ) => {

    setCurrentPage( page ) // Parent // Sætter curentpage til at være den side vi gerne vil vise

    }


    const makePageButtons = () => {

        let pageButtons = []
    
        for ( let index = 0; index < numberOfPages; index++) {
                                                            // Hvis den side vi er på svbrer til index, skal den have klassen "paginationActive"
          pageButtons.push( <button onClick={ () => setCurrentPage( index ) } className={ currentPage === index ? "paginationActive" : null }>{ index + 1 }</button> )
    
        }
    
        return pageButtons
        
      }

  

    return (

        <div className="paginationContainer">

            {/* --- PAGINATION af tours - FREM OG TILBAGE --- */}

            <button 
            disabled={currentPage <= 0 ? true : null} 
            onClick={() => turnPage(currentPage - 1)}
            key={ "p" + 1}
            >
            &lt; &lt; Prev
            </button>

                {
                    makePageButtons()
                }

            {/* Der er 8 tours vi dividerer med 3 sider, og plusser med 1, da den starter på 0, 1, 2 osv. */}

            <button disabled={currentPage >= numberOfPages - 1} onClick={() => turnPage(currentPage + 1)}>Next &gt; &gt;</button>


        </div>

    )
}
export default Pagination