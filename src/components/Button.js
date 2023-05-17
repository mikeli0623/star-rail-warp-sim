import { useContext } from "react";
import ResizeContext from "./ResizeContext";
import SoundContext from "./SoundContext";
import useSound from "use-sound";

export default function Button({
  style,
  text,
  onClick,
  size = "md",
  cancel = false,
  disabled = false,
  resize = true,
}) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const [playSelect] = useSound("/assets/audio/sfx/button-select.mp3");
  const [playCancel] = useSound("/assets/audio/sfx/button-cancel.mp3");
  const { sound } = useContext(SoundContext);

  const handleClick = () => {
    if (sound) {
      if (cancel) playCancel();
      else playSelect();
    }
    onClick();
  };

  const fontSize = {
    sm: resize ? getWidth(14) : 14,
    md: resize ? getWidth(24) : 24,
    lg: resize ? getWidth(36) : 36,
  };

  const buttonSizes = {
    sm: {
      outerWidth: resize ? getWidth(100) : 100,
      outerHeight: resize ? getHeight(40, 100) : 40,
      innerWidth: resize ? getWidth(95) : 95,
      innerHeight: resize ? getHeight(35, 95) : 35,
    },
    md: {
      outerWidth: resize ? getWidth(240) : 240,
      outerHeight: resize ? getHeight(48, 240) : 48,
      innerWidth: resize ? 235 : 235,
      innerHeight: resize ? getHeight(43, 235) : 43,
    },
  };

  return (
    <div
      className={`custom-button ${disabled && "disabled"}`}
      onClick={handleClick}
      style={{
        ...style,
        width: buttonSizes[size]["outerWidth"],
        height: buttonSizes[size]["outerHeight"],
      }}
    >
      <div
        className="button-outline"
        style={{
          width: buttonSizes[size]["innerWidth"],
          height: buttonSizes[size]["innerHeight"],
        }}
      >
        <div
          className="button-text"
          style={{ fontSize: `${fontSize[size]}px`, width: "100%" }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
