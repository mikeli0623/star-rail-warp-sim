import { useContext, useState, useEffect } from "react";
import SoundContext from "./SoundContext";
import CloseButton from "./CloseButton";

const WarpVideo = ({ src, onEnded, mainBGM, warpBGM }) => {
  const { sound } = useContext(SoundContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded || !sound) return;
    mainBGM.mainData.sound.fade(1, 0, 500);
    let mainTimeout = setTimeout(() => {
      mainBGM.mainData.pause();
    }, 500);
    let warpTimeout = setTimeout(() => {
      warpBGM.playWarpBGM();
      warpBGM.warpData.sound.fade(0, 1, 1000);
    }, 14000);
    return () => {
      clearTimeout(mainTimeout);
      clearTimeout(warpTimeout);
    };
  }, [loaded, sound, mainBGM, warpBGM]);

  return (
    <section id="video-container">
      <CloseButton onClose={onEnded} />
      <video
        autoPlay
        onEnded={onEnded}
        muted={!sound}
        onCanPlayThrough={(e) => {
          if (sound) {
            e.target.volume = 0.5;
            setLoaded(true);
          }
        }}
      >
        <source src={src} type="video/webm" />
      </video>
    </section>
  );
};

export default WarpVideo;
