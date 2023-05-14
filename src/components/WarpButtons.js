import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSound from "use-sound";
import SoundContext from "./SoundContext";

const WarpButtons = ({ onWarp, event, resize }) => {
  const [play] = useSound("/assets/audio/sfx/button-select.mp3");
  const { sound } = useContext(SoundContext);

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
          src={"./assets/beginner-10.webp"}
          alt={"10 beginner warps"}
          width={resize.getWidth(300)}
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
            src={
              event === "standard"
                ? "./assets/standard-1.webp"
                : "./assets/event-1.webp"
            }
            alt={event === "standard" ? "1 standard warp" : "1 event warp"}
            width={resize.getWidth(240)}
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
            src={
              event === "standard"
                ? "./assets/standard-10.webp"
                : "./assets/event-10.webp"
            }
            alt={event === "standard" ? "10 event warps" : "10 standard warps"}
            width={resize.getWidth(240)}
            draggable="false"
          />
        </div>
      </React.Fragment>
    );
};

export default WarpButtons;
