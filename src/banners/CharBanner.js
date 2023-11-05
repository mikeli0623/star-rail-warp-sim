import React, { useContext, useState } from "react";
import "../css/Banners.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "../components/context/ResizeContext";
import { useTranslation, Trans } from "react-i18next";
import NameTag from "../components/NameTag";
import Button from "../components/Button";
import RateModal from "../components/modals/RateModal";
import { json, colourMap } from "../util/Constants";
import Scrollbars from "react-custom-scrollbars-2";

export default function CharBanner({ bg = "40, 33, 36", vers, rerun = false }) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);

  const type = rerun ? "rerun-char" : "char";
  const actualVers = rerun ? json.getRerun(vers) : vers;

  const title = json.getTitle(actualVers, "char", i18n.resolvedLanguage);
  const rateFour = json.getRateUpFour(vers, "char");
  const charName = json.getRateUpFive(actualVers, "char")[0];
  const colourType = json.getColour(actualVers);

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      display: `none`,
    };
    return (
      <div className="bar" style={{ ...style, ...thumbStyle }} {...props} />
    );
  };

  console.log(`../assets/banner/${actualVers}/char-banner-back.webp`);

  return (
    <React.Fragment>
      <div
        style={{
          width: getWidth(8),
          height: getHeight(677.33, 1100),
          background: `linear-gradient(180deg, black 75%, rgba(255, 255, 255, 0) 100%)`,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-2720%, -50%)",
        }}
      />
      <div
        style={{
          width: getWidth(100),
          height: getHeight(50, 1100),
          background:
            "linear-gradient(180deg, black 75%, rgba(255, 255, 255, 0) 100%)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-310%, -678%)",
        }}
      />
      <div
        style={{
          width: getWidth(764),
          height: getHeight(677.33, 1100),
          overflow: "hidden",
          background: `linear-gradient(to bottom, rgba(${bg}, 1) 70%, rgba(255, 255, 255, 0) 100%)`,
          position: "absolute",
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
          src={`../assets/banner/${actualVers}/char-banner-back.webp`}
          onError={(e) => (e.target.style.display = "none")}
          width={getWidth(1200)}
          alt="right"
          draggable="false"
          style={{
            position: "relative",
            animation: `${charName}-back-animation 3s 200ms 1`,
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
            backgroundImage: `url(../assets/banner/rate-up/${rateFour[0]}.webp)`,
            width: getWidth(1000),
            height: getWidth(1000),
            backgroundSize: getWidth(1000),
            position: "absolute",
            animation: "char-rate-up-animation 1s 1",
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
            backgroundImage: `url(../assets/banner/rate-up/${rateFour[1]}.webp)`,
            width: getWidth(1000),
            height: getWidth(1000),
            backgroundSize: getWidth(1000),
            position: "absolute",
            animation: "char-rate-up-animation 1s 1",
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
            backgroundImage: `url(../assets/banner/rate-up/${rateFour[2]}.webp)`,
            width: getWidth(1000),
            height: getWidth(1000),
            backgroundSize: getWidth(1000),
            position: "absolute",
            animation: "char-rate-up-animation 1s 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationDelay: "350ms",
            animationFillMode: "both",
            opacity: "0",
          }}
        />
      </div>
      <LazyLoadImage
        effect="opacity-100"
        src={`../assets/banner/char-left.webp`}
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
      <div
        style={{
          width: getWidth(334),
          height: getHeight(28, 334),
          fontSize: getWidth(12),
          position: "absolute",
          color: "white",
          top: "50%",
          left: "50%",
          zIndex: 100,
          transform: "translate(-168%, -1170%)",
        }}
      >
        <div
          className="d-flex align-items-center "
          style={{
            height: "100%",
            width: "fit-content",
            borderRadius: "0 100px 100px 0",
            backgroundColor: colourMap[colourType],
            paddingLeft: getWidth(16),
            paddingRight: getWidth(20),
          }}
        >
          {t("modal.vers.event1")}
        </div>
      </div>
      <div
        style={{
          width: getWidth(8),
          height: getHeight(46, 8),
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 100,
          transform: "translate(-6726%, -615%)",
          backgroundColor: colourMap[colourType],
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-188%, -415%)",
          fontSize:
            title.length < 10
              ? getWidth(34)
              : title.length < 16
              ? getWidth(28)
              : getWidth(24),
          lineHeight: `${getWidth(33)}px`,
          zIndex: "100",
          fontWeight: "bold",
          textAlign: "left",
          width: getWidth(270),
          height: getHeight(66, 270),
        }}
      >
        {title}
      </div>
      <Scrollbars
        renderThumbVertical={renderThumb}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-195%, -125%)",
          fontSize: getWidth(18),
          lineHeight: `${getWidth(24)}px`,
          zIndex: "100",
          textAlign: "left",
          color: "#6b6b6b",
          width: getWidth(257.6),
          height: getHeight(155, 257.6),
          boxSizing: "border-box",
        }}
      >
        <div>
          <Trans i18nKey="banner.char.text1">
            Every <span style={{ color: "#d89747" }}>10</span> Warps guarantees
            a <span style={{ color: "#d89747" }}>4</span>-star or above entity
          </Trans>
        </div>
        <div style={{ marginTop: getWidth(18) }}>
          <Trans i18nKey="banner.char.text2">
            Featured character receives a drop-rate boost
          </Trans>
        </div>
      </Scrollbars>
      <LazyLoadImage
        src={`../assets/banner/${actualVers}/main-char.webp`}
        width={getWidth(1200)}
        alt={charName}
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          animation: `char-animation 3s 200ms 1`,
          animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          animationFillMode: "both",
        }}
      />
      <RateModal show={show} setShow={setShow} vers={vers} type={type} />
      <Button
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-420%, 60%)",
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
        name={charName}
        bottom={true}
        style={{ transform: "translate(-75%, 50%)" }}
        anim={false}
      />
    </React.Fragment>
  );
}
