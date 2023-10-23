import { useContext, useState } from "react";
import SoundContext from "./context/SoundContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LATESTVERS, json } from "../util/Constants";
import ResizeContext from "./context/ResizeContext";

const MiniBanner = ({ path, active, handleSelect }) => {
  const [clicked, setClicked] = useState(false);
  const { getWidth, getHeight } = useContext(ResizeContext);
  return (
    <div
      className="position-relative"
      style={{
        height: getHeight(105, 180, 45.9375),
        width: getWidth(180, 78.75),
        marginBottom: `-${getWidth(15)}px`,
      }}
    >
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner-img-active"
        alt="mini character banner active"
        src={`../assets/banner/mini/${path}-active.webp`}
        width={getWidth(180, 78.75)}
        draggable="false"
        active={active}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner-img"
        alt="mini character banner"
        src={`../assets/banner/mini/${path}.webp`}
        width={getWidth(160, 70)}
        draggable="false"
        active={active}
        onClick={handleSelect}
        onMouseDown={() => setClicked(true)}
        onMouseUp={() => setClicked(false)}
        onMouseLeave={() => setClicked(false)}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner-highlight"
        src="../assets/banner/mini/highlight.webp"
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

const bannerTypes = [
  "beginner",
  "char",
  "weap",
  "rerun-char",
  "rerun-weap",
  "standard",
];
export default function MiniBanners({
  bannerType,
  setBannerType,
  hasBeginner = true,
}) {
  const { sound, useSound } = useContext(SoundContext);
  const vers = sessionStorage.getItem("vers") || LATESTVERS;

  const [playMini] = useSound("../assets/audio/sfx/mini-select.mp3", {
    volume: 0.7,
  });

  const [lockout, setLockout] = useState(false);

  const handleBannerSelect = (type) => {
    if (!lockout) {
      if (sound) playMini();
      setLockout(true);
      setBannerType(type);
      sessionStorage.setItem("bannerType", type);
      setTimeout(() => setLockout(false), 300);
    }
  };

  return (
    <div className="mini-banners">
      {bannerTypes
        .filter((type) => {
          if (!hasBeginner) return type !== "beginner";
          return type;
        })
        .filter((type) => {
          if (!json.checkRerun(vers)) return !type.includes("rerun");
          return type;
        })
        .map((type) => {
          return (
            <MiniBanner
              key={type}
              handleSelect={() => {
                handleBannerSelect(type);
              }}
              active={(type === bannerType).toString()}
              path={
                ["char", "weap"].includes(type)
                  ? vers + "/" + type
                  : type.includes("rerun")
                  ? json.getRerun(vers) +
                    "/" +
                    (type.includes("char") ? "char" : "weap")
                  : type
              }
            />
          );
        })}
    </div>
  );
}
