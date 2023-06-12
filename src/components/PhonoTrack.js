import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Spinner from "react-bootstrap/Spinner";

export default function PhonoTrack({
  track,
  handleSelect,
  actual,
  filler,
  chosen,
  muted,
  loaded,
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
          {muted ? (
            <div style={{ width: 15, height: 15, backgroundColor: "black" }} />
          ) : !loaded ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <React.Fragment>
              <div className="play-bar small left" />
              <div className="play-bar big left" />
              <div className="play-bar big right" />
              <div className="play-bar small right" />
            </React.Fragment>
          )}
        </div>
      )}
      <div className="position-relative track-name" chosen={chosen.toString()}>
        {track}
      </div>
      <LazyLoadImage
        alt="Current BGM"
        effect="opacity"
        className="back-icon"
        draggable="false"
        src="assets/phono/back-icon.webp"
        chosen={chosen.toString()}
      />
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
