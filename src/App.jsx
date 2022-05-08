import "./App.css";
import { useState, useEffect } from "react";
import Login from "./Login";
import Logout from "./Logout";
import Main from "./Main";
import { fetchSession } from "./services";
import Alert from "@mui/material/Alert";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSession()
      .then(() => {
        setLoggedIn(true);
        setError("");
      })
      .catch((err) => {
        setError(err.error);
        setLoggedIn(false);
      });
  }, []);

  return (
    <div className="App">
      <div className="alert__container">
        {loggedIn && error && (
          <Alert className="alert" severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}
      </div>
      {loggedIn && <Logout setLoggedIn={setLoggedIn} setError={setError} />}
      {loggedIn && (
        <Main
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setError={setError}
        />
      )}
      {!loggedIn && <Login setLoggedIn={setLoggedIn} setError={setError} />}
    </div>
  );
}

export default App;
