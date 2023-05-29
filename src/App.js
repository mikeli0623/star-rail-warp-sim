import React, { useState, useCallback, useEffect, Suspense } from "react";
import "./css/App.css";
import "./css/Lazy.css";
import WarpVideo from "./components/WarpVideo";
import WarpResults from "./components/WarpResults";
import useWindowSize from "./components/useWindowSize";
import WarpSingle from "./components/WarpSingle";
import useSound from "use-sound";
import { SoundProvider } from "./components/SoundContext";
import { ResizeProvider } from "./components/ResizeContext";
import Main from "./components/Main";
import DataBank from "./components/DataBank";
import { AnimatePresence } from "framer-motion";
import { usePageVisibility } from "react-page-visibility";

function App() {
  const [content, setContent] = useState("main");

  const [bannerType, setBannerType] = useState(
    parseInt(localStorage.getItem("totalBeginner")) === 5 ? "char" : "beginner"
  );

  const [currentWarp, setCurrentWarp] = useState([]);

  const [sound, setSound] = useState(false);
  const [continueSound, setContinueSound] = useState(false);
  const soundValue = { sound, setSound, setContinueSound };

  const isVisible = usePageVisibility();

  const [lockout, setLockout] = useState(0);

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

  useEffect(() => {
    if (!isVisible) setSound(false);
    else setSound(continueSound);
  }, [isVisible, sound, continueSound]);

  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);

  const [playOOCSF, OOCSFData] = useSound(
    "assets/audio/bgm/ooc-science-fiction.mp3",
    {
      loop: true,
      onload: () => setLockout((prev) => prev + 1),
    }
  );

  const [playOOCT, OOCTData] = useSound("assets/audio/bgm/ooc-timeline.mp3", {
    loop: true,
    onload: () => setLockout((prev) => prev + 1),
  });

  const [playOOCSW, OOCSWData] = useSound(
    "assets/audio/bgm/ooc-space-walk.mp3",
    {
      loop: true,
      onload: () => setLockout((prev) => prev + 1),
    }
  );

  const [playOSAEFS, OSAEFSData] = useSound(
    "assets/audio/bgm/osae-faded-sun.mp3",
    {
      loop: true,
      onload: () => setLockout((prev) => prev + 1),
    }
  );

  const [playOSAESA, OSAESAData] = useSound(
    "assets/audio/bgm/osae-streets-abuzz.mp3",
    {
      loop: true,
      onload: () => setLockout((prev) => prev + 1),
    }
  );

  const [playSSCF, SSCFData] = useSound(
    "assets/audio/bgm/ss-cumulus-formations.mp3",
    {
      loop: true,
      onload: () => setLockout((prev) => prev + 1),
    }
  );

  const [playSSEI, SSEIData] = useSound(
    "assets/audio/bgm/ss-exquisite-ingenuity.mp3",
    {
      loop: true,
      onload: () => setLockout((prev) => prev + 1),
    }
  );

  const [playSSLM, SSLMData] = useSound(
    "assets/audio/bgm/ss-lustrous-moonlight.mp3",
    {
      loop: true,
      onload: () => setLockout((prev) => prev + 1),
    }
  );

  const [[playMainBGM, mainData], setBgm] = useState([undefined, undefined]);

  const allBGM = {
    "ooc-science-fiction": [playOOCSF, OOCSFData],
    "ooc-space-walk": [playOOCSW, OOCSWData],
    "ooc-timeline": [playOOCT, OOCTData],
    "osae-faded-sun": [playOSAEFS, OSAEFSData],
    "osae-streets-abuzz": [playOSAESA, OSAESAData],
    "ss-cumulus-formations": [playSSCF, SSCFData],
    "ss-exquisite-ingenuity": [playSSEI, SSEIData],
    "ss-lustrous-moonlight": [playSSLM, SSLMData],
  };

  useEffect(() => {
    if (lockout === Object.keys(allBGM).length) {
      setBgm(allBGM["ooc-timeline"]);
    }
  }, [lockout]);

  const handleTrack = (track) => {
    if (!mainData.sound._src.includes(track)) {
      mainData.stop();
      setBgm(allBGM[track]);
    }
  };

  const [playWarpBGM, warpData] = useSound("/assets/audio/bgm/warp-loop.mp3", {
    loop: true,
  });

  useEffect(() => {
    if (!mainData) return;
    if (!sound) {
      mainData.pause();
      warpData.stop();
      return;
    }

    let mainTimeout;
    let warpTimeout;

    if (content === "main") {
      if (!mainData.sound.playing()) {
        mainData.sound.fade(0, 1, 500);
        playMainBGM();
      }
    } else if (content === "single") {
      if (warpData.sound.playing()) return;
      playWarpBGM();
      warpData.sound.fade(0, 1, 500);
    }
    return () => {
      if (content === "main") clearTimeout(warpTimeout);

      if (content === "video") {
        clearTimeout(warpTimeout);
        clearTimeout(mainTimeout);
      }
      if (currentWarp.length !== 10 && content === "single") {
        clearTimeout(warpTimeout);
        warpData.sound.fade(1, 0, 500);
        warpTimeout = setTimeout(() => {
          warpData.stop();
        }, 500);
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
    mainData,
    currentWarp.length,
    playMainBGM,
    playWarpBGM,
    warpData,
  ]);

  const [showDB, setShowDB] = useState(false);

  const [DBType, setDBType] = useState("char");

  return (
    <ResizeProvider value={resizeValue}>
      <SoundProvider value={soundValue}>
        <div className="App">
          <AnimatePresence>
            {content === "main" && (
              <Main
                lockout={lockout < Object.keys(allBGM).length}
                bannerType={bannerType}
                showDB={showDB}
                setShowDB={setShowDB}
                setBannerType={setBannerType}
                setNewItems={setNewItems}
                setHasFive={setHasFive}
                setHasFour={setHasFour}
                setContent={setContent}
                setCurrentWarp={setCurrentWarp}
                setDBType={setDBType}
                bgm={[mainData ? mainData.sound._src : undefined, handleTrack]}
              />
            )}
            {content === "video" && (
              <WarpVideo
                rarity={hasFive ? "five" : hasFour ? "four" : "three"}
                event={bannerType === "char" || bannerType === "weap"}
                onEnded={() => {
                  setContent("single");
                }}
                mainBGM={{ playMainBGM, mainData }}
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
