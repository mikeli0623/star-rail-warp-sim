import "../css/DataBank.css";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { json } from "../classes/Constants";

export default function ItemCard({ type, item, indexed, handleSelect }) {
  const info = {
    name: json.getName(item),
    rarity: json.getRarity(item),
    element: json.getElement(item),
    path: json.getPath(item),
  };

  const starPrinter = (i) => {
    return (
      <LazyLoadImage
        effect="opacity"
        key={i}
        src="./assets/star.webp"
        alt="star"
        width={14}
        draggable="false"
      />
    );
  };

  const wrapCount = (string, divWidth, fontSize) => {
    const characterWidth = fontSize * 0.9; // Assume the width of a character is 60% of the font size (adjust as needed)
    const contentWidth = string.length * characterWidth;
    return Math.ceil(contentWidth / divWidth);
  };

  return (
    <div className="item-card" onClick={handleSelect}>
      <div className="card-gradient" rarity={info.rarity} />
      <div className="card-overlay" indexed={indexed.toString()} />
      <div className="index-noti" indexed={indexed.toString()}>
        Not Indexed
      </div>
      <div className="item-top">
        {type === "char" && (
          <LazyLoadImage
            effect="opacity"
            className="db-item-element"
            alt="Element"
            src={`assets/${info.element}.webp`}
            width={40}
          />
        )}
        <LazyLoadImage
          effect="opacity"
          alt="Path"
          src={`assets/icon-${info.path.replace(/ /g, "-")}.webp`}
          width={35}
        />
      </div>
      {type === "char" && (
        <LazyLoadImage
          effect="opacity"
          className="char-img"
          alt={`${info.name} Card`}
          src={`./assets/splash/iso/${item}.webp`}
        />
      )}
      {type === "weap" && (
        <React.Fragment>
          <LazyLoadImage
            effect="opacity"
            className="weap-img glass-back"
            alt="Glass Back"
            src="assets/glass-back.webp"
          />
          <LazyLoadImage
            effect="opacity"
            className="weap-img"
            alt={`${info.name} Card`}
            src={`./assets/splash/${item}.webp`}
          />
          <LazyLoadImage
            effect="opacity"
            className="weap-img glass-front"
            alt="Glass Front"
            src="assets/glass-front.webp"
          />
        </React.Fragment>
      )}
      <div className="item-bottom">
        <div
          className="item-name"
          style={{
            transform: `translateY(-${wrapCount(info.name, 180, 22) * 10}%)`,
          }}
        >
          {info.name}
        </div>
        <div className="star-container">
          {Array(info.rarity)
            .fill()
            .map((e, i) => {
              return starPrinter(i);
            })}
        </div>
        <div className="base-highlight" rarity={info.rarity} />
      </div>
    </div>
  );
}
