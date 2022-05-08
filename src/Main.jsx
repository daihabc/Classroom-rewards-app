import { useState, useEffect } from "react";
import { fetchPoints, fetchUpdatePoints } from "./services";
import Views from "./Views";
import Todos from "./Todos";
import RewardShop from "./RewardShop";
import MyRewards from "./MyRewards";

function Main({ loggedIn, setLoggedIn, setError }) {
  const [availablePoints, setAvailablePoints] = useState();

  const viewContent = {
    Tasks: (
      <Todos
        updatePoints={updatePoints}
        setLoggedIn={setLoggedIn}
        setError={setError}
      />
    ),
    "Reward Shop": (
      <RewardShop
        updatePoints={updatePoints}
        availablePoints={availablePoints}
        setAvailablePoints={setAvailablePoints}
        setLoggedIn={setLoggedIn}
        setError={setError}
      />
    ),
    "My Rewards": <MyRewards setLoggedIn={setLoggedIn} setError={setError} />,
  };

  const [viewPage] = useState(viewContent);

  useEffect(() => {
    fetchPoints()
      .then((rawPoint) => setAvailablePoints(rawPoint))
      .catch((err) => {
        if (err.error === "auth-missing") {
          setLoggedIn(false);
        }
        setError(err.error);
      });
  }, [setAvailablePoints]);

  function updatePoints(pointUpdate) {
    fetchUpdatePoints(pointUpdate)
      .then((rawPoints) => {
        setAvailablePoints(rawPoints);
      })
      .catch((err) => {
        if (err.error === "auth-missing") {
          setLoggedIn(false);
        }
        setError(err.error);
      });
  }

  return (
    <div className="Main">
      <div>Complete tasks to earn points and redeem rewards!</div>
      <div className='my__points'>You have {availablePoints} points</div>
      {loggedIn && <Views entries={viewPage} />}
    </div>
  );
}

export default Main;
