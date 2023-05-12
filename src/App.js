import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./css/App.css";
import "./css/Lazy.css";
import { CalcWarp } from "./classes/CalcWarp";
import WarpVideo from "./components/WarpVideo";
import WarpResults from "./components/WarpResults";
import WarpButtons from "./components/WarpButtons";
import useWindowSize from "./components/useWindowSize";
import DepartureWarp from "./banners/DepartureWarp";
import ButterflyOnSwordtip from "./banners/ButterflyOnSwordtip";
import BrilliantFixation from "./banners/BrilliantFixation";
import StellarWarp from "./banners/StellarWarp";
import { json, allChars, allWeapons } from "./classes/Constants";
import WarpSingle from "./components/WarpSingle";
import History from "./classes/History";
import MiniBanners from "./components/MiniBanners";
import { LazyLoadImage } from "react-lazy-load-image-component";

function App() {
  const [content, setContent] = useState("main");

  const [vers, setVers] = useState("1.0");

  const [bannerType, setBannerType] = useState(
    parseInt(sessionStorage.getItem("totalBeginner")) === 5
      ? "char"
      : "beginner"
  );

  const [currentWarp, setCurrentWarp] = useState([]);

  const [bannerState, setBannerState] = useState({
    beginner: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 50,
      guaranteeFive: sessionStorage.getItem("begGuaranteeFive") === "true",
      guaranteeFour: sessionStorage.getItem("begGuaranteeFour") === "true",
      pityFive: parseInt(sessionStorage.getItem("beg")) || 0,
      pityFour: parseInt(sessionStorage.getItem("beg")) || 0,
    },
    char: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 90,
      guaranteeFive: sessionStorage.getItem("charGuaranteeFive") === "true",
      guaranteeFour: sessionStorage.getItem("charGuaranteeFour") === "true",
      pityFive: parseInt(sessionStorage.getItem("charPityFive")) || 0,
      pityFour: parseInt(sessionStorage.getItem("charPityFour")) || 0,
    },
    weap: {
      rateFive: 0.008,
      rateFour: 0.066,
      maxPity: 80,
      guaranteeFive: sessionStorage.getItem("weapGuaranteeFive") === "true",
      guaranteeFour: sessionStorage.getItem("weapGuaranteeFour") === "true",
      pityFive: parseInt(sessionStorage.getItem("weapPityFive")) || 0,
      pityFour: parseInt(sessionStorage.getItem("weapPityFour")) || 0,
    },
    standard: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 90,
      guaranteeFive: sessionStorage.getItem("standGuaranteeFive") === "true",
      guaranteeFour: sessionStorage.getItem("standGuaranteeFour") === "true",
      pityFive: parseInt(sessionStorage.getItem("standPityFive")) || 0,
      pityFour: parseInt(sessionStorage.getItem("standPityFour")) || 0,
    },
  });

  // const [history, setHistory] = useState({
  //   beginner: JSON.parse(localStorage.getItem("begHistory")) || [],
  //   char: JSON.parse(localStorage.getItem("charHistory")) || [],
  //   weap: JSON.parse(localStorage.getItem("weapHistory")) || [],
  //   standard: JSON.parse(localStorage.getItem("standHistory")) || [],
  // });

  const sessionStore = (suffix, value) => {
    switch (bannerType) {
      case "beginner":
        sessionStorage.setItem("beg" + suffix, value);
        break;
      case "char":
        sessionStorage.setItem("char" + suffix, value);
        break;
      case "weap":
        sessionStorage.setItem("weap" + suffix, value);
        break;
      default:
        sessionStorage.setItem("stand" + suffix, value);
        break;
    }
  };

  // creates stash
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("stash"))) return;
    let stash = [];
    allChars.map((char) => stash.push({ itemId: char, count: 0 }));
    allWeapons.map((weapon) => stash.push({ itemId: weapon, count: 0 }));
    sessionStorage.setItem("stash", JSON.stringify(stash));
  }, []);

  const [newItems, setNewItems] = useState([]);

  const updateStash = (warpItem) => {
    let stash = JSON.parse(sessionStorage.getItem("stash"));
    stash.map((stashItem) => {
      if (stashItem.itemId === warpItem) {
        if (stashItem.count === 0) setNewItems((prev) => [...prev, warpItem]);
        stashItem.count += 1;
      }
      return stashItem;
    });
    orderStash(stash);
    sessionStorage.setItem("stash", JSON.stringify(stash));
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

  const size = useWindowSize();

  const getWidth = useCallback(
    (width) => {
      return window.innerWidth > 1280 ? width : size.width / (1280 / width);
    },
    [size]
  );

  const getHeight = useCallback(
    (height, width) => {
      return window.innerWidth > 1280
        ? height
        : (getWidth(width) * height) / width;
    },
    [getWidth]
  );

  const resize = useMemo(() => {
    return {
      getWidth,
      getHeight,
    };
  }, [getWidth, getHeight]);

  const [totalBeginner, setTotalBeginner] = useState(
    parseInt(sessionStorage.getItem("totalBeginner")) || 0
  );

  const banners = useMemo(() => {
    return {
      "1.0": {
        beginner: <DepartureWarp total={totalBeginner} resize={resize} />,
        char: <ButterflyOnSwordtip resize={resize} />,
        weap: <BrilliantFixation resize={resize} />,
        standard: <StellarWarp resize={resize} />,
      },
    };
  }, [resize, totalBeginner]);

  useEffect(() => {
    if (totalBeginner === 5) setBannerType("char");
  }, [totalBeginner]);

  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);

  const handleWarp = (warps) => {
    if (bannerType === "beginner") {
      setTotalBeginner(totalBeginner + 1);
      sessionStorage.setItem("totalBeginner", totalBeginner + 1);
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

    sessionStore("PityFive", bannerState[bannerType].pityFive);
    sessionStore("PityFour", bannerState[bannerType].pityFour);
    sessionStore("GuaranteeFive", bannerState[bannerType].guaranteeFive);
    sessionStore("GuaranteeFour", bannerState[bannerType].guaranteeFour);

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

  return (
    <div className="App">
      {content === "main" && (
        <div
          id="main-back"
          style={{
            backgroundImage: `url(/assets/banner/${vers}/${bannerType}-back.webp)`,
            backgroundColor: `${
              bannerType === "beginner" ? "#1f2322" : "#0a162e"
            }`,
          }}
        >
          <a
            href="https://github.com/mikeli0623/star-rail"
            target="_blank"
            rel="noreferrer"
          >
            <img
              id="plug"
              src="/assets/github-mark-white.svg"
              alt="github link"
              width={resize.getWidth(40)}
              title="View source code"
            />
          </a>
          <div id="main-back-cover" />
          <div
            id="main-back-cover-pattern"
            style={{
              backgroundImage: "url(assets/banner/cover-pattern.webp)",
              backgroundSize: `${resize.getWidth(10)}px ${resize.getHeight(
                8,
                10
              )}px`,
            }}
          >
            <LazyLoadImage
              effect="opacity"
              className="ring"
              src="/assets/rings.webp"
              alt="rings"
              width={resize.getWidth(550)}
            />
            <div
              id="info"
              style={{
                width: resize.getWidth(320),
                height: resize.getHeight(44, 300),
              }}
            >
              <div
                id="warp-icon"
                style={{
                  backgroundImage: "url(/assets/warp-icon.webp)",
                  width: resize.getWidth(44),
                  height: resize.getWidth(44),
                  backgroundSize: resize.getWidth(44),
                }}
              />
              <div
                style={{
                  height: resize.getWidth(44),
                  width: resize.getWidth(240),
                  display: "flex",
                  flexDirection: "column",
                  margin: 0,
                  padding: 0,
                }}
              >
                <div
                  id="title"
                  style={{
                    fontSize: resize.getWidth(22),
                    height: resize.getWidth(24),
                    textAlign: "left",
                    marginTop: `-${resize.getWidth(5)}px`,
                  }}
                >
                  Warp
                </div>
                <div
                  id="warp-type"
                  style={{
                    textAlign: "left",
                    fontSize: resize.getWidth(24),
                    height: resize.getWidth(24),
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
              resize={resize}
            />
            {banners[vers][bannerType]}
            <img
              id="exchange-button"
              alt="exchange"
              src="/assets/exchange.webp"
              draggable="false"
              width={resize.getWidth(178)}
            />
            <img
              id="view-details-button"
              alt="view details"
              src="/assets/view-details.webp"
              draggable="false"
              width={resize.getWidth(178)}
            />
            <WarpButtons
              onWarp={handleWarp}
              event={bannerType}
              resize={resize}
            />
          </div>
        </div>
      )}
      {content === "video" && (
        <WarpVideo
          src={
            hasFive
              ? "/assets/five.mp4"
              : hasFour
              ? "/assets/four.mp4"
              : "/assets/three.mp4"
          }
          onEnded={() => {
            setContent("single");
          }}
          resize={resize}
        />
      )}
      {content === "single" && (
        <WarpSingle
          currentWarp={currentWarp}
          newItems={newItems}
          setNewItems={setNewItems}
          setContent={setContent}
          resize={resize}
        />
      )}
      {content === "results" && (
        <React.Fragment>
          <img
            className="ring"
            src="/assets/rings.webp"
            alt="rings"
            width={resize.getWidth(550)}
          />
          <WarpResults
            currentWarp={currentWarp}
            newItems={newItems}
            onClose={() => {
              setContent("main");
              setNewItems([]);
            }}
            resize={resize}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
