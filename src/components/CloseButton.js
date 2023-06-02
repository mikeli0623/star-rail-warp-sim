import { useContext } from "react";
import SoundContext from "./context/SoundContext";
import ResizeContext from "./context/ResizeContext";

const CloseButton = ({ onClose, style, variant = "light", resize = true }) => {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { sound, useSound } = useContext(SoundContext);
  const [play] = useSound("/assets/audio/sfx/close-button.mp3");

  return (
    <div
      className="close-button"
      style={{
        ...style,
        width: resize ? getWidth(70, 40) : 70,
        height: resize ? getWidth(70, 40) : 70,
        paddingLeft: resize ? getWidth(12, 6.86) : 12,
      }}
      onClick={() => {
        onClose();
        if (sound) play();
      }}
    >
      <div style={{ marginRight: resize ? getWidth(16, 9) : 16 }}>
        <div
          className="button-leg top-left"
          style={{
            width: resize ? getWidth(6, 4) : 6,
            height: resize ? getHeight(38, 6, 22, 4) : 38,
            marginBottom: resize ? getWidth(10) : 10,
            backgroundColor: variant === "dark" && "#0e110e",
          }}
        />
        <div
          className="button-leg bottom-right"
          style={{
            width: resize ? getWidth(6, 4) : 6,
            height: resize ? getHeight(38, 6, 22, 4) : 38,
            backgroundColor: variant === "dark" && "#0e110e",
          }}
        />
      </div>
      <div>
        <div
          id="button-dot"
          style={{
            width: resize ? getWidth(10, 6) : 10,
            height: resize ? getWidth(10, 6) : 10,
            backgroundColor: variant === "dark" && "#0e110e",
          }}
        />
      </div>
      <div style={{ marginLeft: resize ? getWidth(16, 9) : 16 }}>
        <div
          className="button-leg top-right"
          style={{
            width: resize ? getWidth(6, 4) : 6,
            height: resize ? getHeight(38, 6, 22, 4) : 38,
            marginBottom: resize ? getWidth(10) : 10,
            backgroundColor: variant === "dark" && "#0e110e",
          }}
        />
        <div
          className="button-leg bottom-left"
          style={{
            width: resize ? getWidth(6, 4) : 6,
            height: resize ? getHeight(38, 6, 22, 4) : 38,
            backgroundColor: variant === "dark" && "#0e110e",
          }}
        />
      </div>
    </div>
  );
};

export default CloseButton;
