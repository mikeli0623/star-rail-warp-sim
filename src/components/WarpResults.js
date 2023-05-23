import { useContext } from "react";
import { img_path, json } from "../util/Constants";
import CloseButton from "./CloseButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "./ResizeContext";

const WarpResult = ({ warp, isNew, style }) => {
  const { getWidth, getHeight } = useContext(ResizeContext);
  return (
    <div className="warp-result-hover">
      <LazyLoadImage
        className={warp === "" ? "transparent" : "warp-result"}
        src={`${img_path["warpResult"]}${warp}.webp`}
        rarity={warp ? json.getRarity(warp) : 0}
        width={getWidth(440)}
        height={getHeight(230, 440)}
        style={{
          ...style,
        }}
        draggable="false"
      />
      {isNew && (
        <LazyLoadImage
          className="warp-results-new-tag"
          alt="new tag"
          src="/assets/new.webp"
          width={getWidth(90)}
          style={{ ...style }}
          draggable="false"
        />
      )}
    </div>
  );
};

const WarpResults = ({ currentWarp, newItems, onClose }) => {
  const { getWidth } = useContext(ResizeContext);
  return (
    <section
      id="warp-result-container"
      style={{ backgroundImage: "url(../assets/warp-result.webp)" }}
    >
      <CloseButton onClose={onClose} />
      <div className="warp-results top">
        <WarpResult
          warp={currentWarp[0]}
          isNew={newItems.indexOf(currentWarp[0]) !== -1}
          style={{
            marginTop: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[0]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationDelay: "100ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
        />
        <WarpResult
          warp={currentWarp[1]}
          isNew={newItems.indexOf(currentWarp[1]) !== -1}
          style={{
            marginBottom: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[1]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationDelay: "50ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
        />
        <WarpResult
          warp={currentWarp[2]}
          isNew={newItems.indexOf(currentWarp[2]) !== -1}
          style={{
            marginTop: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[2]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
        />
        <WarpResult warp={""} />
      </div>
      <div className="warp-results middle">
        <WarpResult
          warp={currentWarp[3]}
          isNew={newItems.indexOf(currentWarp[3]) !== -1}
          style={{
            animation: `${
              json.getRarity(currentWarp[3]) !== 3
                ? "animate-result-middle"
                : "animate-three-middle"
            } 1.2s 1`,
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
        />
        <WarpResult
          warp={currentWarp[4]}
          isNew={newItems.indexOf(currentWarp[4]) !== -1}
          style={{
            animation: `${
              json.getRarity(currentWarp[4]) !== 3
                ? "animate-result-middle"
                : "animate-three-middle"
            } 1.2s 1`,
            animationDelay: "50ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
        />
        <WarpResult
          warp={currentWarp[5]}
          isNew={newItems.indexOf(currentWarp[5]) !== -1}
          style={{
            animation: `${
              json.getRarity(currentWarp[5]) !== 3
                ? "animate-result-middle"
                : "animate-three-middle"
            } 1.2s 1`,
            animationDelay: "100ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
        />
        <WarpResult
          warp={currentWarp[6]}
          isNew={newItems.indexOf(currentWarp[6]) !== -1}
          style={{
            animation: `${
              json.getRarity(currentWarp[6]) !== 3
                ? "animate-result-middle"
                : "animate-three-middle"
            } 1.2s 1`,
            animationDelay: "150ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
        />
      </div>
      <div className="warp-results bottom">
        <WarpResult warp={""} />
        <WarpResult
          warp={currentWarp[7]}
          isNew={newItems.indexOf(currentWarp[7]) !== -1}
          style={{
            marginBottom: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[7]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationDelay: "100ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
        />
        <WarpResult
          warp={currentWarp[8]}
          isNew={newItems.indexOf(currentWarp[8]) !== -1}
          style={{
            marginTop: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[8]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationDelay: "50ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
        />
        <WarpResult
          warp={currentWarp[9]}
          isNew={newItems.indexOf(currentWarp[9]) !== -1}
          style={{
            marginBottom: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[9]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
        />
      </div>
    </section>
  );
};

export default WarpResults;
