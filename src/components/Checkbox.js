import { useContext } from "react";
import SoundContext from "./context/SoundContext";

export default function Checkbox({
  className = "",
  handleCheck,
  checked,
  text,
}) {
  const { sound, useSound } = useContext(SoundContext);

  const [playToggleOn] = useSound("/assets/audio/sfx/toggle-on.mp3", {
    volume: 0.9,
  });
  const [playToggleOff] = useSound("/assets/audio/sfx/toggle-off.mp3");

  return (
    <div
      className={
        "d-flex justify-content-between align-items-center px-2 checkbox " +
        className
      }
      style={{
        borderRadius: 50,
      }}
      onClick={() => {
        handleCheck();
        if (sound) {
          if (checked) playToggleOff();
          else playToggleOn();
        }
      }}
    >
      {text}
      <input
        checked={checked}
        type="checkbox"
        onChange={() => {}}
        style={{
          accentColor: "#f29d38",
        }}
      />
    </div>
  );
}
