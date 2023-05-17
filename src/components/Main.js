import React, { useState, useContext, useMemo, useEffect } from "react";
import { json, allChars, allWeapons } from "../classes/Constants";
import { CalcWarp } from "../classes/CalcWarp";
// import History from "../classes/History";
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

export default function Main({
  lockout,
  bannerType,
  setBannerType,
  setNewItems,
  setHasFive,
  setHasFour,
  setContent,
  setCurrentWarp,
}) {
  const { getWidth, getHeight } = useContext(ResizeContext);

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
      pityFive: parseInt(localStorage.getItem("beg")) || 0,
      pityFour: parseInt(localStorage.getItem("beg")) || 0,
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
    let stash = [];
    allChars.map((char) => stash.push({ itemId: char, count: 0 }));
    allWeapons.map((weapon) => stash.push({ itemId: weapon, count: 0 }));
    localStorage.setItem("stash", JSON.stringify(stash));
  }, []);

  const updateStash = (warpItem) => {
    let stash = JSON.parse(localStorage.getItem("stash"));
    stash.map((stashItem) => {
      if (stashItem.itemId === warpItem) {
        if (stashItem.count === 0) setNewItems((prev) => [...prev, warpItem]);
        stashItem.count += 1;
      }
      return stashItem;
    });
    orderStash(stash);
    localStorage.setItem("stash", JSON.stringify(stash));
  };

  const orderStash = (stash) => {
    for (let i = 1; i < stash.length; i++) {
      if (stash[i].count > 0) {
        for (let j = i - 1; j >= 0; j--) {
          if (stash[j].count === 0) {
            let tmp = stash[j];
            stash[j] = stash[j + 1];
            stash[j + 1] = tmp;
          }
        }
      }
    }
  };

  const banners = useMemo(() => {
    return {
      "1.0": {
        char: <ButterflyOnSwordtip />,
        weap: <BrilliantFixationS />,
      },
      1.1: {
        char: <SwirlOfHeavenlySpear />,
        weap: <BrilliantFixationJY />,
      },
    };
  }, []);

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
    if (bannerType === "beginner") return "beginner";
    if (bannerType === "standard") return "standard";
    return `${vers}/${bannerType}`;
  };

  const getBanner = () => {
    if (bannerType === "beginner")
      return <DepartureWarp total={totalBeginner} />;
    if (bannerType === "standard") return <StellarWarp />;
    return banners[vers][bannerType];
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
      <Settings lockout={lockout} vers={vers} setVers={setVers} />
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
          width: getWidth(380),
          height: getHeight(50, 380),
        }}
      >
        <div
          id="warp-icon"
          style={{
            backgroundImage: "url(/assets/warp-icon.webp)",
            width: getWidth(44),
            height: getWidth(44),
            backgroundSize: getWidth(44),
          }}
        />
        <div
          style={{
            height: getHeight(50, 300),
            width: getWidth(300),
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
            Warp
          </div>
          <div
            id="warp-type"
            style={{
              textAlign: "left",
              fontSize: getWidth(24),
              height: getWidth(24),
            }}
          >
            {json.getTitle(vers, bannerType)}
          </div>
        </div>
      </div>
      <MiniBanners
        vers={vers}
        bannerType={bannerType}
        setBannerType={setBannerType}
        hasBeginner={totalBeginner < 5}
      />
      {getBanner()}
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
        text="Exchange"
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
        text="View Details"
        disabled={true}
      />
      <WarpButtons onWarp={handleWarp} event={bannerType} />
    </div>
  );
}
