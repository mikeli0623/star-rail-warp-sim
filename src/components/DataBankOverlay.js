import "../css/DataBank.css";
import React, { useState, useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import ResizeContext from "./ResizeContext";

export default function DataBankOverlay({
  handleSelect = () => {},
  handleClose = () => {},
}) {
  const { getWidth } = useContext(ResizeContext);
  // const { sound } = useContext(SoundContext);
  const sound = true;

  const [playLoad] = useSound("../assets/audio/sfx/db-load.mp3");
  const [playSelect] = useSound("../assets/audio/sfx/db-select.mp3");

  return (
    <div id="db-back" onClick={handleClose}>
      <LazyLoadImage
        className="db-type-icon"
        effect="opacity"
        alt="Characters Icon"
        src="/assets/db-char-icon.webp"
        onClick={() => {
          if (sound) playSelect();
          handleSelect("char");
        }}
        draggable="false"
      />
      <LazyLoadImage
        className="db-type-icon"
        effect="opacity"
        alt="Light Cones Icon"
        src="/assets/db-weap-icon.webp"
        onClick={() => {
          if (sound) playSelect();
          handleSelect("weap");
        }}
        draggable="false"
      />
    </div>
  );
}
