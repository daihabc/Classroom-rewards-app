import { useState } from "react";

function Views({ entries }) {
  const [selectedView, setSelectedView] = useState(Object.keys(entries)[0]);

  function toggleView(title) {
    setSelectedView(title);
  }

  return (
    <div className="views">
      <div className="view__container">
        {Object.keys(entries).map((title) => {
          return (
            <div
              key={title}
              className={`view ${
                selectedView === title ? "view__selected" : ""
              }`}
            >
              <button className="view__title" onClick={() => toggleView(title)}>
                {title}
              </button>
            </div>
          );
        })}
      </div>
      <div className="view__content">{entries[selectedView]}</div>
    </div>
  );
}
export default Views;
