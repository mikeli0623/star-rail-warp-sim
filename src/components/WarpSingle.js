import React, { useState, useEffect } from "react";
import { allChars, json } from "../classes/Constants";
import CloseButton from "./CloseButton";

const WarpSingle = ({ currentWarp, setContent, resize }) => {
  const cleanText = (text) => {
    return text
      .replace(/[^\w\s-]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const [warpIndex, setWarpIndex] = useState(0);

  const [animateInfo, setAnimateInfo] = useState(false);

  const [item, setItem] = useState({
    name: json.getName(currentWarp[0]),
    path: json.getPath(currentWarp[0]),
    element: json.getElement(currentWarp[0]),
    rarity: json.getRarity(currentWarp[0]),
    isChar: allChars.includes(currentWarp[0]),
  });

  useEffect(() => {
    setItem({
      name: json.getName(currentWarp[warpIndex]),
      path: json.getPath(currentWarp[warpIndex]),
      element: json.getElement(currentWarp[warpIndex]),
      rarity: json.getRarity(currentWarp[warpIndex]),
      isChar: allChars.includes(currentWarp[warpIndex]),
    });
  }, [currentWarp, warpIndex]);

  useEffect(() => {
    const length = currentWarp.length;
    if (warpIndex === length) {
      if (length === 10) setContent("results");
      else setContent("main");
    }
  }, [warpIndex, currentWarp, setContent]);

  const nextSingle = () => {
    setWarpIndex(warpIndex + 1);
    setAnimateInfo(false);
  };

  const starPrinter = (i) => {
    return (
      <img
        className={`${animateInfo ? "single-stars" : "transparent"}`}
        key={i}
        src="./assets/star.webp"
        alt="star"
        width={`${resize.getWidth(22)}`}
        star={i + 1}
        draggable="false"
      />
    );
  };

  return (
    <div
      className="overlay"
      onClick={nextSingle}
      style={{
        backgroundImage: "url(../assets/warp-result.webp)",
      }}
    >
      <CloseButton
        resize={resize}
        onClose={() => {
          setContent("results");
        }}
      />
      <div
        id="single-info"
        style={{
          height: resize.getHeight(115, 550),
          width: resize.getWidth(550),
          opacity: `${animateInfo ? 1 : 0}`,
          animationName: `${animateInfo ? "animate-info" : ""}`,
          animationDuration: "1s",
          animationFillMode: "forwards",
          animationTimingFunction: "cubic-bezier(.74,.04,.4,.87)",
        }}
      >
        <div
          id="single-info-shadow"
          style={{
            height: resize.getHeight(
              115,
              Math.max(150 + 15 * item.name.length, 300)
            ),
            width: resize.getWidth(Math.max(150 + 15 * item.name.length, 300)),
          }}
        >
          <img
            className={`${animateInfo ? "single-type" : "transparent"}`}
            src={`./assets/${cleanText(item.path)}.webp`}
            alt={item.path}
            width={`${resize.getWidth(115)}`}
            draggable="false"
          />
          <div id="info-pair">
            <div
              className={`${animateInfo ? "single-name" : "transparent"}`}
              style={{
                fontSize: `${resize.getWidth(34)}px`,
                color: "white",
                marginTop: resize.getWidth(8),
              }}
            >
              {item.name}
            </div>
            <div id="stars-container">
              {Array(item.rarity)
                .fill()
                .map((e, i) => {
                  return starPrinter(i);
                })}
            </div>
          </div>
        </div>
      </div>
      {currentWarp.map((warp, i) => {
        if (item.isChar)
          return (
            <img
              className={`${
                i === warpIndex ? "single-item" : "transparent"
              } char`}
              key={warp + i}
              src={`/assets/splash/${cleanText(
                json.getName(currentWarp[i])
              )}.webp`}
              alt={item.name}
              onAnimationEnd={() => setAnimateInfo(true)}
              width={resize.getWidth(1800)}
              draggable="false"
            />
          );
        else
          return (
            <React.Fragment key={warp + i}>
              <img
                className={`${i === warpIndex ? "glass" : "transparent"} back`}
                src="./assets/glass-back.webp"
                alt="glass back"
                style={{ rotate: "7deg" }}
                width={resize.getWidth(400)}
                draggable="false"
              />
              <div
                className={`${
                  i === warpIndex ? "single-item" : "transparent"
                } weap`}
                onAnimationEnd={() => setAnimateInfo(true)}
                style={{
                  backgroundImage: `url(/assets/splash/${cleanText(
                    json.getName(currentWarp[i])
                  )}.webp)`,
                  height: resize.getHeight(558.75, 400),
                  width: resize.getWidth(400),
                  backgroundSize: `${resize.getWidth(400)}px ${resize.getHeight(
                    558.75,
                    400
                  )}px`,
                  backgroundColor: "black",
                }}
              />
              <img
                className={`${i === warpIndex ? "glass" : "transparent"} front`}
                src="./assets/glass-front.webp"
                alt="glass front"
                style={{ rotate: "7deg" }}
                width={resize.getWidth(400)}
                draggable="false"
              />
            </React.Fragment>
          );
      })}
    </div>
  );
};

export default WarpSingle;
