import { LazyLoadImage } from "react-lazy-load-image-component";

export default function PhonoTrack({
  track,
  handleSelect,
  actual,
  filler,
  chosen,
}) {
  return (
    <div
      onClick={handleSelect}
      className="phono-track m-2 d-flex justify-content-start align-items-center"
      chosen={chosen.toString()}
      filler={filler.toString()}
    >
      {!chosen ? (
        <LazyLoadImage
          alt="Play Button"
          effect="opacity"
          draggable="false"
          width={44}
          src="assets/phono/play.webp"
        />
      ) : (
        <div
          className="d-flex align-items-end justify-content-center"
          style={{ width: 44 }}
        >
          <div className="play-bar small left" />
          <div className="play-bar big left" />
          <div className="play-bar big right" />
          <div className="play-bar small right" />
        </div>
      )}
      {track}
      {actual && (
        <LazyLoadImage
          alt="Current BGM"
          effect="opacity"
          className="current-icon"
          draggable="false"
          src="assets/phono/current.webp"
          style={{ position: "absolute", top: "10%", right: "2%" }}
        />
      )}
    </div>
  );
}
