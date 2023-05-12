import { useContext } from "react";
import SoundContext from "./SoundContext";
import useSound from "use-sound";

const CloseButton = ({ resize, onClose, style }) => {
  const [play] = useSound("/assets/audio/sfx/close-button.mp3");
  const { sound } = useContext(SoundContext);
  return (
    <div
      className="close-button"
      style={{
        ...style,
        width: resize.getWidth(70),
        height: resize.getWidth(70),
        paddingLeft: resize.getWidth(12),
      }}
      onClick={() => {
        onClose();
        if (sound) play();
      }}
    >
      <div style={{ marginRight: resize.getWidth(16) }}>
        <div
          className="button-leg top-left"
          style={{
            width: resize.getWidth(6),
            height: resize.getHeight(38, 6),
            marginBottom: resize.getWidth(10),
          }}
        />
        <div
          className="button-leg bottom-right"
          style={{
            width: resize.getWidth(6),
            height: resize.getHeight(38, 6),
          }}
        />
      </div>
      <div>
        <div
          id="button-dot"
          style={{
            width: resize.getWidth(10),
            height: resize.getWidth(10),
          }}
        />
      </div>
      <div style={{ marginLeft: resize.getWidth(16) }}>
        <div
          className="button-leg top-right"
          style={{
            width: resize.getWidth(6),
            height: resize.getHeight(38, 6),
            marginBottom: resize.getWidth(10),
          }}
        />
        <div
          className="button-leg bottom-left"
          style={{
            width: resize.getWidth(6),
            height: resize.getHeight(38, 6),
          }}
        />
      </div>
    </div>
  );
};

export default CloseButton;
