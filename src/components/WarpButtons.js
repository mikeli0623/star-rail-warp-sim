import React from "react";

const WarpButtons = ({ onWarp, event, resize }) => {
  if (event === "beginner")
    return (
      <div id="warp-button-ten-hover">
        <img
          className="warp-button beginner"
          onClick={() => onWarp(10)}
          src={"./assets/beginner-10.webp"}
          alt={"10 beginner warps"}
          width={resize.getWidth(300)}
          draggable="false"
        />
      </div>
    );
  else
    return (
      <React.Fragment>
        <div id="warp-button-one-hover">
          <img
            className="warp-button one"
            onClick={() => onWarp(1)}
            src={
              event === "standard"
                ? "./assets/standard-1.webp"
                : "./assets/event-1.webp"
            }
            alt={event === "standard" ? "1 standard warp" : "1 event warp"}
            width={resize.getWidth(240)}
            draggable="false"
          />
        </div>
        <div id="warp-button-ten-hover">
          <img
            className="warp-button ten"
            onClick={() => onWarp(10)}
            src={
              event === "standard"
                ? "./assets/standard-10.webp"
                : "./assets/event-10.webp"
            }
            alt={event === "standard" ? "10 event warps" : "10 standard warps"}
            width={resize.getWidth(240)}
            draggable="false"
          />
        </div>
      </React.Fragment>
    );
};

export default WarpButtons;
