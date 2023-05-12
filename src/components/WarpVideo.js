import { useContext } from "react";
import SoundContext from "./SoundContext";
import CloseButton from "./CloseButton";

const WarpVideo = ({ src, onEnded, resize }) => {
  const { sound } = useContext(SoundContext);
  return (
    <section id="video-container">
      <CloseButton resize={resize} onClose={onEnded} />
      <video autoPlay onEnded={onEnded} muted={!sound}>
        <source src={src} type="video/webm" />
      </video>
    </section>
  );
};

export default WarpVideo;
