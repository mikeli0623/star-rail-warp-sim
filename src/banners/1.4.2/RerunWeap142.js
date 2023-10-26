import React, { useContext, useState } from "react";
import "../../css/Banners.css";
import "../../css/vers/1.0.1.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "../../components/context/ResizeContext";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import RateModal from "../../components/modals/RateModal";

const RerunWeap142 = () => {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { i18n } = useTranslation();
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
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
            zIndex: "100",
            right: "0",
          }}
        />
        <LazyLoadImage
          effect="opacity"
          src="../assets/banner/1.0.1/main-weap.webp"
          width={getWidth(1200)}
          alt="right"
          draggable="false"
          style={{
            animation: "seele-weap-back-animation 3s 200ms 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
      </div>
      <LazyLoadImage
        className="weap-rate-up"
        src="../assets/banner/rate-up/resolution-shines-as-pearls-of-sweat.webp"
        alt="resolution-shines-as-pearls-of-sweat"
        draggable="false"
        width={getWidth(135)}
        style={{
          animation: "cone-1-animation 0.5s 1",
          animationTimingFunction: "linear",
          animationFillMode: "both",
          animationDelay: "300ms",
        }}
      />
      <LazyLoadImage
        className="weap-rate-up"
        src="../assets/banner/rate-up/only-silence-remains.webp"
        alt="only-silence-remains"
        draggable="false"
        width={getWidth(108)}
        style={{
          animationTimingFunction: "linear",
          animation: "cone-2-animation 0.5s 1",
          animationFillMode: "both",
          animationDelay: "350ms",
        }}
      />
      <LazyLoadImage
        className="weap-rate-up"
        src="../assets/banner/rate-up/the-moles-welcome-you.webp"
        alt="The Moles Welcome You"
        draggable="false"
        width={getWidth(108)}
        style={{
          animationTimingFunction: "linear",
          animation: "cone-3-animation 0.5s 1",
          animationFillMode: "both",
          animationDelay: "400ms",
        }}
      />
      <LazyLoadImage
        effect="opacity-100"
        src={`../assets/banner/1.4.2/${i18n.resolvedLanguage}/rerun-weap-left.webp`}
        width={getWidth(1101.5)}
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
        draggable="false"
        alt="rings"
        width={getWidth(550)}
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
      <RateModal show={show} setShow={setShow} vers="1.4.2" type="rerun-weap" />
      <Button
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-540%, 40%)",
          zIndex: 100,
        }}
        onClick={() => setShow(true)}
        rounded
        size="md"
        muted
        content={
          <LazyLoadImage
            effect="opacity"
            src="../assets/magnify.webp"
            width={getWidth(18)}
            alt="magnify"
            draggable="false"
          />
        }
        roundSize={getWidth(40)}
      />
    </React.Fragment>
  );
};

export default RerunWeap142;
