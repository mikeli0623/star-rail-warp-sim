import React, { useContext } from "react";
import "../css/Banners.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "../components/ResizeContext";

const StellarWarp = () => {
  const { getWidth, getHeight } = useContext(ResizeContext);
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
            zIndex: 100,
            right: 0,
          }}
        />
        <LazyLoadImage
          effect="opacity"
          src="../assets/banner/1.0/himeko-back.webp"
          width={getWidth(500)}
          alt="char"
          draggable="false"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            animation: "himeko-back-animation 2s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
        <LazyLoadImage
          effect="opacity"
          src="../assets/banner/1.0/bronya-back.webp"
          width={getWidth(900)}
          alt="char"
          draggable="false"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-51.1%, -58%)",
            animation: "bronya-back-animation 2s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
      </div>
      <LazyLoadImage
        effect="opacity-100"
        src="../assets/banner/1.0/standard-left.webp"
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
        src="../assets/banner/1.0/standard-rate-1.webp"
        alt="Night on the Milky Way"
        width={getWidth(135)}
        style={{
          position: "absolute",
          zIndex: "100",
          transform: "translate(-280%, 40%) rotate(5deg)",
          animation: "cone-1-animation 0.3s 1",
          animationTimingFunction: "linear",
          animationFillMode: "both",
          animationDelay: "100ms",
        }}
      />
      <img
        src="../assets/banner/1.0/standard-rate-2.webp"
        alt="But the Battle Isn't Over"
        width={getWidth(108)}
        style={{
          position: "absolute",
          zIndex: "100",
          animationTimingFunction: "linear",
          animation: "cone-2-animation 0.3s 1",
          animationFillMode: "both",
          animationDelay: "150ms",
        }}
      />
      <img
        src="../assets/banner/1.0/standard-rate-3.webp"
        alt="Something Irreplaceable"
        width={getWidth(108)}
        style={{
          position: "absolute",
          zIndex: "100",
          animationTimingFunction: "linear",
          animation: "cone-3-animation 0.3s 1",
          animationFillMode: "both",
          animationDelay: "200ms",
        }}
      />
      <img
        src="../assets/banner/1.0/weap-tag.webp"
        alt="weapon tag"
        width={getWidth(240)}
        style={{
          position: "absolute",
          zIndex: "100",
          transform: "translate(-155%, 200%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/himeko.webp"
        width={getWidth(500)}
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
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/gepard.webp"
        width={getWidth(800)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-66%, -63%)",
          animation: "gepard-animation 2s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/bronya.webp"
        width={getWidth(900)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-32%, -58%)",
          animation: "bronya-animation 2s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/bronya-tag.webp"
        width={getWidth(152)}
        alt="bronya tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "11",
          top: "50%",
          left: "50%",
          transform: "translate(136%, 20%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/gepard-tag.webp"
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
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/himeko-tag.webp"
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
