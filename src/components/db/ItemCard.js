import React, { useEffect, useState, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { json } from "../../util/Constants";
import ResizeContext from "../context/ResizeContext";
import { useTranslation } from "react-i18next";
const trans = require("../../assets/data/translations.json");

export default function ItemCard({
  type,
  item,
  indexed,
  handleSelect,
  showCount,
  count,
}) {
  const { getWidth } = useContext(ResizeContext);
  const info = {
    name: json.getName(item),
    rarity: json.getRarity(item),
    element: json.getElement(item),
    path: json.getPath(item),
  };

  const cleanText = (text) => {
    return text
      .replace(/[^\w\s-]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const [wrapMulti, setWrapMulti] = useState(10);

  useEffect(() => {
    setWrapMulti(getWidth(13));
  }, [getWidth]);

  const starPrinter = (i) => {
    return (
      <LazyLoadImage
        effect="opacity"
        key={i}
        className="db-item-star"
        src="./assets/star.webp"
        alt="star"
        width={getWidth(14, 8)}
        draggable="false"
      />
    );
  };

  const wrapCount = (string) => {
    const characterWidth = 22; // Assume the width of a character is 60% of the font size (adjust as needed)
    const contentWidth = string.length * characterWidth;
    return Math.ceil(contentWidth / 180);
  };

  const { t, i18n } = useTranslation();

  return (
    <div
      className="item-card"
      onClick={handleSelect}
      style={{ borderRadius: `0 ${getWidth(20, 10)}px 0 0` }}
    >
      <div className="card-gradient" rarity={info.rarity} />
      <div className="card-overlay" indexed={indexed.toString()} />
      <div className="index-noti" indexed={indexed.toString()}>
        {t("db.not-indexed")}
      </div>
      <div
        className="item-top"
        style={{ margin: getWidth(5), width: getWidth(40, 20) }}
      >
        {type.includes("char") && (
          <LazyLoadImage
            effect="opacity"
            width={getWidth(35, 22)}
            className="db-item-element"
            alt="Element"
            src={`assets/elem-${info.element.toLowerCase()}.webp`}
            draggable="false"
            style={{ marginBottom: getWidth(5) }}
          />
        )}
        <LazyLoadImage
          effect="opacity"
          className="db-item-path"
          width={getWidth(35, 20)}
          alt="Path"
          src={`assets/icon-${info.path.toLowerCase().replace(/ /g, "-")}.webp`}
          draggable="false"
        />
      </div>
      {showCount && <div className="item-count">{count}</div>}
      {type.includes("char") && (
        <LazyLoadImage
          effect="opacity"
          className="char-img"
          alt={`${info.name} Card`}
          src={`./assets/splash/iso/${item}.webp`}
          draggable="false"
        />
      )}
      {type.includes("weap") && (
        <React.Fragment>
          <LazyLoadImage
            effect="opacity"
            className="weap-img glass-back"
            alt="Glass Back"
            src="assets/glass-back.webp"
            draggable="false"
          />
          <LazyLoadImage
            effect="opacity"
            className="weap-img"
            alt={`${info.name} Card`}
            src={`./assets/splash/${item}.webp`}
            draggable="false"
          />
          <LazyLoadImage
            effect="opacity"
            className="weap-img glass-front"
            alt="Glass Front"
            src="assets/glass-front.webp"
            draggable="false"
          />
        </React.Fragment>
      )}
      <div className="item-bottom">
        <div
          className="item-name"
          style={{
            transform: `translateY(-${
              wrapCount(trans[cleanText(info.name)][i18n.resolvedLanguage]) *
              wrapMulti
            }%)`,
          }}
        >
          {trans[cleanText(info.name)][i18n.resolvedLanguage]}
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
