import { useState, useEffect } from "react";
import { fetchEarnedRewards, fetchUseRewards } from "./services";

function MyRewards({ setLoggedIn, setError }) {
  const [usedRewards, setUsedRewards] = useState({});
  const [earnedRewards, setEarnedRewards] = useState({});

  useEffect(() => {
    fetchEarnedRewards()
      .then((rawEarnedRewards) => {
        setEarnedRewards(rawEarnedRewards.earnedRewards);
        setUsedRewards(rawEarnedRewards.usedRewards);
      })
      .catch((err) => {
        if (err.error === "auth-missing") {
          setLoggedIn(false);
        }
        setError(err.error);
      });
  }, [setEarnedRewards]);

  function onUseReward(id) {
    fetchUseRewards(id)
      .then((rawUsedReward) => {
        setUsedRewards({
          ...usedRewards,
          [rawUsedReward.id]: rawUsedReward,
        });
        const modifiedEarnRewards = { ...earnedRewards };
        delete modifiedEarnRewards[id];
        setEarnedRewards(modifiedEarnRewards);
      })
      .catch((err) => {
        if (err.error === "auth-missing") {
          setLoggedIn(false);
        }
        setError(err.error);
      });
  }

  return (
    <div className="my__rewards__container">
      <div className="earned__rewards__list">
        Earned Rewards:
        {Object.values(earnedRewards).map((earnedReward) => (
          <div key={earnedReward.id}>
            {earnedReward.name}
            <button
              type="button"
              className="earned__rewards__use"
              onClick={() => onUseReward(earnedReward.id)}
            >
              Use
            </button>
          </div>
        ))}
      </div>
      <div className="used__rewards__list">
        Used Rewards:
        {Object.values(usedRewards).map((usedReward) => (
          <div key={usedReward.id}>{usedReward.name}</div>
        ))}
      </div>
    </div>
  );
}

export default MyRewards;
