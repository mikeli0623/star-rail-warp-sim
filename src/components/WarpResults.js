import { img_path, json } from "../classes/Constants";
import CloseButton from "./CloseButton";

const WarpResult = ({ warp, style, getWidth, getHeight }) => {
  return (
    <div className="warp-result-hover">
      <div
        className={`warp-result`}
        rarity={warp ? json.getRarity(warp) : 0}
        style={{
          ...style,
          backgroundImage: `url(${img_path["warpResult"]}${warp}.webp)`,
          width: getWidth(440),
          height: getHeight(230, 440),
          backgroundSize: `${getWidth(440)}px ${getHeight(230, 440)}px`,
        }}
      />
    </div>
  );
};

const WarpResults = ({ setContent, currentWarp, getWidth, getHeight }) => {
  return (
    <section
      id="warp-result-container"
      style={{ backgroundImage: "url(../assets/warp-result.webp)" }}
    >
      <CloseButton
        getWidth={getWidth}
        getHeight={getHeight}
        onClose={() => setContent("main")}
        style={{ top: 0, right: 0, transform: "translate(-30%, 50%)" }}
      />
      <div className="warp-results top">
        <WarpResult
          warp={currentWarp[0]}
          style={{
            marginTop: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[0]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.5s 1`,
            animationDelay: "200ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          getWidth={getWidth}
          getHeight={getHeight}
        />
        <WarpResult
          warp={currentWarp[1]}
          style={{
            marginBottom: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[1]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.5s 1`,
            animationDelay: "100ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          getWidth={getWidth}
          getHeight={getHeight}
        />
        <WarpResult
          warp={currentWarp[2]}
          style={{
            marginTop: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[2]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.5s 1`,
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          getWidth={getWidth}
          getHeight={getHeight}
        />
        <WarpResult warp={""} getWidth={getWidth} getHeight={getHeight} />
      </div>
      <div className="warp-results middle">
        <WarpResult
          warp={currentWarp[3]}
          style={{
            animation: `${
              json.getRarity(currentWarp[3]) !== 3
                ? "animate-result-middle"
                : "animate-three-middle"
            } 1.5s 1`,
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          getWidth={getWidth}
          getHeight={getHeight}
        />
        <WarpResult
          warp={currentWarp[4]}
          style={{
            animation: `${
              json.getRarity(currentWarp[4]) !== 3
                ? "animate-result-middle"
                : "animate-three-middle"
            } 1.5s 1`,
            animationDelay: "100ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          getWidth={getWidth}
          getHeight={getHeight}
        />
        <WarpResult
          warp={currentWarp[5]}
          style={{
            animation: `${
              json.getRarity(currentWarp[5]) !== 3
                ? "animate-result-middle"
                : "animate-three-middle"
            } 1.5s 1`,
            animationDelay: "200ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          getWidth={getWidth}
          getHeight={getHeight}
        />
        <WarpResult
          warp={currentWarp[6]}
          style={{
            animation: `${
              json.getRarity(currentWarp[6]) !== 3
                ? "animate-result-middle"
                : "animate-three-middle"
            } 1.5s 1`,
            animationDelay: "300ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          getWidth={getWidth}
          getHeight={getHeight}
        />
      </div>
      <div className="warp-results bottom">
        <WarpResult warp={""} getWidth={getWidth} getHeight={getHeight} />
        <WarpResult
          warp={currentWarp[7]}
          style={{
            marginBottom: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[7]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.5s 1`,
            animationDelay: "200ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          getWidth={getWidth}
          getHeight={getHeight}
        />
        <WarpResult
          warp={currentWarp[8]}
          style={{
            marginTop: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[8]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.5s 1`,
            animationDelay: "100ms",
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          getWidth={getWidth}
          getHeight={getHeight}
        />
        <WarpResult
          warp={currentWarp[9]}
          style={{
            marginBottom: getWidth(10),
            animation: `${
              json.getRarity(currentWarp[9]) !== 3
                ? "animate-result"
                : "animate-three"
            } 1.5s 1`,
            animationTimingFunction: "cubic-bezier(.12,1,.06,1)",
            animationFillMode: "both",
          }}
          getWidth={getWidth}
          getHeight={getHeight}
        />
      </div>
    </section>
  );
};

export default WarpResults;
