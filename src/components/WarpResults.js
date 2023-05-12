import { img_path, json } from "../classes/Constants";
import CloseButton from "./CloseButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

const WarpResult = ({ warp, isNew, style, resize }) => {
  return (
    <div className="warp-result-hover">
      <LazyLoadImage
        className={warp === "" ? "transparent" : "warp-result"}
        src={`${img_path["warpResult"]}${warp}.webp`}
        rarity={warp ? json.getRarity(warp) : 0}
        width={resize.getWidth(440)}
        height={resize.getHeight(230, 440)}
        style={{
          ...style,
        }}
      />
      {isNew && (
        <LazyLoadImage
          className="warp-results-new-tag"
          alt="new tag"
          src="/assets/new.webp"
          width={resize.getWidth(90)}
          style={{ ...style }}
        />
      )}
    </div>
  );
};

const WarpResults = ({ currentWarp, newItems, onClose, resize }) => {
  return (
    <section
      id="warp-result-container"
      style={{ backgroundImage: "url(../assets/warp-result.webp)" }}
    >
      <CloseButton resize={resize} onClose={onClose} />
      <div className="warp-results top">
        <WarpResult
          warp={currentWarp[0]}
          isNew={newItems.indexOf(currentWarp[0]) !== -1}
          style={{
            marginTop: resize.getWidth(10),
            animation: `${
              json.getRarity(currentWarp[0]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationDelay: "100ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          resize={resize}
        />
        <WarpResult
          warp={currentWarp[1]}
          isNew={newItems.indexOf(currentWarp[1]) !== -1}
          style={{
            marginBottom: resize.getWidth(10),
            animation: `${
              json.getRarity(currentWarp[1]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationDelay: "50ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          resize={resize}
        />
        <WarpResult
          warp={currentWarp[2]}
          isNew={newItems.indexOf(currentWarp[2]) !== -1}
          style={{
            marginTop: resize.getWidth(10),
            animation: `${
              json.getRarity(currentWarp[2]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          resize={resize}
        />
        <WarpResult warp={""} resize={resize} />
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
          resize={resize}
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
          resize={resize}
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
          resize={resize}
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
          resize={resize}
        />
      </div>
      <div className="warp-results bottom">
        <WarpResult warp={""} resize={resize} />
        <WarpResult
          warp={currentWarp[7]}
          isNew={newItems.indexOf(currentWarp[7]) !== -1}
          style={{
            marginBottom: resize.getWidth(10),
            animation: `${
              json.getRarity(currentWarp[7]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationDelay: "100ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          resize={resize}
        />
        <WarpResult
          warp={currentWarp[8]}
          isNew={newItems.indexOf(currentWarp[8]) !== -1}
          style={{
            marginTop: resize.getWidth(10),
            animation: `${
              json.getRarity(currentWarp[8]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationDelay: "50ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          resize={resize}
        />
        <WarpResult
          warp={currentWarp[9]}
          isNew={newItems.indexOf(currentWarp[9]) !== -1}
          style={{
            marginBottom: resize.getWidth(10),
            animation: `${
              json.getRarity(currentWarp[9]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.2s 1`,
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          resize={resize}
        />
      </div>
    </section>
  );
};

export default WarpResults;
