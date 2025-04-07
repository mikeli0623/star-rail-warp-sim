import { useContext, useEffect, useState } from "react";
import { json } from "../util/Constants";
import CloseButton from "./CloseButton";
import ResizeContext from "./context/ResizeContext";
import SoundContext from "./context/SoundContext";
import { motion } from "framer-motion";

const WarpResult = ({
  warp,
  isFive,
  isNew,
  animationStyle,
  style = {},
  handleSelect,
}) => {
  const { getWidth, getHeight } = useContext(ResizeContext);

  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="warp-result-hover"
      onClick={handleSelect}
      style={{ margin: `0 ${getWidth(20)}px` }}
    >
      {isFive && (
        <img
          alt="Five Star Back"
          className="warp-result five-back"
          src="../assets/warp-results/five-back.webp"
          width={getWidth(440)}
          height={getHeight(230, 440)}
          style={{
            ...style,
            animation: `animate-five-back 65ms ease-in-out 600ms 6 both, animate-change-out 100ms ease-out 990ms 1 both, ${animationStyle}`,
          }}
          draggable="false"
        />
      )}
      <img
        alt={warp}
        className="warp-result"
        src={`../assets/warp-results/${warp}.webp`}
        rarity={json.getRarity(warp)}
        width={getWidth(440)}
        height={getHeight(230, 440)}
        style={{
          ...style,
          animation:
            (isFive ? "animate-change-in 100ms ease-in 990ms 1 both, " : "") +
            animationStyle,
          opacity: isFive || !loaded ? 0 : 1,
        }}
        onLoad={() => {
          setLoaded(true);
        }}
        draggable="false"
      />
      {isNew && (
        <img
          className="warp-results-new-tag"
          alt="New Tag"
          src="/assets/new.webp"
          width={getWidth(90)}
          style={{
            ...style,
            animation:
              (isFive ? "animate-change-in 100ms ease-in 990ms 1 both, " : "") +
              animationStyle,
            opacity: isFive ? 0 : 1,
          }}
          draggable="false"
        />
      )}
    </div>
  );
};

const WarpResults = ({ currentWarp, newItems, onClose, hasFive }) => {
  const { getWidth } = useContext(ResizeContext);
  const { sound, useSound } = useContext(SoundContext);
  const [playSelectItem] = useSound("../assets/audio/sfx/item-select.mp3");
  const [playResultsNormal] = useSound("./assets/audio/sfx/results.mp3", {
    interrupt: true,
  });
  const [playResultsFive, playFiveData] = useSound(
    "./assets/audio/sfx/five-result.mp3",
    {
      interrupt: true,
    }
  );

  const handleSelect = () => {
    if (sound) playSelectItem();
  };

  useEffect(() => {
    if (sound) {
      if (hasFive) playResultsFive();
      else playResultsNormal();
    }
  }, [sound, hasFive, playResultsFive, playResultsNormal]);

  return (
    <motion.section
      key="results"
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      id="warp-result-container"
      style={{ backgroundImage: "url(../assets/warp-result.webp)" }}
    >
      <img
        className="ring"
        src="/assets/rings.webp"
        alt="rings"
        width={getWidth(550)}
      />
      <div
        onClick={() => {
          onClose();
          playFiveData.stop();
        }}
        className="hack-close"
      />
      <CloseButton
        onClose={() => {
          onClose();
          playFiveData.stop();
        }}
      />
      <div className="warp-results top">
        <div
          onClick={() => {
            onClose();
            playFiveData.stop();
          }}
          className="hack-close"
        />
        <WarpResult
          handleSelect={handleSelect}
          warp={currentWarp[0]}
          reveal
          isFive={json.getRarity(currentWarp[0]) === 5}
          isNew={newItems.indexOf(currentWarp[0]) !== -1}
          animationStyle={`${
            json.getRarity(currentWarp[0]) !== 3
              ? "animate-result"
              : "animate-three"
          } 1.2s cubic-bezier(.12,1,.06,1) 50ms 1 both`}
          style={{
            marginTop: getWidth(10),
          }}
        />
        <WarpResult
          handleSelect={handleSelect}
          warp={currentWarp[1]}
          reveal
          isFive={json.getRarity(currentWarp[1]) === 5}
          isNew={newItems.indexOf(currentWarp[1]) !== -1}
          animationStyle={`${
            json.getRarity(currentWarp[3]) !== 3
              ? "animate-result"
              : "animate-three"
          } 1.2s cubic-bezier(.12,1,.06,1) 25ms 1 both`}
          style={{
            marginBottom: getWidth(10),
          }}
        />
        <WarpResult
          handleSelect={handleSelect}
          warp={currentWarp[2]}
          reveal
          isFive={json.getRarity(currentWarp[2]) === 5}
          isNew={newItems.indexOf(currentWarp[2]) !== -1}
          animationStyle={`${
            json.getRarity(currentWarp[3]) !== 3
              ? "animate-result"
              : "animate-three"
          } 1.2s cubic-bezier(.12,1,.06,1) 0ms 1 both`}
          style={{
            marginTop: getWidth(10),
          }}
        />
      </div>
      <div className="warp-results middle">
        <div
          onClick={() => {
            onClose();
            playFiveData.stop();
          }}
          className="hack-close"
        />
        <WarpResult
          handleSelect={handleSelect}
          warp={currentWarp[3]}
          isMiddle
          reveal
          isFive={json.getRarity(currentWarp[3]) === 5}
          isNew={newItems.indexOf(currentWarp[3]) !== -1}
          animationStyle={`${
            json.getRarity(currentWarp[3]) !== 3
              ? "animate-result-middle"
              : "animate-three-middle"
          } 1.2s cubic-bezier(.12,1,.06,1) 0ms 1 both`}
        />
        <WarpResult
          handleSelect={handleSelect}
          warp={currentWarp[4]}
          isMiddle
          reveal
          isFive={json.getRarity(currentWarp[4]) === 5}
          isNew={newItems.indexOf(currentWarp[4]) !== -1}
          animationStyle={`${
            json.getRarity(currentWarp[4]) !== 3
              ? "animate-result-middle"
              : "animate-three-middle"
          } 1.2s cubic-bezier(.12,1,.06,1) 25ms 1 both`}
        />
        <WarpResult
          handleSelect={handleSelect}
          warp={currentWarp[5]}
          isMiddle
          reveal
          isFive={json.getRarity(currentWarp[5]) === 5}
          isNew={newItems.indexOf(currentWarp[5]) !== -1}
          animationStyle={`${
            json.getRarity(currentWarp[5]) !== 3
              ? "animate-result-middle"
              : "animate-three-middle"
          } 1.2s cubic-bezier(.12,1,.06,1) 50ms 1 both`}
        />
        <WarpResult
          handleSelect={handleSelect}
          warp={currentWarp[6]}
          isMiddle
          reveal
          isFive={json.getRarity(currentWarp[6]) === 5}
          isNew={newItems.indexOf(currentWarp[6]) !== -1}
          animationStyle={`${
            json.getRarity(currentWarp[6]) !== 3
              ? "animate-result-middle"
              : "animate-three-middle"
          } 1.2s cubic-bezier(.12,1,.06,1) 75ms 1 both`}
        />
      </div>
      <div className="warp-results bottom">
        <div
          onClick={() => {
            onClose();
            playFiveData.stop();
          }}
          className="hack-close"
        />
        <WarpResult
          handleSelect={handleSelect}
          warp={currentWarp[7]}
          reveal
          isFive={json.getRarity(currentWarp[7]) === 5}
          isNew={newItems.indexOf(currentWarp[7]) !== -1}
          animationStyle={`${
            json.getRarity(currentWarp[7]) !== 3
              ? "animate-result"
              : "animate-three"
          } 1.2s cubic-bezier(.12,1,.06,1) 50ms 1 both`}
          style={{
            marginBottom: getWidth(10),
          }}
        />
        <WarpResult
          handleSelect={handleSelect}
          warp={currentWarp[8]}
          reveal
          isFive={json.getRarity(currentWarp[8]) === 5}
          isNew={newItems.indexOf(currentWarp[8]) !== -1}
          animationStyle={`${
            json.getRarity(currentWarp[8]) !== 3
              ? "animate-result"
              : "animate-three"
          } 1.2s cubic-bezier(.12,1,.06,1) 25ms 1 both`}
          style={{
            marginTop: getWidth(10),
          }}
        />
        <WarpResult
          handleSelect={handleSelect}
          warp={currentWarp[9]}
          reveal
          isFive={json.getRarity(currentWarp[9]) === 5}
          isNew={newItems.indexOf(currentWarp[9]) !== -1}
          animationStyle={`${
            json.getRarity(currentWarp[9]) !== 3
              ? "animate-result"
              : "animate-three"
          } 1.2s cubic-bezier(.12,1,.06,1) 0ms 1 both`}
          style={{
            marginBottom: getWidth(10),
          }}
        />
      </div>
    </motion.section>
  );
};

export default WarpResults;
