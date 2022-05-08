import { fetchLogout } from "./services";

function Logout({ setLoggedIn, setError }) {
  function addAbilitytoLogout() {
    fetchLogout()
      .then(() => {
        setLoggedIn(false);
        setError("");
      })
      .catch((err) => {
        setLoggedIn(false);
        setError(err.error);
      });
  }

  return (
    <div className="logout__container">
      <button type="button" onClick={() => addAbilitytoLogout()}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
