import React from "react";
import "../css/Banners.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const DepartureWarp = ({ total, resize }) => {
  return (
    <React.Fragment>
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/beg-gepard.webp"
        width={resize.getWidth(400)}
        alt="gepard"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "beginner-gepard-animation 1.2s 1",
          animationTimingFunction: "cubic-bezier(.27,.93,.64,.98)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/yanqing.webp"
        width={resize.getWidth(740)}
        alt="yanqing"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "yanqing-animation 1.2s 1",
          animationTimingFunction: "cubic-bezier(.27,.93,.64,.98)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/beg-bronya.webp"
        width={resize.getWidth(1100)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "beginner-bronya-animation 1.4s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "forwards",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/clara.webp"
        width={resize.getWidth(400)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "clara-animation 1.2s 1",
          animationTimingFunction: "cubic-bezier(.27,.93,.64,.98)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/beg-himeko.webp"
        width={resize.getWidth(1100)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "beginner-himeko-animation 1.4s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/bailu.webp"
        width={resize.getWidth(460)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "bailu-animation 1.2s 1",
          animationTimingFunction: "cubic-bezier(.27,.93,.64,.98)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/welt.webp"
        width={resize.getWidth(700)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "welt-animation 1.4s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/welt-tag.webp"
        width={resize.getWidth(130)}
        alt="welt tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/beg-bronya-tag.webp"
        width={resize.getWidth(160)}
        alt="bronya tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-250%, -110%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/yanqing-tag.webp"
        width={resize.getWidth(165)}
        alt="yanqing tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-370%, -310%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/beg-gepard-tag.webp"
        width={resize.getWidth(160)}
        alt="gepard tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-100%, -430%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/beg-himeko-tag.webp"
        width={resize.getWidth(160)}
        alt="himeko tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(120%, -100%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/clara-tag.webp"
        width={resize.getWidth(130)}
        alt="clara tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(360%, -200%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/bailu-tag.webp"
        width={resize.getWidth(130)}
        alt="bailu tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(500%, 80%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0/starter-tag.webp"
        width={resize.getWidth(160)}
        alt="starter tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-350%, 300%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-210%, 280%)",
          color: "white",
          fontSize: resize.getWidth(36),
          textShadow: "0 0 4px black",
        }}
      >
        Departure Warp
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(135%, 890%)",
          color: "white",
          fontSize: resize.getWidth(24),
          textShadow: "0 0 2px black",
        }}
      >
        Remaining Warps: {50 - 10 * total}/50
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-111%, 170%)",
          backgroundColor: "rgba(0,0,0,0.45)",
          width: resize.getWidth(500),
          height: resize.getWidth(110),
          color: "#d5dae0",
          fontSize: resize.getWidth(24),
          textAlign: "left",
          boxSizing: "border-box",
          paddingLeft: resize.getWidth(12),
          paddingTop: resize.getWidth(12),
        }}
      >
        20% off for set of 10 Warps, and a{" "}
        <span style={{ color: "#d89747" }}>5</span>
        -star characters is guaranteed within
        <span style={{ color: "#d89747" }}> 50 </span> Warps.
      </div>
    </React.Fragment>
  );
};

export default DepartureWarp;
