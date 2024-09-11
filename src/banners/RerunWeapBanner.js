import React, { useContext, useState, useRef } from "react";
import "../css/Banners.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "../components/context/ResizeContext";
import { useTranslation, Trans } from "react-i18next";
import Button from "../components/Button";
import RateModal from "../components/modals/RateModal";
import { json } from "../util/Constants";
import MiniMiniBanners from "../components/MiniMiniBanners";
import { AnimatePresence, motion } from "framer-motion";
const trans = require("../assets/data/translations.json");

export default function RerunWeapBanner({ vers, rerun, setRerun }) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { t, i18n } = useTranslation();

  const [rerunVersion, setRerunVersion] = useState(rerun);

  const versions = json.getReruns(vers);

  const [show, setShow] = useState(false);
  const title = json.getTitle(vers, "reruns-weap", i18n.resolvedLanguage);
  const rateFour = json.getRateUpFour(vers, "weap");
  const weapName = json.getRateUpFive(versions[rerunVersion], "weap")[0];
  const path = formatString(json.getPath(weapName));

  function formatString(inputString) {
    return inputString.replace(/\s+/g, "-").toLowerCase();
  }

  const handleSelectRerun = (rerun) => {
    setRerunVersion(rerun);
    setRerun(rerun);
  };

  const variants = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
    },
  };

  const nameRef = useRef(null);

  return (
    <React.Fragment>
      <div
        style={{
          width: getWidth(764),
          height: getHeight(610.68, 1100),
          overflow: "hidden",
          background: `rgba(153, 153, 153, 0.12)`,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(2px)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-34.5%, -57.5%)",
          borderTopLeftRadius: getWidth(30),
        }}
      >
        <img
          effect="opacity"
          src={`../assets/banner/reruns-weap-left.webp`}
          height="100%"
          width="74%"
          style={{ position: "absolute", left: 0, zIndex: 2 }}
          alt="background"
          draggable="false"
        />
        <LazyLoadImage
          effect="opacity"
          src={`../assets/banner/${versions[rerunVersion]}/main-weap.webp`}
          key={`../assets/banner/${versions[rerunVersion]}/main-weap.webp`}
          width={getWidth(1000)}
          alt="right"
          draggable="false"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 1,
            transform: "translate(-31%, -38%)",
            animation: "reruns-weap-back-animation 3s 100ms 1",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
            animationFillMode: "both",
          }}
        />
      </div>
      <LazyLoadImage
        effect="opacity-100"
        src={`../assets/banner/reruns-left.webp`}
        width={getWidth(280)}
        alt="left"
        draggable="false"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-195%, -58%)",
          zIndex: "100",
        }}
      />
      <div
        style={{
          width: getWidth(280),
          height: getHeight(28, 334),
          fontSize: getWidth(14),
          position: "absolute",
          color: "black",
          top: "50%",
          left: "50%",
          zIndex: 100,
          transform: "translate(-195%, -1200%)",
          textAlign: "left",
          lineHeight: getWidth(1),
        }}
      >
        <div
          className="d-flex align-items-center "
          style={{
            height: "100%",
            width: "fit-content",
            borderRadius: "0 100px 100px 0",
            backgroundColor: "#bca47a",
            paddingLeft: getWidth(16),
            paddingRight: getWidth(20),
          }}
        >
          {t("modal.vers.event2")}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-230%, -415%)",
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
          width: getWidth(220),
          height: getHeight(66, 220),
          color: "white",
        }}
      >
        {title}
      </div>

      <div
        className="d-flex flex-column"
        style={{
          position: "absolute",
          gap: getWidth(6),
          top: "50%",
          left: "50%",
          transform: "translate(-160%, -120%)",
          zIndex: 100,
        }}
      >
        <div
          className="d-flex flex-column-reverse"
          style={{
            fontSize: getWidth(22),
            width: getWidth(140),
            height: getHeight(87, 140),
            textAlign: "left",
            lineHeight: `${getWidth(29)}px`,
            verticalAlign: "bottom",
          }}
        >
          <p ref={nameRef} style={{ margin: 0 }}>
            {trans[weapName][i18n.resolvedLanguage]}
          </p>
        </div>
        <div
          className="d-flex align-items-center"
          style={{
            backgroundColor: "black",
            opacity: 0.75,
            width: "fit-content",
            height: "fit-content",
            padding: `${getWidth(4)}px ${getWidth(8)}px`,
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
          width={getWidth(140)}
          src={`../assets/path-${path}-banner.webp`}
          alt={path}
          draggable="false"
        />
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 50,
            duration: 0.4,
          }}
          key={weapName}
          style={{ position: "absolute", top: "50%", left: "50%" }}
        >
          <img
            className="ring"
            src="/assets/rings.webp"
            alt="rings"
            width={getWidth(420)}
            style={{
              zIndex: 1,
              animation: "mini-banner-ring-spin 60s infinite linear",
              transform: `translate(-15%, -60%) rotate(${Math.floor(
                Math.random() * 360
              )}deg)`,
            }}
            draggable="false"
          />
          <img
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "tween",
              duration: 0.2,
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              rotate: "7deg",
              transform: "translate(7%, -56%)",
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
          <img
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "tween",
              duration: 0.2,
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              rotate: "7deg",
              transform: "translate(3%, -61.5%)",
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
          <img
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "tween",
              duration: 0.2,
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              rotate: "7deg",
              transform: "translate(-5%, -65%)",
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
        </motion.div>
        {/* <motion.img
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "tween",
            duration: 0.2,
          }}
          src={`../assets/banner/${versions[rerunVersion]}/main-char.webp`}
          key={`../assets/banner/${versions[rerunVersion]}/main-char.webp`}
          width={getWidth(1200)}
          alt={charName}
          draggable="false"
          effect="opacity"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animationName: "char-animation",
            animationDuration: "3s",
            animationDelay: "100ms",
            animationIterationCount: 1,
            animationFillMode: "both",
            animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
          }}
        /> */}
      </AnimatePresence>
      <MiniMiniBanners
        handleSelect={handleSelectRerun}
        rerunVersion={rerunVersion}
        pool={json.getRateUpFive(vers, "reruns-weap")}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-233%, 200%)",
          fontSize: getWidth(16),
          lineHeight: `${getWidth(24)}px`,
          zIndex: "100",
          textAlign: "left",
          width: getWidth(220),
          height: getHeight(80, 220),
          boxSizing: "border-box",
        }}
      >
        <p style={{ color: "#968464" }}>
          <Trans i18nKey="banner.reruns.text1">
            Click tabs to switch between different Warp banners
          </Trans>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: getWidth(10),
          position: "absolute",
          zIndex: "101",
          left: "50%",
          top: "50%",
          transform: "translate(-95%, 10%)",
        }}
      >
        <div>
          <LazyLoadImage
            effect="opacity"
            className="mini-weap-rate-up"
            src={`../assets/banner/rate-up/${rateFour[0]}.webp`}
            alt={rateFour[0]}
            width={getWidth(95)}
            style={{
              animation: "mini-cone-1-animation 0.4s 1",
              animationTimingFunction: "linear",
              animationFillMode: "both",
              animationDelay: "300ms",
            }}
            draggable="false"
          />
          <LazyLoadImage
            effect="opacity"
            className="mini-weap-rate-up"
            src={`../assets/banner/rate-up/${rateFour[1]}.webp`}
            alt={rateFour[1]}
            width={getWidth(80)}
            style={{
              animationTimingFunction: "linear",
              animation: "mini-cone-2-animation 0.4s 1",
              animationFillMode: "both",
              animationDelay: "350ms",
            }}
            draggable="false"
          />
          <LazyLoadImage
            effect="opacity"
            className="mini-weap-rate-up"
            src={`../assets/banner/rate-up/${rateFour[2]}.webp`}
            alt={rateFour[2]}
            width={getWidth(80)}
            style={{
              animationTimingFunction: "linear",
              animation: "mini-cone-3-animation 0.4s 1",
              animationFillMode: "both",
              animationDelay: "400ms",
            }}
            draggable="false"
          />
        </div>
        <p
          style={{
            color: "#fcfafa",
            fontSize: getWidth(18),
            zIndex: "100",
            textAlign: "left",
            width: getWidth(257.6),
            backgroundColor: "rgba(64,64,64,0.6)",
            padding: `0 ${getWidth(4)}px`,
          }}
        >
          <Trans i18nKey="banner.reruns.text2">
            Every <span style={{ color: "#d89747" }}>10</span> Warps guarantees
            a <span style={{ color: "#d89747" }}>4</span>-star or above entity
          </Trans>
        </p>
      </div>
      <RateModal
        show={show}
        setShow={setShow}
        vers={vers}
        type={"reruns-weap"}
        rerunVersion={rerunVersion}
      />
      <Button
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-150%, -700%)",
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
