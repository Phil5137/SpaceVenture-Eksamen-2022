import { useState, createContext } from "react"


export const LoginContext = createContext();


const LoginContextProvider = (props) => {

    // USER state - indeholder data hvis en bruger er logget ind
    // --------------------------------------------------------
    const [ user, setUser ] = useState("Admin")
    

    // Login-funktion (matcher brugernavn og password)
    // --------------------------------------------------------
    let signIn = ( username, password ) => {
        if ( username === "admin" && password === "123" ) {
            setUser( username ); // = Logget ind
        }   else {
                setUser( null );   // = "Logget ud"
        }
    }


    // Logud funktion
    // --------------------------------------------------------
    let signOut = () => {
        setUser( null );
    }


    // Return - det der skal trækkes med ud
    return (
        <LoginContext.Provider value={{ user, signIn, signOut }}>
            { props.children }
        </LoginContext.Provider>
    )
    
}

export default LoginContextProvider