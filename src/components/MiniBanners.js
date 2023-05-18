import React, { useState, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import ResizeContext from "./ResizeContext";

const MiniBanners = ({ vers, bannerType, setBannerType, hasBeginner }) => {
  const [highlightIndex, setHighlightIndex] = useState(null);

  const [play] = useSound("../assets/audio/sfx/mini-select.mp3", {
    volume: 0.6,
  });

  const { sound } = useContext(SoundContext);

  const { getWidth } = useContext(ResizeContext);

  return (
    <React.Fragment>
      {hasBeginner && (
        <React.Fragment>
          <LazyLoadImage
            effect="opacity-200"
            className="mini-banner beginner"
            alt="mini beginner banner"
            src={`../assets/banner/mini/beginner.webp`}
            width={getWidth(160)}
            style={{
              transform: `translateY(180%)`,
              opacity: `${bannerType === "beginner" ? 0 : 1}`,
            }}
            onClick={() => {
              if (bannerType !== "beginner") {
                setBannerType("beginner");
                if (sound) play();
              }
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
            className="mini-banner"
            alt="mini beginner banner active"
            src={`../assets/banner/mini/beginner-active.webp`}
            width={getWidth(180)}
            style={{
              transform: `translateY(95%)`,
              opacity: `${bannerType === "beginner" ? 1 : 0}`,
              pointerEvents: "none",
            }}
            draggable="false"
          />
        </React.Fragment>
      )}
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner"
        alt="mini character banner active"
        src={`../assets/banner/mini/${vers}/char-active.webp`}
        width={getWidth(180)}
        style={{
          transform: hasBeginner ? `translateY(155%)` : `translateY(80%)`,
          opacity: `${bannerType === "char" ? 1 : 0}`,
          pointerEvents: "none",
        }}
        draggable="false"
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner"
        alt="mini character banner"
        src={`../assets/banner/mini/${vers}/char.webp`}
        width={getWidth(160)}
        style={{
          transform: hasBeginner ? `translateY(320%)` : "translateY(190%)",
          opacity: `${bannerType === "char" ? 0 : 1}`,
        }}
        onClick={() => {
          if (bannerType !== "char") {
            setBannerType("char");
            if (sound) play();
          }
        }}
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
        className="mini-banner"
        alt="mini weapon banner active"
        src={`../assets/banner/mini/${vers}/weap-active.webp`}
        width={getWidth(180)}
        style={{
          transform: hasBeginner ? `translateY(305%)` : "translateY(210%)",
          opacity: `${bannerType === "weap" ? 1 : 0}`,
          pointerEvents: "none",
        }}
        draggable="false"
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner"
        alt="mini weapon banner"
        src={`../assets/banner/mini/${vers}/weap.webp`}
        width={getWidth(160)}
        style={{
          transform: hasBeginner ? `translateY(470%)` : "translateY(330%)",
          opacity: `${bannerType === "weap" ? 0 : 1}`,
        }}
        onClick={() => {
          if (bannerType !== "weap") {
            setBannerType("weap");
            if (sound) play();
          }
        }}
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
        className="mini-banner"
        alt="mini standard banner active"
        src={`../assets/banner/mini/standard-active.webp`}
        width={getWidth(180)}
        style={{
          transform: hasBeginner ? `translateY(445%)` : "translateY(335%)",
          opacity: `${bannerType === "standard" ? 1 : 0}`,
        }}
        draggable="false"
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-banner"
        alt="mini standard banner"
        src={`../assets/banner/mini/standard.webp`}
        width={getWidth(160)}
        style={{
          transform: hasBeginner ? `translateY(620%)` : "translateY(475%)",
          opacity: `${bannerType === "standard" ? 0 : 1}`,
        }}
        onClick={() => {
          if (bannerType !== "standard") {
            setBannerType("standard");
            if (sound) play();
          }
        }}
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
        width={getWidth(160)}
        style={{
          transform: hasBeginner ? "translateY(172%)" : "translateY(180%)",
          opacity: hasBeginner
            ? `${highlightIndex === 0 && bannerType !== "beginner" ? 1 : 0}`
            : `${highlightIndex === 0 && bannerType !== "char" ? 1 : 0}`,
        }}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-highlight"
        src="../assets/banner/mini/highlight.webp"
        alt="highlight"
        width={getWidth(160)}
        style={{
          transform: "translateY(314%)",
          opacity: hasBeginner
            ? `${highlightIndex === 1 && bannerType !== "char" ? 1 : 0}`
            : `${highlightIndex === 1 && bannerType !== "weap" ? 1 : 0}`,
        }}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-highlight"
        src="../assets/banner/mini/highlight.webp"
        alt="highlight"
        width={getWidth(160)}
        style={{
          transform: hasBeginner ? "translateY(450%)" : "translateY(455%)",
          opacity: hasBeginner
            ? `${highlightIndex === 2 && bannerType !== "weap" ? 1 : 0}`
            : `${highlightIndex === 2 && bannerType !== "standard" ? 1 : 0}`,
        }}
      />
      <LazyLoadImage
        effect="opacity-200"
        className="mini-highlight"
        src="../assets/banner/mini/highlight.webp"
        alt="highlight"
        width={getWidth(160)}
        style={{
          transform: "translateY(595%)",
          opacity: hasBeginner
            ? `${highlightIndex === 3 && bannerType !== "standard" ? 1 : 0}`
            : 0,
        }}
      />
    </React.Fragment>
  );
};

export default MiniBanners;
