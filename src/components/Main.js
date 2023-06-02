import React, { useState, useContext, useMemo, useEffect } from "react";
import { json, allChars, allWeapons } from "../util/Constants";
import { CalcWarp } from "../util/CalcWarp";
import History from "../util/History";
import WarpButtons from "./WarpButtons";
import MiniBanners from "./MiniBanners";
import Settings from "./Settings";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "./context/ResizeContext";
import DepartureWarp from "../banners/DepartureWarp";
import ButterflyOnSwordtip from "../banners/1.0.0/ButterflyOnSwordtip";
import BrilliantFixationS from "../banners/1.0.0/BrilliantFixationS";
import BrilliantFixationJY from "../banners/1.0.1/BrilliantFixationJY";
import SwirlOfHeavenlySpear from "../banners/1.0.1/SwirlOfHeavenlySpear";
import BrilliantFixationSW from "../banners/1.1.0/BrilliantFixationSW";
import GamerMoment from "../banners/1.1.0/GamerMoment";
import BrilliantFixationL from "../banners/1.1.1/BrilliantFixationL";
import HealerGuy from "../banners/1.1.1/HealerGuy";
import StellarWarp from "../banners/StellarWarp";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

export default function Main({
  lockout,
  bannerType,
  showDB,
  setShowDB,
  setBannerType,
  setNewItems,
  setHasFive,
  setHasFour,
  setContent,
  setCurrentWarp,
  setDBType,
  history,
  setHistory,
  bgm,
}) {
  const { getWidth, getHeight } = useContext(ResizeContext);

  const { t, i18n } = useTranslation();

  const [vers, setVers] = useState(sessionStorage.getItem("vers") || "1.0.1");

  const [totalBeginner, setTotalBeginner] = useState(
    parseInt(localStorage.getItem("totalBeginner")) || 0
  );

  const [bannerState, setBannerState] = useState({
    beginner: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 50,
      softPity: 50,
      guaranteeFive: localStorage.getItem("begGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("begGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("begPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("begPityFour")) || 0,
    },
    char: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 90,
      softPity: 75,
      guaranteeFive: localStorage.getItem("charGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("charGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("charPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("charPityFour")) || 0,
    },
    weap: {
      rateFive: 0.008,
      rateFour: 0.066,
      maxPity: 80,
      softPity: 65,
      guaranteeFive: localStorage.getItem("weapGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("weapGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("weapPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("weapPityFour")) || 0,
    },
    standard: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 90,
      softPity: 75,
      guaranteeFive: localStorage.getItem("standGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("standGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("standPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("standPityFour")) || 0,
    },
  });

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

  // creates stash
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("stash"))) return;
    let stash = {};
    allChars.map((char) => (stash[char] = 0));
    allWeapons.map((weap) => (stash[weap] = 0));
    localStorage.setItem("stash", JSON.stringify(stash));
  }, []);

  const updateStash = (warpItem) => {
    let stash = JSON.parse(localStorage.getItem("stash"));
    if (stash[warpItem] === 0) setNewItems((prev) => [...prev, warpItem]);
    stash[warpItem]++;
    localStorage.setItem("stash", JSON.stringify(stash));
  };

  const allBanners = useMemo(() => {
    return {
      "1.0.0": {
        char: <ButterflyOnSwordtip />,
        weap: <BrilliantFixationS />,
      },
      "1.0.1": {
        char: <SwirlOfHeavenlySpear />,
        weap: <BrilliantFixationJY />,
      },
      "1.1.0": {
        char: <GamerMoment />,
        weap: <BrilliantFixationSW />,
      },
      "1.1.1": {
        char: <HealerGuy />,
        weap: <BrilliantFixationL />,
      },
    };
  }, []);

  const currentBanners = {
    beginner: <DepartureWarp total={totalBeginner} />,
    char: allBanners[vers]["char"],
    weap: allBanners[vers]["weap"],
    standard: <StellarWarp />,
  };

  const bannerBackColor = {
    "1.0.0": {
      char: "#0a162e",
      weap: "#0a162e",
    },
    "1.0.1": {
      char: "#1f2930",
      weap: "black",
    },
    "1.1.0": {
      char: "black",
      weap: "black",
    },
    "1.1.1": {
      char: "black",
      weap: "black",
    },
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
    setHasFive(false);
    setHasFour(false);
    let warpResults = [];
    let banner = bannerState[bannerType];
    for (let i = 0; i < warps; i++)
      warpResults.push(
        CalcWarp(vers, bannerType, banner, setHasFive, setHasFour)
      );

    warpResults.map((item) => {
      updateStash(item);
      return item;
    });

    localStore("PityFive", bannerState[bannerType].pityFive);
    localStore("PityFour", bannerState[bannerType].pityFour);
    localStore("GuaranteeFive", bannerState[bannerType].guaranteeFive);
    localStore("GuaranteeFour", bannerState[bannerType].guaranteeFour);

    let historyClone = structuredClone(history);
    historyClone[bannerType] = historyClone[bannerType].concat(
      new History(warpResults).getHistory()
    );
    localStore("History", JSON.stringify(historyClone[bannerType]));
    setHistory(historyClone);

    let bannerStateClone = bannerState;
    bannerStateClone[bannerType] = banner;
    setBannerState(bannerStateClone);
    setCurrentWarp(warpResults);
    setContent("video");
  };

  const getBack = () => {
    if (bannerType === "beginner") return "beginner/beginner";
    if (bannerType === "standard") return "standard/standard";
    return `${vers}/${bannerType}`;
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
            : bannerBackColor[vers][bannerType]
        }`,
      }}
    >
      <Settings
        lockout={lockout}
        vers={vers}
        showDB={showDB}
        setShowDB={setShowDB}
        setVers={setVers}
        setDBType={setDBType}
        setContent={setContent}
        bgm={bgm}
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
              fontSize: getWidth(22, 9),
              height: getWidth(24, 11),
              textAlign: "left",
              marginTop: `-6px`,
            }}
          >
            {t("main.title")}
          </div>
          <div
            id="warp-type"
            style={{
              textAlign: "left",
              fontSize: getWidth(24, 11),
              height: getWidth(24, 11),
            }}
          >
            {json.getTitle(vers, bannerType, i18n.resolvedLanguage)}
          </div>
        </div>
      </div>
      <MiniBanners
        vers={vers}
        bannerType={bannerType}
        setBannerType={setBannerType}
        hasBeginner={totalBeginner < 5}
      />
      <div
        style={{
          position: "relative",
          width: getWidth(1200),
          height: getHeight(700, 1200),
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-55%)",
        }}
      >
        <AnimatePresence>
          <motion.div
            className="banner"
            key={bannerType + vers}
            initial={
              bannerType === "beginner"
                ? {}
                : {
                    transform: `translate(-50%, 500%)`,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }
            }
            animate={{
              transform: "translate(-50%,-50%)",
              opacity: 1,
              transition: { duration: bannerType === "beginner" ? 0 : 0.3 },
            }}
            exit={
              bannerType === "beginner"
                ? { opacity: 0 }
                : {
                    transform: `translate(-50%, -500%)`,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }
            }
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
          onClick={() => {}}
          content={t("button.exchange")}
          disabled={true}
        />
        <Button
          style={{
            position: "absolute",
            bottom: "-1.5%",
            left: "25%",
            zIndex: "1000",
          }}
          onClick={() => setContent("details")}
          content={t("button.view-details")}
        />
        <WarpButtons onWarp={handleWarp} event={bannerType} />
      </div>
    </motion.section>
  );
}
