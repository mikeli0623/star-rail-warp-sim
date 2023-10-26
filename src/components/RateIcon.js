import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
const trans = require("../assets/data/translations.json");

export default function RateIcon({ item, rarity, type, handleSelect }) {
  const { i18n } = useTranslation();

  return (
    <div className="rate-icon" rarity={rarity} onClick={handleSelect}>
      {type.includes("char") && (
        <LazyLoadImage
          effect="opacity"
          className="rate-char-img"
          alt={`${item} Card`}
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
            alt={`${item} Card`}
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
      <div className="rate-name">{trans[item][i18n.resolvedLanguage]}</div>
    </div>
  );
}
