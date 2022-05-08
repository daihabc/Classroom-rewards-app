import { useState, useEffect } from "react";
import { fetchLogin } from "./services";

function Login({ setLoggedIn, setError }) {
  const [user, setUser] = useState("");

  function userLogIn() {
    fetchLogin(user)
      .then(() => {
        setLoggedIn(true);
        setError("");
      })
      .catch((err) => {
        setLoggedIn(false);
        setError(err.error);
      });
  }

  return (
    <span className="login__container">
      <input
        className="login__input"
        placeholder="Enter anything to login"
        onInput={(e) => setUser(e.target.value)}
      />
      <button className="button" type="button" onClick={() => userLogIn()}>
        Login
      </button>
    </span>
  );
}

export default Login;
