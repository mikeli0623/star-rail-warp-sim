import React, { useState, useContext, useMemo, useEffect } from "react";
import { json, allChars, allWeapons } from "../util/Constants";
import { CalcWarp } from "../util/CalcWarp";
// import History from "../util/History";
import WarpButtons from "./WarpButtons";
import MiniBanners from "./MiniBanners";
import Settings from "./Settings";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "./ResizeContext";
import DepartureWarp from "../banners/DepartureWarp";
import ButterflyOnSwordtip from "../banners/ButterflyOnSwordtip";
import BrilliantFixationS from "../banners/BrilliantFixationS";
import BrilliantFixationJY from "../banners/BrilliantFixationJY";
import SwirlOfHeavenlySpear from "../banners/SwirlOfHeavenlySpear";
import StellarWarp from "../banners/StellarWarp";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";

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
}) {
  const { getWidth, getHeight } = useContext(ResizeContext);

  const { t, i18n } = useTranslation();

  const [vers, setVers] = useState(sessionStorage.getItem("vers") || "1.1");

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

  // const [history, setHistory] = useState({
  //   beginner: JSON.parse(localStorage.getItem("begHistory")) || [],
  //   char: JSON.parse(localStorage.getItem("charHistory")) || [],
  //   weap: JSON.parse(localStorage.getItem("weapHistory")) || [],
  //   standard: JSON.parse(localStorage.getItem("standHistory")) || [],
  // });

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

  const [direction, setDirection] = useState("down");

  const banners = useMemo(() => {
    return {
      "1.0": {
        char: <ButterflyOnSwordtip direction={direction} />,
        weap: <BrilliantFixationS direction={direction} />,
      },
      1.1: {
        char: <SwirlOfHeavenlySpear direction={direction} />,
        weap: <BrilliantFixationJY direction={direction} />,
      },
    };
  }, [direction]);

  const bannerBackColor = {
    "1.0": {
      char: "#0a162e",
      weap: "#0a162e",
    },
    1.1: {
      char: "black",
      weap: "black",
    },
  };

  const handleWarp = (warps) => {
    if (bannerType === "beginner") {
      setTotalBeginner(totalBeginner + 1);
      localStorage.setItem("totalBeginner", totalBeginner + 1);
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

    // let historyClone = structuredClone(history);
    // historyClone[bannerType] = historyClone[bannerType].concat(
    //   new History(warpResults).getHistory()
    // );
    // localStore("History", JSON.stringify(historyClone[bannerType]));
    // setHistory(historyClone);

    let bannerStateClone = bannerState;
    bannerStateClone[bannerType] = banner;
    setBannerState(bannerStateClone);
    setCurrentWarp(warpResults);
    setContent("video");
  };

  useEffect(() => {
    if (totalBeginner === 5) setBannerType("char");
  }, [totalBeginner, setBannerType]);

  useEffect(() => {
    sessionStorage.setItem("bannerType", bannerType);
  }, [bannerType]);

  const getBack = () => {
    if (bannerType === "beginner") return "beginner/beginner";
    if (bannerType === "standard") return "standard/standard";
    return `${vers}/${bannerType}`;
  };

  return (
    <div
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
        className="ring"
        src="/assets/rings.webp"
        alt="rings"
        width={getWidth(550)}
      />
      <div
        id="info"
        style={{
          width: getWidth(680),
          height: getHeight(50, 680),
        }}
      >
        <div
          id="warp-icon"
          style={{
            backgroundImage: "url(/assets/icon-warp.webp)",
            width: getWidth(44),
            height: getWidth(44),
            backgroundSize: getWidth(44),
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
              fontSize: getWidth(22),
              height: getWidth(24),
              textAlign: "left",
              marginTop: `-${getWidth(6)}px`,
            }}
          >
            {t("main.title")}
          </div>
          <div
            id="warp-type"
            style={{
              textAlign: "left",
              fontSize: getWidth(24),
              height: getWidth(24),
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
        setDirection={setDirection}
        hasBeginner={totalBeginner < 5}
      />
      <AnimatePresence>
        {totalBeginner < 5 && bannerType === "beginner" && (
          <DepartureWarp total={totalBeginner} />
        )}
        {bannerType === "char" && banners[vers]["char"]}
        {bannerType === "weap" && banners[vers]["weap"]}
        {bannerType === "standard" && <StellarWarp />}
      </AnimatePresence>
      <Button
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: "1000",
          transform: "translate(-230%, 650%)",
        }}
        onClick={() => {}}
        size="md"
        text={t("button.exchange")}
        disabled={true}
      />
      <Button
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: "1000",
          transform: "translate(-125%, 650%)",
        }}
        onClick={() => {}}
        size="md"
        text={t("button.view-details")}
        disabled={true}
      />
      <WarpButtons onWarp={handleWarp} event={bannerType} />
    </div>
  );
}
