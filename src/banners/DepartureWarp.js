import React, { useContext } from "react";
import "../css/Banners.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "../components/context/ResizeContext";
import { useTranslation, Trans } from "react-i18next";
import NameTag from "../components/NameTag";
import { Scrollbars } from "react-custom-scrollbars-2";

const DepartureWarp = ({ total }) => {
  const { getWidth } = useContext(ResizeContext);

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `#c4ceda`,
    };
    return (
      <div className="bar" style={{ ...style, ...thumbStyle }} {...props} />
    );
  };

  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/beginner/gepard.webp"
        width={getWidth(400)}
        alt="gepard"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "beginner-gepard-animation 1.7s 1",
          animationTimingFunction: "cubic-bezier(.27,.93,.64,.98)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/beginner/yanqing.webp"
        width={getWidth(740)}
        alt="yanqing"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "yanqing-animation 1.7s 1",
          animationTimingFunction: "cubic-bezier(.27,.93,.64,.98)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/beginner/bronya.webp"
        width={getWidth(1100)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "beginner-bronya-animation 1.9s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "forwards",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/beginner/clara.webp"
        width={getWidth(400)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "clara-animation 1.7s 1",
          animationTimingFunction: "cubic-bezier(.27,.93,.64,.98)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/beginner/himeko.webp"
        width={getWidth(1100)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "beginner-himeko-animation 1.9s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/beginner/bailu.webp"
        width={getWidth(460)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "bailu-animation 1.7s 1",
          animationTimingFunction: "cubic-bezier(.27,.93,.64,.98)",
          animationFillMode: "both",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src="../assets/banner/beginner/welt.webp"
        width={getWidth(700)}
        alt="char"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: "welt-animation 1.9s 1",
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <NameTag
        name="Welt"
        style={{
          transform: "translate(-30%, -30%)",
        }}
      />
      <NameTag
        name="Himeko"
        style={{
          transform: "translate(160%, -60%)",
        }}
      />
      <NameTag
        name="Bailu"
        style={{
          transform: "translate(390%, 80%)",
        }}
      />
      <NameTag
        name="Clara"
        style={{
          transform: "translate(300%, -160%)",
        }}
      />
      <NameTag
        name="Bronya"
        style={{
          transform: "translate(-240%, -110%)",
        }}
      />
      <NameTag
        name="Gepard"
        style={{
          transform: "translate(-90%, -350%)",
        }}
      />
      <NameTag
        name="Yanqing"
        style={{
          transform: "translate(-380%, -260%)",
        }}
      />
      <LazyLoadImage
        effect="opacity"
        src={`../assets/banner/beginner/${i18n.resolvedLanguage}/starter-tag.webp`}
        width={getWidth(300)}
        alt="starter tag"
        draggable="false"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-186%, 270%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-111%, 260%)",
          width: getWidth(500),
          textAlign: "left",
          color: "white",
          fontSize: getWidth(33),
          textShadow: "0 0 4px black",
        }}
      >
        {t("banner.beg.title")}
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(39%, 800%)",
          width: getWidth(450),
          color: "white",
          fontSize: getWidth(22),
          textShadow: "0 0 2px black",
        }}
      >
        {t("banner.beg.remaining")}: {50 - 10 * total}/50
      </div>
      <Scrollbars
        renderThumbVertical={renderThumb}
        className="beg-description"
        style={{
          position: "absolute",
          zIndex: "1",
          top: "50%",
          left: "50%",
          transform: "translate(-111%, 170%)",
          backgroundColor: "rgba(0,0,0,0.45)",
          width: getWidth(500),
          height: getWidth(110),
          color: "#d5dae0",
          fontSize: getWidth(22),
          textAlign: "left",
          boxSizing: "border-box",
        }}
      >
        <Trans i18nKey="banner.beg.text">
          20% off for set of 10 Warps, and a
          <span style={{ color: "#d89747" }}>5</span>-star character is
          guaranteed within <span style={{ color: "#d89747" }}>50</span>
          Warps.
        </Trans>
      </Scrollbars>
    </React.Fragment>
  );
};

export default DepartureWarp;
