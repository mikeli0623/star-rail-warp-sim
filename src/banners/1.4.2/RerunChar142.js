import React, { useContext, useState } from "react";
import "../../css/Banners.css";
import "../../css/vers/1.0.1.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "../../components/context/ResizeContext";
import NameTag from "../../components/NameTag";
import Button from "../../components/Button";
import RateModal from "../../components/modals/RateModal";

const RerunChar142 = () => {
  const { getWidth, getHeight } = useContext(ResizeContext);

  const [show, setShow] = useState(false);
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
            zIndex: "1",
            right: "0",
          }}
        />
        <LazyLoadImage
          effect="opacity"
          src="../assets/banner/1.0.1/char-banner-back.webp"
          height="100%"
          alt="right"
          draggable="false"
          style={{
            position: "relative",
            transform: "translateX(-3.8%)",
            animation: "seele-back-animation 3s 200ms 1",
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
          transform: "translate(-680%, 90%)",
          animation: "appear 50ms 200ms 1",
          opacity: "0",
          animationFillMode: "both",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/banner/rate-up/guinaifen.webp)",
            width: getWidth(900),
            height: getWidth(900),
            backgroundSize: getWidth(900),
            position: "absolute",
            animation: "guinaifen-animation 1s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationDelay: "250ms",
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
          transform: "translate(-560%, 90%)",
          animation: "appear 50ms 1",
          animationDelay: "275ms",
          opacity: "0",
          animationFillMode: "both",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/banner/rate-up/luka.webp)",
            width: getWidth(1000),
            height: getWidth(1000),
            backgroundSize: getWidth(1000),
            position: "absolute",
            animation: "luka-animation 1s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationDelay: "250ms",
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
          transform: "translate(-440%, 90%)",
          animation: "appear 50ms 1",
          animationDelay: "350ms",
          opacity: "0",
          animationFillMode: "both",
        }}
      >
        <div
          style={{
            backgroundImage: "url(../assets/banner/rate-up/sushang.webp)",
            width: getWidth(1100),
            height: getWidth(1100),
            backgroundSize: getWidth(1100),
            position: "absolute",
            animation: "sushang-animation 1s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationDelay: "350ms",
            animationFillMode: "both",
            opacity: "0",
          }}
        />
      </div>
      <LazyLoadImage
        effect="opacity-100"
        src="../assets/banner/1.0.1/char-left.webp"
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
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/1.0.1/seele.webp"
        width={getWidth(1145)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "seele-animation 3s 200ms 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <RateModal show={show} setShow={setShow} vers="1.0.1" type="char" />
      <Button
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-420%, 110%)",
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
      <NameTag
        name="Seele"
        bottom={true}
        style={{ transform: "translate(-75%, 70%)" }}
        anim={false}
      />
    </React.Fragment>
  );
};

export default RerunChar142;
