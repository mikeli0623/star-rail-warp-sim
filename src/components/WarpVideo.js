import { useContext, useState, useEffect } from "react";
import SoundContext from "./context/SoundContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

const WarpVideo = ({ onEnded, event, warpBGM, rarity }) => {
  const { sound, soundEnabled, setSoundEnabled } = useContext(SoundContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded || !sound) return;
    if (sound && soundEnabled) setSoundEnabled(false);

    let warpTimeout = setTimeout(
      () => {
        warpBGM.playWarpBGM();
        warpBGM.warpData.sound.fade(0, 1, 1500);
      },
      rarity === "five" ? 15500 : 14000
    );
    return () => {
      clearTimeout(warpTimeout);
    };
  }, [loaded, sound, soundEnabled, setSoundEnabled, warpBGM, rarity]);

  return (
    <motion.section
      key="video"
      id="video-container"
      style={{ backgroundColor: loaded ? "white" : "black" }}
    >
      <div className="skip-button" onClick={onEnded}>
        <LazyLoadImage
          className="skip-icon"
          effect="opacity"
          draggable="false"
          src="assets/skip.webp"
        />
      </div>
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
        <source
          src={`assets/${event ? "event" : "normal"}-${rarity}.webm`}
          type="video/webm"
        />
      </video>
    </motion.section>
  );
};

export default WarpVideo;
