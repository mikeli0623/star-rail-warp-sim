import React from "react";
import "../../css/Banners.css";

const StellarWarp = ({ getWidth, getHeight }) => {
  return (
    <React.Fragment>
      <div
        style={{
          width: getWidth(8),
          height: getHeight(677.33, 1100),
          background:
            "linear-gradient(180deg, black 75%, rgba(255, 255, 255, 0) 100%)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-2720%, -50%)",
        }}
      />
      <div
        style={{
          width: getWidth(764),
          height: getHeight(677.33, 1100),
          background:
            "linear-gradient(to bottom, #282d60 15%, #37437a 30%, #6d91d6 60%, rgba(140, 168, 208, 1) 75%, rgba(140, 168, 208, 0.86) 85%, transparent 100%)",
          position: "absolute",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(8, 8, 8, 0.521)",
          top: "50%",
          left: "50%",
          transform: "translate(-27.5%, -50%)",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/banner/right-corner.webp)",
            height: getHeight(200, 148),
            width: getWidth(148),
            backgroundSize: `${getWidth(148)}px ${getHeight(200, 148)}px`,
            position: "absolute",
            zIndex: "1000",
            right: "0",
          }}
        />
      </div>
      <img
        src="../assets/banner/1.0-standard-left.webp"
        width={getWidth(331)}
        alt="left"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-166%, -50%)",
          zIndex: "10",
        }}
      />
      <img
        src="../assets/banner/bronya.webp"
        width={getWidth(900)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "11",
          top: "50%",
          left: "50%",
          animation: "bronya-animation 2s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <img
        src="../assets/banner/gepard.webp"
        width={getWidth(800)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          animation: "gepard-animation 2s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <img
        src="../assets/banner/himeko.webp"
        width={getWidth(480)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "himeko-animation 2s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <img
        src="../assets/banner/bronya-tag.webp"
        width={getWidth(152)}
        alt="bronya tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "11",
          top: "50%",
          left: "50%",
          transform: "translate(150%, 30%)",
        }}
      />
      <img
        src="../assets/banner/gepard-tag.webp"
        width={getWidth(152)}
        alt="gepard tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "11",
          top: "50%",
          left: "50%",
          transform: "translate(-115%, -165%)",
        }}
      />
      <img
        src="../assets/banner/himeko-tag.webp"
        width={getWidth(152)}
        alt="himeko tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "11",
          top: "50%",
          left: "50%",
          transform: "translate(225%, -100%)",
        }}
      />
    </React.Fragment>
  );
};

export default StellarWarp;
