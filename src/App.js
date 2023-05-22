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
        mainData.sound.fade(0, 1, 2000);
        playMainBGM();
      }
    } else if (content === "single") {
      if (warpData.sound.playing()) return;
      playWarpBGM();
      warpData.sound.fade(0, 1, 1000);
    }
    return () => {
      if (content === "main") clearTimeout(warpTimeout);

      if (content === "video") {
        clearTimeout(warpTimeout);
        clearTimeout(mainTimeout);
      }
      if (!hasFive && !hasFour && content === "single") {
        clearTimeout(warpTimeout);
        warpData.sound.fade(1, 0, 1000);
        warpTimeout = setTimeout(() => {
          warpData.stop();
        }, 1000);
      }
      if (content === "results") {
        clearTimeout(warpTimeout);
        warpData.sound.fade(1, 0, 1000);
        warpTimeout = setTimeout(() => {
          warpData.stop();
        }, 1000);
      }
    };
  }, [
    content,
    sound,
    playMainBGM,
    mainData,
    playWarpBGM,
    warpData,
    hasFive,
    hasFour,
  ]);

  const [showDB, setShowDB] = useState(false);

  const [DBType, setDBType] = useState("char");

  const [fancy, setFancy] = useState(false);

  return (
    <ResizeProvider value={resizeValue}>
      <SoundProvider value={soundValue}>
        <div className="App">
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
              fancy={fancy}
              setFancy={setFancy}
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
              newItems={newItems}
              setNewItems={setNewItems}
              setContent={setContent}
              fancy={fancy}
            />
          )}
          {content === "results" && (
            <React.Fragment>
              <img
                className="ring"
                src="/assets/rings.webp"
                alt="rings"
                width={resizeValue.getWidth(550)}
              />
              <WarpResults
                currentWarp={currentWarp}
                newItems={newItems}
                onClose={() => {
                  setContent("main");
                  setNewItems([]);
                }}
              />
            </React.Fragment>
          )}
          {content === "data-bank" && (
            <DataBank
              type={DBType}
              setContent={setContent}
              setShowDB={setShowDB}
            />
          )}
        </div>
      </SoundProvider>
    </ResizeProvider>
  );
}

export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <App />
    </Suspense>
  );
}
