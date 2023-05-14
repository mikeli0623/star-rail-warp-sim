import React from "react";
import "../css/Banners.css";
import "../css/vers/1.1.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SwirlOfHeavenlySpear = ({ resize }) => {
  return (
    <React.Fragment>
      <div
        style={{
          width: resize.getWidth(8),
          height: resize.getHeight(677.33, 1100),
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
          width: resize.getWidth(764),
          height: resize.getHeight(677.33, 1100),
          background:
            "linear-gradient(to bottom, rgba(16, 20, 56, 1) 70%, rgba(255, 255, 255, 0) 100%)",
          position: "absolute",
          // overflow: "hidden",
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
            zIndex: "1",
            right: "0",
          }}
        />
        <LazyLoadImage
          effect="opacity"
          src="../assets/banner/1.1/char-banner-back.webp"
          width={resize.getWidth(1500)}
          alt="right"
          draggable="false"
          style={{
            position: "relative",
            animation: "jing-yuan-back-animation 2s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
      </div>
      <div
        className="rate-up-char-icons"
        style={{
          width: resize.getWidth(72.3),
          height: resize.getHeight(206.1, 72.3),
          transform: "translate(-634%, 50%)",
          animation: "appear 50ms 1",
          opacity: "0",
          animationFillMode: "both",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/banner/1.1/sushang.webp)",
            width: resize.getWidth(1100),
            height: resize.getWidth(1100),
            backgroundSize: resize.getWidth(1100),
            position: "absolute",
            animation: "sushang-animation 1s 1",
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
          width: resize.getWidth(72.3),
          height: resize.getHeight(206.1, 72.3),
          transform: "translate(-510%, 50%)",
          animation: "appear 50ms 1",
          animationDelay: "75ms",
          opacity: "0",
          animationFillMode: "both",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/banner/1.1/march-7th.webp)",
            width: resize.getWidth(1100),
            height: resize.getWidth(1100),
            backgroundSize: resize.getWidth(1100),
            position: "absolute",
            animation: "march-animation 1s 1",
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
          width: resize.getWidth(72.3),
          height: resize.getHeight(206.1, 72.3),
          transform: "translate(-386%, 50%)",
          animation: "appear 50ms 1",
          animationDelay: "150ms",
          opacity: "0",
          animationFillMode: "both",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/banner/1.1/tingyun.webp)",
            width: resize.getWidth(1100),
            height: resize.getWidth(1100),
            backgroundSize: resize.getWidth(1100),
            position: "absolute",
            animation: "tingyun-animation 1s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationDelay: "150ms",
            animationFillMode: "both",
            opacity: "0",
          }}
        />
      </div>
      <LazyLoadImage
        effect="opacity-100"
        src="../assets/banner/1.0/char-left.webp"
        width={resize.getWidth(331)}
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
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.1/jing-yuan.webp"
        width={resize.getWidth(1145)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "jing-yuan-animation 2s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/magnify.webp"
        width={resize.getWidth(40)}
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
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.1/jing-yuan-tag.webp"
        width={resize.getWidth(150)}
        alt="seele tag"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-80%, 100%)",
        }}
      />
    </React.Fragment>
  );
};

export default SwirlOfHeavenlySpear;
