import React, { useContext, useState, useRef, useEffect } from "react";
import "../css/Banners.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "../components/context/ResizeContext";
import { useTranslation, Trans } from "react-i18next";
import Button from "../components/Button";
import RateModal from "../components/modals/RateModal";
import { colourMap, json } from "../util/Constants";
import Scrollbars from "react-custom-scrollbars-2";
const trans = require("../assets/data/translations.json");

export default function WeapBanner({ vers, rerun = false }) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { t, i18n } = useTranslation();

  const [show, setShow] = useState(false);
  const type = rerun ? "rerun-weap" : "weap";
  const actualVers = rerun ? json.getRerun(vers) : vers;
  const title = json.getTitle(actualVers, "weap", i18n.resolvedLanguage);
  const rateFour = json.getRateUpFour(vers, "weap");
  const weapName = json.getRateUpFive(actualVers, "weap")[0];
  const path = formatString(json.getPath(weapName));
  const colourType = json.getColour(actualVers);

  function formatString(inputString) {
    return inputString.replace(/\s+/g, "-").toLowerCase();
  }

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      display: `none`,
    };
    return (
      <div className="bar" style={{ ...style, ...thumbStyle }} {...props} />
    );
  };

  const nameRef = useRef(null);

  const [pathY, setPathY] = useState(80);

  useEffect(() => {
    const height = Math.round(getHeight(87, 160));
    if (nameRef.current.offsetHeight === height) setPathY(130);
    else if (nameRef.current.offsetHeight === height / 3) setPathY(80);
    else setPathY(105);
  }, [nameRef.current?.offsetHeight, getHeight]);

  return (
    <React.Fragment>
      <div
        style={{
          width: getWidth(764),
          height: getHeight(677.33, 1100),
          background:
            "linear-gradient(to bottom, rgba(75, 75, 75, 0.8) 70%, rgba(255, 255, 255, 0) 100%)",
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
          src={`../assets/banner/${actualVers}/main-weap.webp`}
          width={getWidth(1000)}
          alt="right"
          draggable="false"
          style={{
            animation: "weap-back-animation 8s 100ms 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
      </div>
      <LazyLoadImage
        className="weap-rate-up"
        src={`../assets/banner/rate-up/${rateFour[0]}.webp`}
        alt={rateFour[0]}
        width={getWidth(135)}
        style={{
          animation: "cone-1-animation 0.4s 1",
          animationTimingFunction: "linear",
          animationFillMode: "both",
          animationDelay: "300ms",
        }}
        draggable="false"
      />
      <LazyLoadImage
        className="weap-rate-up"
        src={`../assets/banner/rate-up/${rateFour[1]}.webp`}
        alt={rateFour[1]}
        width={getWidth(108)}
        style={{
          animationTimingFunction: "linear",
          animation: "cone-2-animation 0.4s 1",
          animationFillMode: "both",
          animationDelay: "350ms",
        }}
        draggable="false"
      />
      <LazyLoadImage
        className="weap-rate-up"
        src={`../assets/banner/rate-up/${rateFour[2]}.webp`}
        alt={rateFour[2]}
        width={getWidth(108)}
        style={{
          animationTimingFunction: "linear",
          animation: "cone-3-animation 0.4s 1",
          animationFillMode: "both",
          animationDelay: "400ms",
        }}
        draggable="false"
      />
      <LazyLoadImage
        effect="opacity-100"
        src={`../assets/banner/weap-left.webp`}
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
          {t("modal.vers.event2")}
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
          transform: "translate(-6745%, -615%)",
          backgroundColor: colourMap[colourType],
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-153%, -420%)",
          fontSize: getWidth(32),
          lineHeight: `${getWidth(33)}px`,
          zIndex: 100,
          textAlign: "left",
          width: getWidth(331),
          height: getHeight(66, 331),
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
          <Trans i18nKey="banner.weap.text1">
            Every <span style={{ color: "#d89747" }}>10</span> Warps guarantees
            a <span style={{ color: "#d89747" }}>4</span>-star or above entity
          </Trans>
        </div>
        <div style={{ height: getWidth(16) }} />
        <div>
          <Trans i18nKey="banner.weap.text2">
            Featured Light Cone receives a drop-rate boost
          </Trans>
        </div>
      </Scrollbars>
      <LazyLoadImage
        effect="opacity"
        className="ring"
        src="/assets/rings.webp"
        alt="rings"
        width={getWidth(550)}
        style={{
          top: "50%",
          left: "50%",
          zIndex: 100,
          animation: "banner-ring-spin 60s infinite linear",
          transform: `translate(-24%, -50%) rotate(${Math.floor(
            Math.random() * 360
          )}deg)`,
        }}
        draggable="false"
      />
      <div
        className="d-flex align-items-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-68%, 190%)",
          zIndex: 100,
          backgroundColor: "black",
          opacity: 0.75,
          width: getWidth(240),
          height: getHeight(28, 240),
          paddingLeft: getWidth(8),
        }}
      >
        {Array(5)
          .fill()
          .map((_, i) => {
            return (
              <img
                src="./assets/star.webp"
                key={i}
                alt="star"
                width={getWidth(16)}
                height={getWidth(18)}
              />
            );
          })}
      </div>
      <LazyLoadImage
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          rotate: "7deg",
          transform: "translate(2%, -49%)",
          fontSize: getWidth(18),
          lineHeight: `${getWidth(24)}px`,
          zIndex: "100",
          textAlign: "left",
          color: "#6b6b6b",
          boxSizing: "border-box",
        }}
        src={`../assets/glass-back.webp`}
        alt={"Front Glass"}
        width={getWidth(266)}
        height={getHeight(362, 266)}
        draggable="false"
      />
      <LazyLoadImage
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          rotate: "7deg",
          transform: "translate(-2%, -54.5%)",
          fontSize: getWidth(18),
          lineHeight: `${getWidth(24)}px`,
          zIndex: "100",
          textAlign: "left",
          color: "#6b6b6b",
          boxSizing: "border-box",
        }}
        src={`../assets/splash/${weapName}.webp`}
        alt={weapName}
        width={getWidth(262)}
        height={getHeight(364, 262)}
        draggable="false"
      />
      <LazyLoadImage
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          rotate: "7deg",
          transform: "translate(-10%, -58%)",
          fontSize: getWidth(18),
          lineHeight: `${getWidth(24)}px`,
          zIndex: "100",
          textAlign: "left",
          color: "#6b6b6b",
          boxSizing: "border-box",
        }}
        src={`../assets/glass-front.webp`}
        alt={"Back Glass"}
        width={getWidth(266)}
        height={getHeight(372, 266)}
        draggable="false"
      />
      <div
        className="d-flex flex-column-reverse"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-100.5%, -45%)`,
          zIndex: 100,
          fontSize: getWidth(22),
          width: getWidth(164),
          height: getHeight(87, 160),
          textAlign: "left",
          lineHeight: `${getWidth(29)}px`,
          verticalAlign: "bottom",
        }}
      >
        <p ref={nameRef} style={{ margin: 0 }}>
          {trans[weapName][i18n.resolvedLanguage]}
        </p>
      </div>
      <LazyLoadImage
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-152%, -${pathY}%)`,
          zIndex: 100,
        }}
        width={getWidth(110)}
        src={`../assets/path-${path}-banner.webp`}
        alt={path}
        draggable="false"
      />
      <RateModal show={show} setShow={setShow} vers={vers} type={type} />
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
}
