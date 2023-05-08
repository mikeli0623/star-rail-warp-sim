import { useState, useEffect, useMemo, useCallback } from "react";
import "./css/App.css";
import { CalcWarp } from "./classes/CalcWarp";
import WarpVideo from "./components/WarpVideo";
import WarpResults from "./components/WarpResults";
import WarpButtons from "./components/WarpButtons";
import useWindowSize from "./components/useWindowSize";
import ButterflyOnSwordtip from "./components/banners/ButterflyOnSwordtip";
import BrilliantFixation from "./components/banners/BrilliantFixation";
import StellarWarp from "./components/banners/StellarWarp";
import { json } from "./classes/Constants";

function App() {
  const [content, setContent] = useState("main");

  const [vers, setVers] = useState("1.0");

  const [bannerState, setBannerState] = useState([
    {
      type: "char-event",
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 90,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    {
      type: "weap-event",
      rateFive: 0.008,
      rateFour: 0.066,
      maxPity: 80,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    {
      type: "standard",
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 90,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
  ]);

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

  const banners = useMemo(() => {
    return {
      "1.0": {
        char: <ButterflyOnSwordtip getWidth={getWidth} getHeight={getHeight} />,
        weap: <BrilliantFixation getWidth={getWidth} getHeight={getHeight} />,
        standard: <StellarWarp getWidth={getWidth} getHeight={getHeight} />,
      },
    };
  }, [getWidth, getHeight]);

  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerType, setBannerType] = useState("char");

  const [hasFive, setHasFive] = useState(false);

  const [numWarps, setNumWarps] = useState(0);

  const [currentWarp, setCurrentWarp] = useState([]);

  const handleWarp = (warps) => {
    setNumWarps(warps);
    let warpResults = [];
    let banner = bannerState[bannerIndex];
    for (let i = 0; i < warps; i++)
      warpResults.push(CalcWarp(vers, banner, setHasFive));
    let bannerStateClone = bannerState;
    bannerStateClone[bannerIndex] = banner;
    setBannerState(bannerStateClone);
    setCurrentWarp(warpResults);
    setContent("video");
    // setContent("results");
  };

  const [highlightIndex, setHighlightIndex] = useState(null);

  return (
    <div className="App">
      {content === "main" && (
        <div
          id="main-back"
          style={{
            backgroundImage: `url(../assets/banner/1.0-${bannerType}-back.webp)`,
          }}
        >
          <a
            href="https://github.com/mikeli0623/star-rail"
            target="_blank"
            rel="noreferrer"
          >
            <img
              id="plug"
              src="/assets/github-mark.svg"
              alt="github link"
              width={getWidth(40)}
            />
          </a>
          <div id="main-back-cover" />
          <div
            id="main-back-cover-pattern"
            style={{
              backgroundImage: "url(../assets/banner/cover-pattern.webp)",
              backgroundSize: `${getWidth(10)}px ${getHeight(8, 10)}px`,
            }}
          >
            <img
              className="ring"
              src="/assets/rings.webp"
              alt="rings"
              width={getWidth(550)}
            />
            <div id="info">
              <div
                id="warp-icon"
                style={{
                  backgroundImage: "url(/assets/warp-icon.webp)",
                  width: getWidth(41),
                  height: getWidth(41),
                  backgroundSize: getWidth(41),
                }}
              />
              <p id="title" style={{ fontSize: getWidth(22) }}>
                Warp
              </p>
              <p id="warp-type" style={{ fontSize: getWidth(24) }}>
                {json.getTitle(vers, bannerState[bannerIndex].type)}
              </p>
            </div>
            <img
              className="mini-banner"
              alt="mini character banner"
              src={`../assets/banner/mini/mini-${vers}-char.webp`}
              width={getWidth(160)}
              style={{
                transform: `translateY(180%)`,
                opacity: `${bannerIndex === 0 ? 0 : 1}`,
              }}
              onClick={() => {
                setBannerIndex(0);
                setBannerType("char");
              }}
              draggable="false"
              onMouseDown={() => {
                if (highlightIndex !== 0) setHighlightIndex(0);
              }}
              onMouseUp={() => {
                setHighlightIndex(null);
              }}
              onMouseLeave={() => {
                setHighlightIndex(null);
              }}
            />
            <img
              className="mini-banner"
              alt="mini character banner"
              src={`../assets/banner/mini/mini-${vers}-char-active.webp`}
              width={getWidth(180)}
              style={{
                transform: `translateY(100%)`,
                opacity: `${bannerIndex === 0 ? 1 : 0}`,
                pointerEvents: "none",
              }}
              draggable="false"
            />
            <img
              className="mini-banner"
              alt="mini weapon banner"
              src={`../assets/banner/mini/mini-${vers}-weap-active.webp`}
              width={getWidth(180)}
              style={{
                transform: `translateY(200%)`,
                opacity: `${bannerIndex === 1 ? 1 : 0}`,
                pointerEvents: "none",
              }}
              draggable="false"
            />
            <img
              className="mini-banner"
              alt="mini weapon banner"
              src={`../assets/banner/mini/mini-${vers}-weap.webp`}
              width={getWidth(160)}
              style={{
                transform: `translateY(320%)`,
                opacity: `${bannerIndex === 1 ? 0 : 1}`,
              }}
              onClick={() => {
                setBannerIndex(1);
                setBannerType("weap");
              }}
              draggable="false"
              onMouseDown={() => {
                if (highlightIndex !== 1) setHighlightIndex(1);
              }}
              onMouseUp={() => {
                setHighlightIndex(null);
              }}
              onMouseLeave={() => {
                setHighlightIndex(null);
              }}
            />
            <img
              className="mini-banner"
              alt="mini standard banner"
              src={`../assets/banner/mini/mini-${vers}-standard-active.webp`}
              width={getWidth(180)}
              style={{
                transform: `translateY(335%)`,
                opacity: `${bannerIndex === 2 ? 1 : 0}`,
              }}
              draggable="false"
            />
            <img
              className="mini-banner"
              alt="mini standard banner"
              src={`../assets/banner/mini/mini-${vers}-standard.webp`}
              width={getWidth(160)}
              style={{
                transform: `translateY(460%)`,
                opacity: `${bannerIndex === 2 ? 0 : 1}`,
              }}
              onClick={() => {
                setBannerIndex(2);
                setBannerType("standard");
              }}
              draggable="false"
              onMouseDown={() => {
                if (highlightIndex !== 2) setHighlightIndex(2);
              }}
              onMouseUp={() => {
                setHighlightIndex(null);
              }}
              onMouseLeave={() => {
                setHighlightIndex(null);
              }}
            />
            <img
              className="mini-highlight"
              src="../assets/banner/mini/mini-highlight.webp"
              alt="highlight"
              width={getWidth(160)}
              style={{
                transform: "translateY(170%)",
                opacity: `${highlightIndex === 0 && bannerIndex !== 0 ? 1 : 0}`,
              }}
            />
            <img
              className="mini-highlight"
              src="../assets/banner/mini/mini-highlight.webp"
              alt="highlight"
              width={getWidth(160)}
              style={{
                transform: "translateY(305%)",
                opacity: `${highlightIndex === 1 && bannerIndex !== 1 ? 1 : 0}`,
              }}
            />
            <img
              className="mini-highlight"
              src="../assets/banner/mini/mini-highlight.webp"
              alt="highlight"
              width={getWidth(160)}
              style={{
                transform: "translateY(440%)",
                opacity: `${highlightIndex === 2 && bannerIndex !== 2 ? 1 : 0}`,
              }}
            />
            {banners[vers][bannerType]}
            <img
              id="exchange-button"
              alt="exchange"
              src="/assets/exchange.webp"
              draggable="false"
              width={getWidth(178)}
            />
            <img
              id="view-details-button"
              alt="view details"
              src="/assets/view-details.webp"
              draggable="false"
              width={getWidth(178)}
            />
            <WarpButtons
              onWarp={handleWarp}
              event={bannerIndex !== 2}
              getHeight={getHeight}
              getWidth={getWidth}
            />
          </div>
        </div>
      )}
      {content === "video" && (
        <WarpVideo
          src={hasFive ? "/assets/five.mp4" : "/assets/normal.mp4"}
          onEnded={() => {
            if (numWarps === 10) setContent("results");
            else setContent("main");
          }}
          getHeight={getHeight}
          getWidth={getWidth}
        />
      )}
      {content === "results" && (
        <>
          <img
            className="ring"
            src="/assets/rings.webp"
            alt="rings"
            width={getWidth(550)}
          />
          <WarpResults
            setContent={setContent}
            currentWarp={currentWarp}
            getWidth={getWidth}
            getHeight={getHeight}
          />
        </>
      )}
    </div>
  );
}

export default App;
