import { useContext, useState } from "react";
import SoundContext from "./context/SoundContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ResizeContext from "./context/ResizeContext";

const MiniMiniBanner = ({ path, active, handleSelect, lockout }) => {
  const [clicked, setClicked] = useState(false);
  const [showShine, setShowShine] = useState(false);
  const { getWidth, getHeight } = useContext(ResizeContext);

  return (
    <div
      className="position-relative"
      style={{
        height: getHeight(90, 180, 20),
        width: getWidth(180, 78.75),
      }}
    >
      {showShine && (
        <div
          className="shine-container"
          style={{
            // top: getWidth(38, 21.22),
            height: getHeight(50, 174, 21.69, 76),
            width: getWidth(174, 76),
          }}
        >
          <div className="shine" onAnimationEnd={() => setShowShine(false)} />
        </div>
      )}
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner-img-active"
        alt="mini character banner active"
        src={`../assets/banner/mini/mini-mini/${path}-active.webp`}
        width={getWidth(180, 78.75)}
        draggable="false"
        active={active}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-mini-banner-img"
        alt="mini character banner"
        src={`../assets/banner/mini/mini-mini/${path}.webp`}
        width={getWidth(160, 70)}
        draggable="false"
        active={active}
        onClick={() => {
          if (!lockout) {
            setShowShine(true);
            handleSelect();
          }
        }}
        onMouseDown={() => setClicked(true)}
        onMouseUp={() => setClicked(false)}
        onMouseLeave={() => setClicked(false)}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-mini-banner-highlight"
        src="../assets/banner/mini/mini-mini/highlight.webp"
        alt="highlight"
        draggable="false"
        width={getWidth(160, 70)}
        style={{
          opacity: `${clicked ? 1 : 0}`,
        }}
        active={active}
      />
    </div>
  );
};

export default function MiniMiniBanners({ pool, handleSelect, rerunVersion }) {
  const { sound, useSound } = useContext(SoundContext);
  const { getWidth, getHeight } = useContext(ResizeContext);

  const [playMini] = useSound("../assets/audio/sfx/mini-select.mp3", {
    volume: 0.7,
  });

  const [lockout, setLockout] = useState(false);

  const handleBannerSelect = (i) => {
    if (!lockout) {
      if (sound) playMini();
      setLockout(true);
      handleSelect(i);
      setTimeout(() => setLockout(false), 500);
    }
  };

  return (
    <div
      className="mini-mini-banners"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-285%, -50%)",
        height: getHeight(270, 180),
        width: getWidth(180),
      }}
    >
      {pool.map((item, i) => {
        return (
          <MiniMiniBanner
            key={item}
            handleSelect={() => {
              handleBannerSelect(i);
            }}
            lockout={lockout}
            active={(i === rerunVersion).toString()}
            path={item}
          />
        );
      })}
    </div>
  );
}
