import React from "react";

const WarpButtons = ({ onWarp, event, getWidth, getHeight }) => {
  return (
    <React.Fragment>
      <div id="warp-button-one-hover">
        <img
          className="warp-button one"
          onClick={() => onWarp(1)}
          src={event ? "./assets/event-1.webp" : "./assets/standard-1.webp"}
          alt={event ? "1 event warp" : "1 standard warp"}
          width={getWidth(240)}
          draggable="false"
        />
      </div>
      <div id="warp-button-ten-hover">
        <img
          className="warp-button ten"
          onClick={() => onWarp(10)}
          src={event ? "./assets/event-10.webp" : "./assets/standard-10.webp"}
          alt={event ? "10 event warps" : "10 standard warps"}
          width={getWidth(240)}
          draggable="false"
        />
      </div>
    </React.Fragment>
  );
};

export default WarpButtons;
