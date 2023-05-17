import "../css/DataBank.css";
import React, { useState, useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import ResizeContext from "./ResizeContext";

export default function DataBank({ type }) {
  const { getWidth } = useContext(ResizeContext);
  const { sound } = useContext(SoundContext);

  const [playLoad] = useSound("../assets/audio/sfx/db-load.mp3");
  const [playSelect] = useSound("../assets/audio/sfx/db-item-select.mp3");
  const [playExit] = useSound("../assets/audio/sfx/db-exit.mp3");

  return (
    <div id="db-back">
      <LazyLoadImage
        effect="opacity"
        alt="Characters Icon"
        src="/assets/db-char-icon.webp"
        onClick={() => {
          if (sound) playSelect();
        }}
      />
      <LazyLoadImage
        effect="opacity"
        alt="Light Cones Icon"
        src="/assets/db-weap-icon.webp"
        onClick={() => {
          if (sound) playSelect();
        }}
      />
    </div>
  );
}
