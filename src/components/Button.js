import { useContext } from "react";
import ResizeContext from "./context/ResizeContext";
import SoundContext from "./context/SoundContext";

export default function Button({
  style,
  content,
  onClick,
  className = "",
  size = "lg",
  cancel = false,
  disabled = false,
  resize = true,
  roundSize = null,
  muted = false,
}) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { sound, useSound } = useContext(SoundContext);
  const [playSelect] = useSound("/assets/audio/sfx/button-select.mp3");
  const [playCancel] = useSound("/assets/audio/sfx/button-cancel.mp3");

  const handleClick = () => {
    if (sound && !muted) {
      if (cancel) playCancel();
      else playSelect();
    }
    onClick();
  };

  const fontSize = {
    sm: resize ? getWidth(12) : 12,
    md: resize ? getWidth(16) : 16,
    lg: resize ? getWidth(22) : 22,
  };

  const buttonSizes = {
    sm: {
      outerWidth: resize ? getWidth(100) : 100,
      outerHeight: resize ? getHeight(40, 100) : 40,
      innerWidth: resize ? getWidth(95) : 95,
      innerHeight: resize ? getHeight(35, 95) : 35,
    },
    md: {
      outerWidth: resize ? getWidth(180) : 180,
      outerHeight: resize ? getHeight(44, 180) : 44,
      innerWidth: resize ? getWidth(175) : 175,
      innerHeight: resize ? getHeight(39, 175) : 39,
    },
    lg: {
      outerWidth: resize ? getWidth(240) : 240,
      outerHeight: resize ? getHeight(48, 240) : 48,
      innerWidth: resize ? getWidth(235) : 235,
      innerHeight: resize ? getHeight(43, 235) : 43,
    },
  };

  return (
    <div
      className={`custom-button ${disabled && "disabled"} ${className}`}
      onClick={handleClick}
      style={{
        ...style,
        width: roundSize ? roundSize : buttonSizes[size]["outerWidth"],
        height: roundSize ? roundSize : buttonSizes[size]["outerHeight"],
      }}
    >
      <div
        className="button-outline"
        style={{
          width: roundSize
            ? roundSize - getWidth(8)
            : buttonSizes[size]["innerWidth"],
          height: roundSize
            ? roundSize - getWidth(8)
            : buttonSizes[size]["innerHeight"],
          border: `${getWidth(2, 1)}px solid #d2d1d6`,
        }}
      >
        <div
          className="button-text"
          style={{ fontSize: `${fontSize[size]}px`, width: "100%" }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
