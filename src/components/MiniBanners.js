import React, { useState, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import ResizeContext from "./ResizeContext";

const MiniBanners = ({
  vers,
  bannerType: currentBannerType,
  setBannerType,
  setDirection,
  hasBeginner,
}) => {
  const [highlightIndex, setHighlightIndex] = useState(null);

  const [play] = useSound("../assets/audio/sfx/mini-select.mp3", {
    volume: 0.6,
  });

  const { sound } = useContext(SoundContext);

  const { getWidth } = useContext(ResizeContext);

  const setActiveBanner = (banner) => {
    if (sound) play();

    const bannerValue = {
      beginner: 0,
      char: hasBeginner ? 1 : 0,
      weap: hasBeginner ? 2 : 1,
      standard: hasBeginner ? 3 : 2,
    };

    let edgeBanner =
      (bannerValue[currentBannerType] === 0 &&
        bannerValue[banner] === (hasBeginner ? 3 : 2)) ||
      (bannerValue[currentBannerType] === (hasBeginner ? 3 : 2) &&
        bannerValue[banner] === 0)
        ? true
        : false;
    console.log(edgeBanner);
    if (bannerValue[currentBannerType] - bannerValue[banner] < 0) {
      if (edgeBanner) setDirection("up");
      else setDirection("down");
    } else {
      if (edgeBanner) setDirection("down");
      else setDirection("up");
    }
    setBannerType(banner);
  };

  return (
    <React.Fragment>
      {hasBeginner && (
        <React.Fragment>
          <LazyLoadImage
            effect="opacity-200"
            className="mini-banner"
            alt="mini beginner banner"
            src={`../assets/banner/mini/beginner.webp`}
            width={getWidth(160, 70)}
            style={{
              transform: `translateY(180%)`,
              opacity: `${currentBannerType === "beginner" ? 0 : 1}`,
            }}
            onClick={() => {
              setActiveBanner("beginner");
            }}
            draggable="false"
            onMouseDown={() => {
              if (highlightIndex !== 0) setHighlightIndex(0);
            }}
            onMouseUp={() => {
              setHighlightIndex(null);
            }}
            onMouseLeave={() => {
              setHighlightIndex(null);
            }}
          />
          <LazyLoadImage
            effect="opacity-200"
            className="mini-banner active"
            alt="mini beginner banner active"
            src={`../assets/banner/mini/beginner-active.webp`}
            width={getWidth(180, 78.75)}
            style={{
              transform: `translateY(95%)`,
              opacity: `${currentBannerType === "beginner" ? 1 : 0}`,
              pointerEvents: "none",
            }}
            draggable="false"
          />
        </React.Fragment>
      )}
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner active"
        alt="mini character banner active"
        src={`../assets/banner/mini/${vers}/char-active.webp`}
        width={getWidth(180, 78.75)}
        style={{
          transform: hasBeginner ? `translateY(155%)` : `translateY(80%)`,
          opacity: `${currentBannerType === "char" ? 1 : 0}`,
          pointerEvents: "none",
        }}
        draggable="false"
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner"
        alt="mini character banner"
        src={`../assets/banner/mini/${vers}/char.webp`}
        width={getWidth(160, 70)}
        style={{
          transform: hasBeginner ? `translateY(320%)` : "translateY(190%)",
          opacity: `${currentBannerType === "char" ? 0 : 1}`,
        }}
        onClick={() => setActiveBanner("char")}
        draggable="false"
        onMouseDown={() => {
          if (hasBeginner) {
            if (highlightIndex !== 1) setHighlightIndex(1);
          } else if (highlightIndex !== 0) setHighlightIndex(0);
        }}
        onMouseUp={() => {
          setHighlightIndex(null);
        }}
        onMouseLeave={() => {
          setHighlightIndex(null);
        }}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner active"
        alt="mini weapon banner active"
        src={`../assets/banner/mini/${vers}/weap-active.webp`}
        width={getWidth(180, 78.75)}
        style={{
          transform: hasBeginner ? `translateY(305%)` : "translateY(210%)",
          opacity: `${currentBannerType === "weap" ? 1 : 0}`,
          pointerEvents: "none",
        }}
        draggable="false"
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner"
        alt="mini weapon banner"
        src={`../assets/banner/mini/${vers}/weap.webp`}
        width={getWidth(160, 70)}
        style={{
          transform: hasBeginner ? `translateY(470%)` : "translateY(330%)",
          opacity: `${currentBannerType === "weap" ? 0 : 1}`,
        }}
        onClick={() => setActiveBanner("weap")}
        draggable="false"
        onMouseDown={() => {
          if (hasBeginner) {
            if (highlightIndex !== 2) setHighlightIndex(2);
          } else if (highlightIndex !== 1) setHighlightIndex(1);
        }}
        onMouseUp={() => {
          setHighlightIndex(null);
        }}
        onMouseLeave={() => {
          setHighlightIndex(null);
        }}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner active"
        alt="mini standard banner active"
        src={`../assets/banner/mini/standard-active.webp`}
        width={getWidth(180, 78.75)}
        style={{
          transform: hasBeginner ? `translateY(445%)` : "translateY(335%)",
          opacity: `${currentBannerType === "standard" ? 1 : 0}`,
        }}
        draggable="false"
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner"
        alt="mini standard banner"
        src={`../assets/banner/mini/standard.webp`}
        width={getWidth(160, 70)}
        style={{
          transform: hasBeginner ? `translateY(620%)` : "translateY(475%)",
          opacity: `${currentBannerType === "standard" ? 0 : 1}`,
        }}
        onClick={() => setActiveBanner("standard")}
        draggable="false"
        onMouseDown={() => {
          if (hasBeginner) {
            if (highlightIndex !== 3) setHighlightIndex(3);
          } else if (highlightIndex !== 2) setHighlightIndex(2);
        }}
        onMouseUp={() => {
          setHighlightIndex(null);
        }}
        onMouseLeave={() => {
          setHighlightIndex(null);
        }}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-highlight"
        src="../assets/banner/mini/highlight.webp"
        alt="highlight"
        width={getWidth(160, 70)}
        style={{
          transform: hasBeginner ? "translateY(172%)" : "translateY(180%)",
          opacity: hasBeginner
            ? `${
                highlightIndex === 0 && currentBannerType !== "beginner" ? 1 : 0
              }`
            : `${highlightIndex === 0 && currentBannerType !== "char" ? 1 : 0}`,
        }}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-highlight"
        src="../assets/banner/mini/highlight.webp"
        alt="highlight"
        width={getWidth(160, 70)}
        style={{
          transform: hasBeginner ? "translateY(309%)" : "translateY(315%)",
          opacity: hasBeginner
            ? `${highlightIndex === 1 && currentBannerType !== "char" ? 1 : 0}`
            : `${highlightIndex === 1 && currentBannerType !== "weap" ? 1 : 0}`,
        }}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-highlight"
        src="../assets/banner/mini/highlight.webp"
        alt="highlight"
        width={getWidth(160, 70)}
        style={{
          transform: hasBeginner ? "translateY(450%)" : "translateY(455%)",
          opacity: hasBeginner
            ? `${highlightIndex === 2 && currentBannerType !== "weap" ? 1 : 0}`
            : `${
                highlightIndex === 2 && currentBannerType !== "standard" ? 1 : 0
              }`,
        }}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-highlight"
        src="../assets/banner/mini/highlight.webp"
        alt="highlight"
        width={getWidth(160, 70)}
        style={{
          transform: "translateY(595%)",
          opacity: hasBeginner
            ? `${
                highlightIndex === 3 && currentBannerType !== "standard" ? 1 : 0
              }`
            : 0,
        }}
      />
    </React.Fragment>
  );
};

export default MiniBanners;
