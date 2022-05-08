import { fetchAddEarnedRewards } from "./services";

function InventoryItem({
  inventory,
  earnedRewards,
  setEarnedRewards,
  updatePoints,
  availablePoints,
  setLoggedIn,
  setError,
}) {
  function redeemReward(name, point) {
    fetchAddEarnedRewards(name, point)
      // .then(rawEarnedReward => {
      // setEarnedRewards({
      //   ...earnedRewards,
      //   [rawEarnedReward.id]: rawEarnedReward
      // })
      .catch((err) => {
        if (err.error === "auth-missing") {
          setLoggedIn(false);
        }
        setError(err.error);
      });
  }

  return (
    <div className="inventory__ticket">
      <div className="inventory__name"> {inventory.name} </div>
      <div className="inventory__point">
        {" "}
        cost:
        <span className="inventory__point__amount"> {inventory.point} </span>
        point(s)
      </div>
      <button
        // disabled={availablePoints < inventory.point}
        type="button"
        className="redeem"
        onClick={() => {
          redeemReward(inventory.name, inventory.point);
          updatePoints(inventory.point * -1);
        }}
      >
        Redeem
      </button>
    </div>
  );
}

export default InventoryItem;
