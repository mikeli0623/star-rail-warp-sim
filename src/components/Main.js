import React, { useState, useContext, useEffect } from "react";
import SoundContext from "./context/SoundContext";
import { json, allChars, allWeapons, LATESTVERS } from "../util/Constants";
import { CalcWarp } from "../util/CalcWarp";
import History from "../util/History";
import WarpButtons from "./WarpButtons";
import MiniBanners from "./MiniBanners";
import Settings from "./Settings";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "./context/ResizeContext";
import DepartureWarp from "../banners/DepartureWarp";
import StellarWarp from "../banners/StellarWarp";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import CharBanner from "../banners/CharBanner";
import WeapBanner from "../banners/WeapBanner";

export default function Main({
  bannerType,
  bannerState,
  setBannerState,
  showDB,
  setShowDB,
  setBannerType,
  setNewItems,
  setHasFive,
  setHasFour,
  setContent,
  setCurrentWarp,
  setDBType,
  showStart,
  history,
  setHistory,
  bgm,
}) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { sound, useSound } = useContext(SoundContext);

  const [playOpenDetails] = useSound("/assets/audio/sfx/details-open.mp3");
  const [playOpenStats] = useSound("/assets/audio/sfx/stats-open.mp3");

  const { t, i18n } = useTranslation();

  const [vers, setVers] = useState(
    sessionStorage.getItem("vers") || LATESTVERS
  );

  const [totalBeginner, setTotalBeginner] = useState(
    parseInt(localStorage.getItem("totalBeginner")) || 0
  );

  const localStore = (suffix, value) => {
    switch (bannerType) {
      case "beginner":
        localStorage.setItem("beg" + suffix, value);
        break;
      case "char":
        localStorage.setItem("char" + suffix, value);
        break;
      case "weap":
        localStorage.setItem("weap" + suffix, value);
        break;
      default:
        localStorage.setItem("stand" + suffix, value);
        break;
    }
  };

  // creates stash and updates it if there are new entities
  useEffect(() => {
    const allItems = allChars.concat(allWeapons);
    var stash = JSON.parse(localStorage.getItem("stash")) || {};

    allItems.forEach((item) => {
      if (stash[item] === undefined) stash[item] = 0;
    });
    localStorage.setItem("stash", JSON.stringify(stash));
  }, []);

  const updateStash = (warpItem) => {
    let stash = JSON.parse(localStorage.getItem("stash"));
    if (stash[warpItem] === 0) setNewItems((prev) => [...prev, warpItem]);
    stash[warpItem]++;
    localStorage.setItem("stash", JSON.stringify(stash));
  };

  const bannerBackColor = {
    "1.0.1": {
      char: "#0a162e",
      weap: "#0a162e",
      gradient: "40, 33, 36",
    },
    "1.0.2": {
      char: "#1f2930",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "1.1.1": {
      char: "#232a3c",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "1.1.2": {
      char: "black",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "1.2.1": {
      char: "black",
      weap: "black",
      gradient: "27, 33, 49",
    },
    "1.2.2": {
      char: "#241330",
      weap: "#241330",
      gradient: "40, 33, 36",
    },
    "1.3.1": {
      char: "#0f1222",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "1.3.2": {
      char: "#17072b",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "1.4.1": {
      char: "#1c253f",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "1.4.2": {
      char: "black",
      weap: "black",

      gradient: "43, 48, 64",
    },
    "1.5.1": {
      char: "#24283b",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "1.5.2": {
      char: "#43444a",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "1.6.1": {
      char: "black",
      weap: "black",

      gradient: "40, 33, 36",
    },
    "1.6.2": {
      char: "#1c253f",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "2.0.1": {
      char: "#242534",
      weap: "#20244c",
      gradient: "40, 33, 36",
    },
    "2.0.2": {
      char: "#1c253f",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "2.1.1": {
      char: "black",
      weap: "black",
      gradient: "40, 40, 60",
    },
    "2.3.1": {
      char: "#a5bdb0",
      weap: "black",
      gradient: "40, 33, 36",
    },
    "2.3.2": {
      char: "#2c2064",
      weap: "black",
      gradient: "40, 33, 36",
    },
  };

  const currentBanners = {
    beginner: <DepartureWarp total={totalBeginner} />,
    char: (
      <CharBanner
        vers={vers}
        bg={
          bannerBackColor[vers]
            ? bannerBackColor[vers]["gradient"]
            : "40, 33, 36"
        }
      />
    ),
    weap: <WeapBanner vers={vers} />,
    "rerun-char": <CharBanner vers={vers} rerun={true} />,
    "rerun-weap": <WeapBanner vers={vers} rerun={true} />,
    standard: <StellarWarp />,
  };

  const handleWarp = (warps) => {
    if (bannerType === "beginner") {
      setTotalBeginner(totalBeginner + 1);
      localStorage.setItem("totalBeginner", totalBeginner + 1);
      if (totalBeginner === 4) {
        setBannerType("char");
        sessionStorage.setItem("bannerType", "char");
      }
    }

    let type = bannerType.includes("rerun")
      ? bannerType.includes("char")
        ? "char"
        : "weap"
      : bannerType;

    const prevTotal = parseInt(localStorage.getItem(type + "Total")) || 0;
    localStorage.setItem(type + "Total", prevTotal + warps);

    setHasFive(false);
    setHasFour(false);
    let warpResults = [];
    let banner = bannerState[type];
    for (let i = 0; i < warps; i++)
      warpResults.push(
        CalcWarp(vers, bannerType, banner, setHasFive, setHasFour)
      );

    warpResults.map((item) => {
      updateStash(item);
      return item;
    });

    localStore("PityFive", bannerState[type].pityFive);
    localStore("PityFour", bannerState[type].pityFour);
    localStore("GuaranteeFive", bannerState[type].guaranteeFive);
    localStore("GuaranteeFour", bannerState[type].guaranteeFour);

    if (type === "standard") {
      localStore("TypeCount", bannerState[type].typeCount);
    }

    let historyClone = structuredClone(history);
    historyClone[type] = historyClone[type].concat(
      new History(warpResults).getHistory()
    );
    localStore("History", JSON.stringify(historyClone[type]));
    setHistory(historyClone);

    let bannerStateClone = bannerState;
    bannerStateClone[type] = banner;
    setBannerState(bannerStateClone);
    setCurrentWarp(warpResults);
    setContent("video");
  };

  const getBack = () => {
    if (bannerType === "beginner") return "beginner/beginner";
    if (bannerType === "standard") return "standard/standard";
    if (bannerType.includes("rerun"))
      return `${json.getRerun(vers)}/${
        bannerType.includes("char") ? "char" : "weap"
      }`;
    return `${vers}/${bannerType}`;
  };

  const [direction, setDirection] = useState(1);

  const setActiveBanner = (banner) => {
    const dirMap = {
      beginner: 0,
      char: 1,
      "rerun-char": 2,
      weap: 3,
      "rerun-weap": 4,
      standard: 5,
    };
    if (bannerType !== banner) {
      setDirection(dirMap[bannerType] - dirMap[banner]);
      setBannerType(banner);
      sessionStorage.setItem("bannerType", banner);
    }
  };

  const sliderVariants = {
    incoming: (direction) => ({
      y:
        bannerType === "beginner" ? "-50%" : direction > 0 ? "-2000%" : "2000%",
      x: "-50%",
      opacity: 0,
    }),
    active: { y: "-50%", scale: 1, opacity: 1, x: "-50%" },
    exit: (direction) => ({
      y:
        bannerType === "beginner" ? "-50%" : direction > 0 ? "2000%" : "-2000%",
      x: "-50%",
      opacity: 0,
    }),
  };

  const sliderTransition = {
    duration: 0.5,
    ease: [0.56, 0.5, 0.12, 1],
  };

  return (
    <motion.section
      key="main"
      exit={{ opacity: 0 }}
      id="main-back"
      style={{
        backgroundImage: `url(/assets/banner/${getBack()}-back.webp)`,
        backgroundColor: `${
          bannerType === "beginner"
            ? "#1f2322"
            : bannerBackColor[vers]
            ? bannerType === "rerun-char"
              ? bannerBackColor[json.getRerun(vers)]["char"]
              : bannerType === "rerun-weap"
              ? bannerBackColor[json.getRerun(vers)]["weap"]
              : bannerBackColor[vers][bannerType]
            : "black"
        }`,
      }}
    >
      <Settings
        vers={vers}
        showDB={showDB}
        setShowDB={setShowDB}
        setVers={setVers}
        setDBType={setDBType}
        setContent={setContent}
        showStart={showStart}
        bgm={bgm}
        bannerType={bannerType}
        setBannerType={setBannerType}
      />
      <div
        id="main-back-cover"
        style={{
          backgroundImage: "url(assets/banner/cover-pattern.webp)",
          backgroundSize: `${getWidth(10)}px ${getHeight(8, 10)}px`,
        }}
      />
      <LazyLoadImage
        effect="opacity"
        draggable="false"
        className="ring"
        src="/assets/rings.webp"
        alt="rings"
        width={getWidth(550)}
      />
      <div
        id="info"
        style={{
          width: getWidth(680, 200),
          height: getHeight(50, 680, 20, 200),
        }}
      >
        <div
          id="warp-icon"
          style={{
            backgroundImage: "url(/assets/icon-warp.webp)",
            width: getWidth(44, 22),
            height: getWidth(44, 22),
            backgroundSize: getWidth(44, 22),
          }}
        />
        <div
          style={{
            height: getHeight(50, 600),
            width: getWidth(600),
            display: "flex",
            flexDirection: "column",
            margin: 0,
            padding: 0,
          }}
        >
          <div
            id="title"
            style={{
              fontSize: getWidth(20, 9),
              height: getWidth(24, 11),
              textAlign: "left",
              marginTop: `-3px`,
            }}
          >
            {t("main.title")}
          </div>
          <div
            id="warp-type"
            style={{
              textAlign: "left",
              fontSize: getWidth(22, 11),
              height: getWidth(24, 11),
            }}
          >
            {json.getTitle(vers, bannerType, i18n.resolvedLanguage)}
          </div>
        </div>
      </div>
      <div
        className="position-absolute"
        style={{
          top: "0",
          left: "0",
          height: getHeight(500, 300, 200),
          width: getWidth(300),
          transform: "translateY(15%)",
          zIndex: 10000,
        }}
      >
        <MiniBanners
          bannerType={bannerType}
          setBannerType={setBannerType}
          hasBeginner={totalBeginner < 5}
          handleSelect={setActiveBanner}
        />
      </div>
      <div
        id="banner-container"
        rerun={json.checkRerun(vers).toString()}
        style={{
          width: getWidth(1200),
          height: getHeight(700, 1200),
        }}
      >
        <AnimatePresence custom={direction}>
          <motion.div
            className="banner"
            key={bannerType + vers}
            custom={direction}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
          >
            {currentBanners[bannerType]}
          </motion.div>
        </AnimatePresence>
        <Button
          style={{
            position: "absolute",
            bottom: "-1.5%",
            left: "3.5%",
            zIndex: "1000",
          }}
          onClick={() => {
            if (sound) playOpenStats();
            setContent("stats");
          }}
          content={t("button.stats")}
        />
        <Button
          style={{
            position: "absolute",
            bottom: "-1.5%",
            left: "25%",
            zIndex: "1000",
          }}
          onClick={() => {
            if (sound) playOpenDetails();
            setContent("details");
          }}
          content={t("button.view-details")}
        />
        <WarpButtons onWarp={handleWarp} event={bannerType} />
      </div>
    </motion.section>
  );
}
