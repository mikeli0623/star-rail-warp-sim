import CloseButton from "./CloseButton";

const WarpVideo = ({ src, onEnded, resize }) => {
  return (
    <section id="video-container">
      <CloseButton resize={resize} onClose={onEnded} />
      <video autoPlay onEnded={onEnded} muted>
        <source src={src} type="video/webm" />
      </video>
    </section>
  );
};

export default WarpVideo;
