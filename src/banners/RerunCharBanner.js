import React, { useContext, useState } from "react";
import "../css/Banners.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "../components/context/ResizeContext";
import { useTranslation, Trans } from "react-i18next";
import NameTag from "../components/NameTag";
import Button from "../components/Button";
import RateModal from "../components/modals/RateModal";
import { json } from "../util/Constants";
import { AnimatePresence, motion } from "framer-motion";
import MiniMiniBanners from "../components/MiniMiniBanners";

export default function RerunCharBanner({ vers, rerun, setRerun }) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);

  const [rerunVersion, setRerunVersion] = useState(rerun);

  const versions = json.getReruns(vers);

  const title = json.getTitle(vers, "reruns-char", i18n.resolvedLanguage);
  const rateFour = json.getRateUpFour(vers, "char");
  const charName = json.getRateUpFive(versions[rerunVersion], "char")[0];

  const handleSelectRerun = (rerun) => {
    setRerunVersion(rerun);
    setRerun(rerun);
  };

  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

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
        <LazyLoadImage
          src={`../assets/banner/${versions[rerunVersion]}/char-banner-back.webp`}
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
        style={{
          display: "flex",
          flexDirection: "column",
          gap: getWidth(10),
          position: "absolute",
          zIndex: "101",
          left: "50%",
          top: "50%",
          transform: "translate(-95%, 55%)",
        }}
      >
        <div style={{ display: "flex", gap: getWidth(12) }}>
          <div
            className="mini-rate-up-char-icons"
            style={{
              width: getWidth(60),
              height: getHeight(60, 60),
              animation: "appear 50ms 400ms 1",
              opacity: "0",
              animationFillMode: "both",
            }}
          >
            <div
              style={{
                backgroundImage: `url(../assets/banner/rate-up/${rateFour[0]}-mini.webp)`,
                width: getWidth(400),
                height: getWidth(400),
                backgroundSize: getWidth(400),
                animation: "char-rate-up-animation 1s 1",
                animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
                animationDelay: "400ms",
                opacity: "0",
                animationFillMode: "both",
              }}
            />
          </div>
          <div
            className="mini-rate-up-char-icons"
            style={{
              width: getWidth(60),
              height: getHeight(60, 60),
              animation: "appear 50ms 1",
              animationDelay: "475ms",
              opacity: "0",
              animationFillMode: "both",
            }}
          >
            <div
              style={{
                backgroundImage: `url(../assets/banner/rate-up/${rateFour[1]}-mini.webp)`,
                width: getWidth(400),
                height: getWidth(400),
                backgroundSize: getWidth(400),
                animation: "char-rate-up-animation 1s 1",
                animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
                animationDelay: "475ms",
                opacity: "0",
                animationFillMode: "both",
              }}
            />
          </div>
          <div
            className="mini-rate-up-char-icons"
            style={{
              width: getWidth(60),
              height: getHeight(60, 60),
              animation: "appear 50ms 1",
              animationDelay: "550ms",
              opacity: "0",
              animationFillMode: "both",
            }}
          >
            <div
              style={{
                backgroundImage: `url(../assets/banner/rate-up/${rateFour[2]}-mini.webp)`,
                width: getWidth(400),
                height: getWidth(400),
                backgroundSize: getWidth(400),
                animation: "char-rate-up-animation 1s 1",
                animationTimingFunction: "cubic-bezier(.27,.42,.2,.97)",
                animationDelay: "550ms",
                animationFillMode: "both",
                opacity: "0",
              }}
            />
          </div>
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
            marginBottom: 0,
          }}
        >
          <Trans i18nKey="banner.reruns.text2">
            Every <span style={{ color: "#d89747" }}>10</span> Warps guarantees
            a <span style={{ color: "#d89747" }}>4</span>-star or above entity
          </Trans>
        </p>
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
          {t("modal.vers.event1")}
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
      <AnimatePresence initial={false}>
        <motion.img
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
        />
      </AnimatePresence>
      <MiniMiniBanners
        handleSelect={handleSelectRerun}
        rerunVersion={rerunVersion}
        pool={json.getRateUpFive(vers, "reruns-char")}
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
      <RateModal
        show={show}
        setShow={setShow}
        vers={vers}
        type={"reruns-char"}
        rerunVersion={rerunVersion}
      />
      <Button
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(510%, -260%)",
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
        style={{ transform: "translate(160%, -150%)" }}
        anim={false}
      />
    </React.Fragment>
  );
}
