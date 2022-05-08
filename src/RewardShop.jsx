import { useState, useEffect } from "react";
import { fetchInventories } from "./services";
import InventoryItem from "./InventoryItem";

function RewardShop({ updatePoints, availablePoints, setLoggedIn, setError }) {
  const [inventories, setInventories] = useState({});

  useEffect(() => {
    fetchInventories()
      .then((rawInventories) => {
        setInventories(rawInventories);
      })
      .catch((err) => {
        if (err.error === "auth-missing") {
          setLoggedIn(false);
        }
        setError(err.error);
      });
  }, [setInventories]);

  return (
    <div className="inventories__list">
      {Object.values(inventories).map((inventory) => (
        <InventoryItem
          key={inventory.id}
          inventory={inventory}
          updatePoints={updatePoints}
          availablePoints={availablePoints}
          setLoggedIn={setLoggedIn}
          setError={setLoggedIn}
        />
      ))}
    </div>
  );
}

export default RewardShop;
