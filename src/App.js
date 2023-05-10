import { useState, useMemo, useCallback, useEffect } from "react";
import "./css/App.css";
import { CalcWarp } from "./classes/CalcWarp";
import WarpVideo from "./components/WarpVideo";
import WarpResults from "./components/WarpResults";
import WarpButtons from "./components/WarpButtons";
import useWindowSize from "./components/useWindowSize";
import DepartureWarp from "./banners/DepartureWarp";
import ButterflyOnSwordtip from "./banners/ButterflyOnSwordtip";
import BrilliantFixation from "./banners/BrilliantFixation";
import StellarWarp from "./banners/StellarWarp";
import { json } from "./classes/Constants";
import WarpSingle from "./components/WarpSingle";
import MiniBanners from "./components/MiniBanners";

function App() {
  const [content, setContent] = useState("main");

  const [vers, setVers] = useState("1.0");

  const [bannerState, setBannerState] = useState({
    beginner: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 50,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    char: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 90,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    weap: {
      rateFive: 0.008,
      rateFour: 0.066,
      maxPity: 80,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    standard: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 90,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
  });

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

  const [remainingBeginner, setRemainingBeginner] = useState(50);

  const banners = useMemo(() => {
    return {
      "1.0": {
        beginner: (
          <DepartureWarp remaining={remainingBeginner} resize={resize} />
        ),
        char: <ButterflyOnSwordtip resize={resize} />,
        weap: <BrilliantFixation resize={resize} />,
        standard: <StellarWarp resize={resize} />,
      },
    };
  }, [resize, remainingBeginner]);

  useEffect(() => {
    if (remainingBeginner === 0) setBannerType("char");
  }, [remainingBeginner]);

  const [bannerType, setBannerType] = useState("beginner");

  const [hasFive, setHasFive] = useState(false);

  const [currentWarp, setCurrentWarp] = useState([]);

  const handleWarp = (warps) => {
    if (bannerType === "beginner") setRemainingBeginner(remainingBeginner - 10);
    setHasFive(false);
    let warpResults = [];
    let banner = bannerState[bannerType];
    for (let i = 0; i < warps; i++)
      warpResults.push(CalcWarp(vers, bannerType, banner, setHasFive));
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
            backgroundImage: `url(../assets/banner/${vers}/${bannerType}-back.webp)`,
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
            />
          </a>
          <div id="main-back-cover" />
          <div
            id="main-back-cover-pattern"
            style={{
              backgroundImage: "url(../assets/banner/cover-pattern.webp)",
              backgroundSize: `${resize.getWidth(10)}px ${resize.getHeight(
                8,
                10
              )}px`,
            }}
          >
            <img
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
              hasBeginner={remainingBeginner > 0}
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
          src={hasFive ? "/assets/five.mp4" : "/assets/normal.mp4"}
          onEnded={() => {
            setContent("single");
          }}
          resize={resize}
        />
      )}
      {content === "single" && (
        <WarpSingle
          currentWarp={currentWarp}
          setContent={setContent}
          resize={resize}
        />
      )}
      {content === "results" && (
        <>
          <img
            className="ring"
            src="/assets/rings.webp"
            alt="rings"
            width={resize.getWidth(550)}
          />
          <WarpResults
            setContent={setContent}
            currentWarp={currentWarp}
            resize={resize}
          />
        </>
      )}
    </div>
  );
}

export default App;
