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

  const [sound, setSound] = useState(false);
  const soundValue = { sound, setSound };

  const [lockout, setLockout] = useState(true);

  const [newItems, setNewItems] = useState([]);

  const size = useWindowSize();

  const getWidth = useCallback(
    (width) => {
      return window.innerWidth > 1280 ? width : (size.width * width) / 1280;
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

  const resizeValue = { getWidth, getHeight };

  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);

  const [bgm] = useState(
    // allBGM[Math.floor(Math.random() * allBGM.length)]
    "ooc-timeline"
  );

  const [playMainBGM, mainData] = useSound(`assets/audio/bgm/${bgm}.mp3`, {
    loop: true,
    onload: () => setLockout(false),
    volume: 0.2,
  });

  const [playWarpBGM, warpData] = useSound("/assets/audio/bgm/warp-loop.mp3", {
    loop: true,
  });

  useEffect(() => {
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
    playMainBGM,
    mainData,
    playWarpBGM,
    warpData,
    currentWarp,
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
                lockout={lockout}
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
