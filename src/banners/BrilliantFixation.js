import React from "react";
import "../css/Banners.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BrilliantFixation = ({ resize }) => {
  return (
    <React.Fragment>
      <div
        style={{
          width: resize.getWidth(764),
          height: resize.getHeight(677.33, 1100),
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
            height: resize.getHeight(200, 148),
            width: resize.getWidth(148),
            backgroundSize: `${resize.getWidth(148)}px ${resize.getHeight(
              200,
              148
            )}px`,
            position: "absolute",
            zIndex: "100",
            right: "0",
          }}
        />
        <LazyLoadImage
          effect="opacity"
          src="../assets/banner/1.0/weap-banner-back.webp"
          width={resize.getWidth(1200)}
          alt="right"
          draggable="false"
          style={{
            animation: "seele-weap-back-animation 2s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
      </div>
      <img
        src="../assets/banner/1.0/weap-rate-1.webp"
        alt="The Moles Welcome You"
        width={resize.getWidth(135)}
        style={{
          position: "absolute",
          zIndex: 101,
          transform: "translate(-280%, 40%) rotate(5deg)",
          animation: "cone-1-animation 0.3s 1",
          animationTimingFunction: "linear",
          animationFillMode: "both",
          animationDelay: "100ms",
        }}
      />
      <img
        src="../assets/banner/1.0/weap-rate-2.webp"
        alt="Post-Op Conversation"
        width={resize.getWidth(108)}
        style={{
          position: "absolute",
          zIndex: 101,
          animationTimingFunction: "linear",
          animation: "cone-2-animation 0.3s 1",
          animationFillMode: "both",
          animationDelay: "150ms",
        }}
      />
      <img
        src="../assets/banner/1.0/weap-rate-3.webp"
        alt="Good Night and Sleep Well"
        width={resize.getWidth(108)}
        style={{
          position: "absolute",
          zIndex: 101,
          animationTimingFunction: "linear",
          animation: "cone-3-animation 0.3s 1",
          animationFillMode: "both",
          animationDelay: "200ms",
        }}
      />
      <LazyLoadImage
        effect="opacity-100"
        src="../assets/banner/1.0/weap-left.webp"
        width={resize.getWidth(1101.5)}
        alt="left"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "100",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        className="ring"
        src="/assets/rings.webp"
        alt="rings"
        width={resize.getWidth(550)}
        style={{
          filter: "brightness(1.4)",
          top: "50%",
          left: "50%",
          animation: "banner-ring-spin 60s infinite linear",
          transform: `translate(-24%, -50%) rotate(${Math.floor(
            Math.random() * 360
          )}deg)`,
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/magnify.webp"
        width={resize.getWidth(40)}
        alt="magnify"
        draggable="false"
        style={{
          zIndex: 100,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-540%, 40%)",
          filter: "brightness(0.4)",
        }}
      />
    </React.Fragment>
  );
};

export default BrilliantFixation;
