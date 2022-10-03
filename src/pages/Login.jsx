import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

// Import loginContext så der er mulighed for login
import { LoginContext } from "../context/LoginContext";

// SCSS
import "../scss/Login.scss";

const Login = () => {
  const { signIn, user } = useContext(LoginContext);

  if (user) {
    // Hvis der ikke er en bruger, vil jeg sende burgeren tilbage til login siden

    return <Navigate to="/admin" replace />;
  }

  const handleLogin = (e) => {
    const usernameValue = e.target.inputUsername.value;

    const passwordValue = e.target.inputPassword.value;

    e.preventDefault(); // Undgå at hele siden reloades ved submit
    // console.log( usernameValue, passwordValue )
    signIn(usernameValue, passwordValue);
  };

  return (
    <div className="loginContainer">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label htmlFor="inputUsername">
          Username:
          <input
            type="text"
            name="inputUsername"
            id="inputUsername"
            placeholder="Dit Username..."
            required
          />
        </label>

        <label htmlFor="inputPassword">
          Password:
          <input
            type="password"
            name="inputPassword"
            id="inputPassword"
            placeholder="Dit Password..."
            required
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
