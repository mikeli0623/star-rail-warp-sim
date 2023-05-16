import { useContext } from "react";
import { json } from "../classes/Constants";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function VersionInfo({ isCurrentSelected, vers, setSelected }) {
  const { sound } = useContext(SoundContext);
  const [playSelect] = useSound("/assets/audio/sfx/version-select.mp3");
  const [playRepeat] = useSound("../assets/audio/sfx/version-repeat.mp3");

  const handleClick = () => {
    if (sound) {
      if (isCurrentSelected) playRepeat();
      else playSelect();
    }
    setSelected(vers);
  };

  const cleanText = (text) => {
    return text
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div
      className={`vers-info ${isCurrentSelected && "highlight"}`}
      onClick={handleClick}
    >
      <LazyLoadImage
        alt={`Version ${vers} Icon`}
        effect="opacity"
        className="vers-icon"
        src={`./assets/banner/mini/${vers}/char-active.webp`}
      />
      <div className="vers-info-text">
        <div style={{ color: isCurrentSelected ? "white" : "black" }}>
          Version: {vers}
        </div>
        <div style={{ color: isCurrentSelected ? "#7d7d7d" : "#4F4F4F" }}>
          Character Event:{" "}
          <span style={{ color: isCurrentSelected ? "#bebebe" : "#868686" }}>
            {cleanText(json.getRateUpFive(vers, "char")[0])}
          </span>
        </div>
        <div style={{ color: isCurrentSelected ? "#7d7d7d" : "#4F4F4F" }}>
          Weapon Event:{" "}
          <span style={{ color: isCurrentSelected ? "#bebebe" : "#868686" }}>
            {cleanText(json.getRateUpFive(vers, "weap")[0])}
          </span>
        </div>
      </div>
    </div>
  );
}
