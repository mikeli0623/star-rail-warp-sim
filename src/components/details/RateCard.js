import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
const trans = require("../../assets/data/translations.json");

export default function RateCard({ item, rarity, type, elem = "", path }) {
  const { i18n } = useTranslation();

  return (
    <div className="rate-card" rarity={rarity}>
      {elem && (
        <div
          className="d-flex justify-content-center align-items-center m-2"
          style={{
            backgroundColor: "black",
            borderRadius: "100%",
            height: 42,
            width: 42,
            position: "absolute",
            zIndex: 1,
          }}
        >
          <img
            alt={`${elem} icon`}
            src={`./assets/elem-${elem}.webp`}
            width={40}
            draggable="false"
          />
        </div>
      )}
      <img
        className="rate-card-path"
        alt={`${path} icon`}
        src={`./assets/path-${path}-lg.webp`}
        width={300}
        draggable="false"
      />
      {type === "char" && (
        <LazyLoadImage
          effect="opacity"
          className="card-char-img"
          alt={`${item} Card`}
          src={`./assets/splash/iso-full/${item}.webp`}
          width={1100}
          draggable="false"
        />
      )}
      {type === "weap" && (
        <React.Fragment>
          <LazyLoadImage
            effect="opacity"
            className="card-weap-img card-glass-back"
            alt="Glass Back"
            src="assets/glass-back.webp"
            draggable="false"
          />
          <LazyLoadImage
            effect="opacity"
            className="card-weap-img"
            alt={`${item} Card`}
            src={`./assets/splash/${item}.webp`}
            draggable="false"
          />
          <LazyLoadImage
            effect="opacity"
            className="card-weap-img card-glass-front"
            alt="Glass Front"
            src="assets/glass-front.webp"
            draggable="false"
          />
        </React.Fragment>
      )}
      <div className="rate-card-name px-3">
        {trans[item][i18n.resolvedLanguage]}
      </div>
    </div>
  );
}
