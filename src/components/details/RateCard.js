import React, { useContext } from "react";
import ResizeContext from "../context/ResizeContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
const trans = require("../../assets/data/translations.json");

export default function RateCard({ item, rarity, type, elem = "", path }) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { i18n } = useTranslation();

  return (
    <div
      className="rate-card"
      rarity={rarity}
      style={{
        height: getHeight(160, 600),
        width: getWidth(600, 300),
        margin: getWidth(10),
        outline: `${getWidth(4, 2)}px solid white`,
      }}
    >
      {elem && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "black",
            borderRadius: "100%",
            height: getWidth(42, 18),
            width: getWidth(42, 18),
            position: "absolute",
            zIndex: 1,
            marginTop: getWidth(10),
            marginLeft: getWidth(10),
          }}
        >
          <img
            alt={`${elem} icon`}
            src={`./assets/elem-${elem}.webp`}
            width={getWidth(40, 16)}
            draggable="false"
          />
        </div>
      )}
      <img
        className="rate-card-path"
        alt={`${path} icon`}
        src={`./assets/path-${path}-lg.webp`}
        width={getWidth(250)}
        style={{ top: -getWidth(40), left: -getWidth(20) }}
        draggable="false"
      />
      {type.includes("char") && (
        <LazyLoadImage
          effect="opacity"
          className="card-char-img"
          alt={`${item} Card`}
          src={`./assets/splash/iso-full/${item}.webp`}
          width={getWidth(1100, 550)}
          draggable="false"
        />
      )}
      {type.includes("weap") && (
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
      <div
        className="rate-card-name"
        style={{ fontSize: getWidth(34, 14), padding: `0 ${getWidth(30)}px` }}
      >
        {trans[item][i18n.resolvedLanguage]}
      </div>
    </div>
  );
}
