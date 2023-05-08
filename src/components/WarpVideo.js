import CloseButton from "./CloseButton";

const WarpVideo = ({ src, onEnded, getWidth, getHeight }) => {
  return (
    <section id="video-container">
      <CloseButton
        getWidth={getWidth}
        getHeight={getHeight}
        onClose={onEnded}
        style={{ top: 0, right: 0, transform: "translate(-30%, 50%)" }}
      />
      <video autoPlay onEnded={onEnded} muted>
        <source src={src} type="video/webm" />
      </video>
    </section>
  );
};

export default WarpVideo;
