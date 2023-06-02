import React, { useContext } from "react";
import "../css/Banners.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "../components/context/ResizeContext";
import { useTranslation } from "react-i18next";
import NameTag from "../components/NameTag";

const StellarWarp = () => {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { i18n } = useTranslation();
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
          src="../assets/banner/standard/himeko-back.webp"
          width={getWidth(500)}
          alt="char"
          draggable="false"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            animation: "himeko-back-animation 3s 200ms 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
        <LazyLoadImage
          effect="opacity"
          src="../assets/banner/standard/bronya-back.webp"
          width={getWidth(900)}
          alt="char"
          draggable="false"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-51.1%, -58%)",
            animation: "bronya-back-animation 3s 200ms 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
      </div>
      <LazyLoadImage
        effect="opacity-100"
        src={`../assets/banner/standard/${i18n.resolvedLanguage}/standard-left.webp`}
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
      <LazyLoadImage
        className="weap-rate-up"
        src="../assets/banner/standard/standard-rate-1.webp"
        draggable="false"
        alt="Night on the Milky Way"
        width={getWidth(135)}
        style={{
          transform: "translate(-280%, 40%) rotate(5deg)",
          animation: "cone-1-animation 0.4s 1",
          animationTimingFunction: "linear",
          animationFillMode: "both",
          animationDelay: "300ms",
        }}
      />
      <LazyLoadImage
        className="weap-rate-up"
        src="../assets/banner/standard/standard-rate-2.webp"
        draggable="false"
        alt="But the Battle Isn't Over"
        width={getWidth(108)}
        style={{
          animationTimingFunction: "linear",
          animation: "cone-2-animation 0.4s 1",
          animationFillMode: "both",
          animationDelay: "350ms",
        }}
      />
      <LazyLoadImage
        className="weap-rate-up"
        src="../assets/banner/standard/standard-rate-3.webp"
        draggable="false"
        alt="Something Irreplaceable"
        width={getWidth(108)}
        style={{
          animationTimingFunction: "linear",
          animation: "cone-3-animation 0.4s 1",
          animationFillMode: "both",
          animationDelay: "400ms",
        }}
      />
      <LazyLoadImage
        className="weap-rate-up"
        src={`../assets/banner/standard/${i18n.resolvedLanguage}/weap-tag.webp`}
        draggable="false"
        alt="weapon tag"
        width={getWidth(240)}
        style={{
          transform: "translate(-205%, 150%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/standard/himeko.webp"
        width={getWidth(500)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "himeko-animation 3s 200ms 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/standard/gepard.webp"
        width={getWidth(800)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-66%, -63%)",
          animation: "gepard-animation 3s 200ms 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/standard/bronya.webp"
        width={getWidth(900)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-32%, -58%)",
          animation: "bronya-animation 3s 200ms 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <NameTag
        name="Bronya"
        style={{
          transform: "translate(135%, 20%)",
        }}
        bottom={true}
        anim={false}
      />
      <NameTag
        name="Gepard"
        style={{
          transform: "translate(-110%, -165%)",
        }}
        bottom={true}
        anim={false}
      />
      <NameTag
        name="Himeko"
        style={{
          transform: "translate(215%, -100%)",
        }}
        bottom={true}
        anim={false}
      />
    </React.Fragment>
  );
};

export default StellarWarp;
