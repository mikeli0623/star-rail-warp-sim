import React from "react";
import "../../css/Banners.css";

const ButterflyOnSwordtip = ({ getWidth, getHeight }) => {
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
            "linear-gradient(to bottom, rgba(16, 20, 56, 1) 70%, rgba(255, 255, 255, 0) 100%)",
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
        <img
          src="../assets/banner/1.0-char-banner-back.webp"
          height="100%"
          alt="right"
          draggable="false"
          style={{
            position: "relative",
            transform: "translateX(-3.8%)",
            overflow: "hidden",
            animation: "seele-back-animation 2s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
      </div>
      <div
        className="rate-up-char-icons"
        style={{
          width: getWidth(72.3),
          height: getHeight(206.1, 72.3),
          transform: "translate(-634%, 50%)",
          animation: "appear 50ms 1",
          opacity: "0",
          animationFillMode: "both",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/splash/natasha.webp)",
            width: getWidth(1000),
            height: getWidth(1000),
            backgroundSize: getWidth(1000),
            position: "absolute",
            animation: "natasha-animation 1s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationDelay: "50ms",
            opacity: "0",
            animationFillMode: "both",
          }}
        />
      </div>
      <div
        className="rate-up-char-icons"
        style={{
          width: getWidth(72.3),
          height: getHeight(206.1, 72.3),
          transform: "translate(-510%, 50%)",
          animation: "appear 50ms 1",
          animationDelay: "75ms",
          opacity: "0",
          animationFillMode: "both",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/splash/hook.webp)",
            width: getWidth(1000),
            height: getWidth(1000),
            backgroundSize: getWidth(1000),
            position: "absolute",
            animation: "hook-animation 1s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationDelay: "100ms",
            animationFillMode: "both",
            opacity: "0",
          }}
        />
      </div>
      <div
        className="rate-up-char-icons"
        style={{
          width: getWidth(72.3),
          height: getHeight(206.1, 72.3),
          transform: "translate(-386%, 50%)",
          animation: "appear 50ms 1",
          animationDelay: "150ms",
          opacity: "0",
          animationFillMode: "both",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/splash/pela.webp)",
            width: getWidth(1100),
            height: getWidth(1100),
            backgroundSize: getWidth(1100),
            position: "absolute",
            animation: "pela-animation 1s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationDelay: "150ms",
            animationFillMode: "both",
            opacity: "0",
          }}
        />
      </div>
      <img
        src="../assets/banner/1.0-char-left.webp"
        width={getWidth(331)}
        alt="left"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-166%, -50%)",
          zIndex: "100",
        }}
      />
      <img
        src="../assets/banner/seele.webp"
        width={getWidth(1145)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "seele-animation 2s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <img
        src="../assets/magnify.webp"
        width={getWidth(40)}
        alt="magnify"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-430%, 120%)",
          filter: "brightness(0.4)",
        }}
      />
      <img
        src="../assets/banner/seele-tag.webp"
        width={getWidth(130)}
        alt="seele tag"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-90%, 85%)",
        }}
      />
    </React.Fragment>
  );
};

export default ButterflyOnSwordtip;
