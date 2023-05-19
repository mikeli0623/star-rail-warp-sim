import "../css/DataBank.css";
import React from "react";

export default function FilterButton({ text, active, handleSelect }) {
  const dumbText = text.toLowerCase().replace(/ /g, "-");
  return (
    <div className="filter-button" onClick={() => handleSelect(text)}>
      <div className="filter-img-circle" active={active.toString()}>
        <div
          className="filter-img"
          style={{
            backgroundImage: `url(assets/icon-${dumbText}.webp)`,
          }}
          active={active.toString()}
        />
      </div>
      <span className="filter-text" active={active.toString()}>
        {text}
      </span>
    </div>
  );
}
