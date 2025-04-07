import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SoundContext from "./context/SoundContext";
import ResizeContext from "./context/ResizeContext";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

const WarpButtons = ({ onWarp, event }) => {
  const { getWidth } = useContext(ResizeContext);
  const { sound, useSound } = useContext(SoundContext);
  const [play] = useSound("/assets/audio/sfx/button-select.mp3");
  const { i18n } = useTranslation();

  return (
    <AnimatePresence>
      {event === "beginner" && (
        <motion.div
          key="beg-warp-button"
          id="warp-button-ten-hover"
          initial={{ transition: { duration: 0 } }}
          animate={{ transition: { duration: 0 } }}
          exit={{ transition: { duration: 0 } }}
        >
          <LazyLoadImage
            effect="opacity"
            className="warp-button beginner"
            onClick={() => {
              onWarp(10);
              if (sound) play();
            }}
            src={`../assets/warp-buttons/${i18n.resolvedLanguage}/beginner-10.webp`}
            alt={"10 beginner warps"}
            width={getWidth(400)}
            draggable="false"
          />
        </motion.div>
      )}
      {event !== "beginner" && (
        <motion.div
          key="standard-warp-buttons"
          initial={{ transition: { duration: 0 } }}
          animate={{ transition: { duration: 0 } }}
          exit={{ transition: { duration: 0 } }}
        >
          <div id="warp-button-one-hover">
            <LazyLoadImage
              effect="opacity"
              className="warp-button one"
              onClick={() => {
                onWarp(1);
                if (sound) play();
              }}
              src={`../assets/warp-buttons/${i18n.resolvedLanguage}/${
                event === "standard" ? "standard" : "event"
              }-1.webp`}
              alt={event === "standard" ? "1 standard warp" : "1 event warp"}
              width={getWidth(280)}
              draggable="false"
            />
          </div>
          <div id="warp-button-ten-hover">
            <LazyLoadImage
              effect="opacity"
              className="warp-button ten"
              onClick={() => {
                onWarp(10);
                if (sound) play();
              }}
              src={`../assets/warp-buttons/${i18n.resolvedLanguage}/${
                event === "standard" ? "standard" : "event"
              }-10.webp`}
              alt={
                event === "standard" ? "10 event warps" : "10 standard warps"
              }
              width={getWidth(280)}
              draggable="false"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WarpButtons;
