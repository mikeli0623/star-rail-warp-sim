import React, { useState, useCallback, useEffect, Suspense } from "react";
import "./css/App.css";
import "./css/Lazy.css";
import WarpVideo from "./components/WarpVideo";
import WarpResults from "./components/WarpResults";
import useWindowSize from "./components/hooks/useWindowSize";
import WarpSingle from "./components/WarpSingle";
import useSound from "use-sound";
import { SoundProvider } from "./components/context/SoundContext";
import { ResizeProvider } from "./components/context/ResizeContext";
import Main from "./components/Main";
import DataBank from "./components/db/DataBank";
import { AnimatePresence } from "framer-motion";
import { usePageVisibility } from "react-page-visibility";
import DetailsMain from "./components/details/DetailsMain";
import StatsMain from "./components/stats/StatsMain";
import useBGM from "./components/hooks/useBGM";
import StartModal from "./components/modals/StartModal";

function App() {
  const [content, setContent] = useState("main");

  const [bannerType, setBannerType] = useState(
    sessionStorage.getItem("bannerType")
      ? sessionStorage.getItem("bannerType")
      : parseInt(localStorage.getItem("totalBeginner")) === 5
      ? "char"
      : "beginner"
  );

  const [currentWarp, setCurrentWarp] = useState([]);

  const [bannerState, setBannerState] = useState({
    beginner: {
      rateFive: parseInt(localStorage.getItem("begRateFive")) || 0.006,
      rateFour: parseInt(localStorage.getItem("begRateFour")) || 0.051,
      maxPity: parseInt(localStorage.getItem("begHardPity")) || 50,
      softPity: parseInt(localStorage.getItem("begSoftPity")) || 50,
      guaranteeFive: localStorage.getItem("begGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("begGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("begPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("begPityFour")) || 0,
    },
    char: {
      rateFive: parseInt(localStorage.getItem("charRateFive")) || 0.006,
      rateFour: parseInt(localStorage.getItem("charRateFour")) || 0.051,
      maxPity: parseInt(localStorage.getItem("charHardPity")) || 90,
      softPity: parseInt(localStorage.getItem("charSoftPity")) || 75,
      guaranteeFive: localStorage.getItem("charGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("charGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("charPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("charPityFour")) || 0,
    },
    weap: {
      rateFive: parseInt(localStorage.getItem("weapRateFive")) || 0.008,
      rateFour: parseInt(localStorage.getItem("weapRateFour")) || 0.066,
      maxPity: parseInt(localStorage.getItem("weapHardPity")) || 80,
      softPity: parseInt(localStorage.getItem("weapSoftPity")) || 65,
      guaranteeFive: localStorage.getItem("weapGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("weapGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("weapPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("weapPityFour")) || 0,
    },
    standard: {
      rateFive: parseInt(localStorage.getItem("standRateFive")) || 0.006,
      rateFour: parseInt(localStorage.getItem("standRateFour")) || 0.051,
      maxPity: parseInt(localStorage.getItem("standHardPity")) || 90,
      softPity: parseInt(localStorage.getItem("standSoftPity")) || 75,
      guaranteeFive: localStorage.getItem("standGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("standGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("standPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("standPityFour")) || 0,
    },
  });

  const [sound, setSound] = useState(false);
  const [continueSound, setContinueSound] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("bgm") ? JSON.parse(localStorage.getItem("bgm")) : true
  );

  const {
    BGMVolume,
    setBGMVolume,
    track,
    setTrack,
    setMuted,
    loaded,
    setLoaded,
    soundComponent,
  } = useBGM("ooc-timeline", "./assets/audio/bgm/");

  useEffect(() => {
    if (sound && soundEnabled) setMuted(false);
    return () => setMuted(true);
  }, [soundEnabled, sound, setMuted]);

  const soundValue = {
    sound,
    setSound,
    setContinueSound,
    soundEnabled,
    setSoundEnabled,
    useSound,
    loaded: loaded,
  };

  const isVisible = usePageVisibility();

  const [newItems, setNewItems] = useState([]);

  const size = useWindowSize();

  const getWidth = useCallback(
    (width, minWidth = 0) => {
      return window.innerWidth > 1280
        ? width
        : Math.max((size.width * width) / 1280, minWidth);
    },
    [size]
  );

  const getHeight = useCallback(
    (height, width, minHeight = 0, minWidth = 0) => {
      return window.innerWidth > 1280
        ? height
        : Math.max((getWidth(width, minWidth) * height) / width, minHeight);
    },
    [getWidth]
  );

  const resizeValue = { getWidth, getHeight };

  // pauses sound when focus is lost
  useEffect(() => {
    if (!isVisible) setSound(false);
    else setSound(continueSound);
  }, [isVisible, sound, continueSound]);

  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);

  const handleTrack = (track, loaded = false) => {
    setLoaded(loaded);
    setTrack(track);
  };

  const [playWarpBGM, warpData] = useSound("/assets/audio/bgm/warp-loop.mp3", {
    loop: true,
  });

  useEffect(() => {
    if (!sound) {
      warpData.stop();
      return;
    }

    let warpTimeout;

    if (
      content === "main" ||
      content === "data-bank" ||
      content === "details"
    ) {
      if (
        localStorage.getItem("bgm")
          ? JSON.parse(localStorage.getItem("bgm"))
          : true
      )
        setSoundEnabled(true);
      warpData.stop();
    } else if (content === "single") {
      if (BGMVolume > 0) setBGMVolume(0);
      if (warpData.sound.playing()) return;
      playWarpBGM();
      warpData.sound.fade(0, 1, 500);
    }
    return () => {
      if (content === "main") {
        clearTimeout(warpTimeout);
      }
      if (content === "video") {
        clearTimeout(warpTimeout);
        warpData.stop();
      }
      if (content === "results") {
        clearTimeout(warpTimeout);
        warpData.sound.fade(1, 0, 500);
        warpTimeout = setTimeout(() => {
          warpData.stop();
        }, 500);
      }
    };
  }, [
    content,
    sound,
    currentWarp.length,
    playWarpBGM,
    warpData,
    BGMVolume,
    setBGMVolume,
  ]);

  const [showDB, setShowDB] = useState(false);

  const [DBType, setDBType] = useState("char");

  const [history, setHistory] = useState({
    beginner: JSON.parse(localStorage.getItem("begHistory")) || [],
    char: JSON.parse(localStorage.getItem("charHistory")) || [],
    weap: JSON.parse(localStorage.getItem("weapHistory")) || [],
    standard: JSON.parse(localStorage.getItem("standHistory")) || [],
  });

  const [showStart, setShowStart] = useState(true);

  return (
    <ResizeProvider value={resizeValue}>
      <SoundProvider value={soundValue}>
        {soundComponent}
        <div className="App">
          <StartModal show={showStart} setShow={setShowStart} />

          <AnimatePresence>
            {content === "main" && (
              <Main
                bannerType={bannerType}
                bannerState={bannerState}
                setBannerState={setBannerState}
                showDB={showDB}
                setShowDB={setShowDB}
                setBannerType={setBannerType}
                setNewItems={setNewItems}
                setHasFive={setHasFive}
                setHasFour={setHasFour}
                setContent={setContent}
                setCurrentWarp={setCurrentWarp}
                setDBType={setDBType}
                history={history}
                setHistory={setHistory}
                showStart={showStart}
                bgm={[track, handleTrack]}
              />
            )}
            {content === "video" && (
              <WarpVideo
                rarity={hasFive ? "five" : hasFour ? "four" : "three"}
                event={bannerType === "char" || bannerType === "weap"}
                onEnded={() => {
                  setContent("single");
                }}
                warpBGM={{ playWarpBGM, warpData }}
              />
            )}
            {content === "single" && (
              <WarpSingle
                currentWarp={currentWarp}
                hasFive={hasFive}
                newItems={newItems}
                setNewItems={setNewItems}
                setContent={setContent}
              />
            )}
            {content === "results" && (
              <WarpResults
                currentWarp={currentWarp}
                hasFive={hasFive}
                newItems={newItems}
                onClose={() => {
                  setContent("main");
                  setNewItems([]);
                }}
              />
            )}
            {content === "data-bank" && (
              <DataBank
                type={DBType}
                setContent={setContent}
                setShowDB={setShowDB}
              />
            )}
            {content === "details" && (
              <DetailsMain
                setContent={setContent}
                bannerType={bannerType}
                history={history[bannerType]}
              />
            )}
            {content === "stats" && (
              <StatsMain
                setContent={setContent}
                bannerType={bannerType}
                setBannerType={setBannerType}
                bannerState={bannerState}
                setBannerState={setBannerState}
              />
            )}
          </AnimatePresence>
        </div>
      </SoundProvider>
    </ResizeProvider>
  );
}

export default function WrappedApp() {
  return (
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  );
}

function Loading() {
  return <div id="loading">Loading...</div>;
}
