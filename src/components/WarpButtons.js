import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import ResizeContext from "./ResizeContext";
import { useTranslation } from "react-i18next";

const WarpButtons = ({ onWarp, event }) => {
  const { getWidth } = useContext(ResizeContext);
  const [play] = useSound("/assets/audio/sfx/button-select.mp3");
  const { sound } = useContext(SoundContext);
  const { i18n } = useTranslation();
  if (event === "beginner")
    return (
      <div id="warp-button-ten-hover">
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
      </div>
    );
  else
    return (
      <React.Fragment>
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
            alt={event === "standard" ? "10 event warps" : "10 standard warps"}
            width={getWidth(280)}
            draggable="false"
          />
        </div>
      </React.Fragment>
    );
};

export default WarpButtons;
