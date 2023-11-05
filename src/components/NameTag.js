import "../css/DataBank.css";
import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { json, asianLang } from "../util/Constants";
import { useTranslation } from "react-i18next";
import ResizeContext from "./context/ResizeContext";
const trans = require("../assets/data/translations.json");

export default function NameTag({ style, name, bottom = false, anim = true }) {
  const cleanText = (text) => {
    return text
      .replace(/[^\w\s-]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };
  const dumbText = name.toLowerCase().replace(/ /g, "-");
  const tagWidth = () => {
    const multi = asianLang.includes(i18n.resolvedLanguage) ? 36 : 16;
    return trans[dumbText][i18n.resolvedLanguage].length * multi;
  };

  const { getWidth, getHeight } = useContext(ResizeContext);
  const { i18n } = useTranslation();

  return (
    <div
      className="name-tag"
      style={{
        ...style,
        width: getWidth(160),
        height: getHeight(70, 160),
        fontSize: getWidth(22),
      }}
      anim={anim.toString()}
    >
      <span
        className="name-tag-top"
        style={{ width: getWidth(34 + tagWidth()) }}
      >
        <LazyLoadImage
          alt={json.getElement(dumbText)}
          src={`assets/elem-${cleanText(json.getElement(dumbText))}.webp`}
          draggable="false"
          width={getWidth(34)}
          height={getWidth(34)}
        />
        {trans[dumbText][i18n.resolvedLanguage]}
      </span>
      <span
        className="name-tag-bottom"
        bottom={bottom.toString()}
        style={{ width: getWidth(100) }}
      >
        <LazyLoadImage
          alt="star"
          src="assets/star.webp"
          width={getWidth(16)}
          draggable="false"
        />
        <LazyLoadImage
          alt="star"
          src="assets/star.webp"
          width={getWidth(16)}
          draggable="false"
        />
        <LazyLoadImage
          alt="star"
          src="assets/star.webp"
          width={getWidth(16)}
          draggable="false"
        />
        <LazyLoadImage
          alt="star"
          src="assets/star.webp"
          width={getWidth(16)}
          draggable="false"
        />
        <LazyLoadImage
          alt="star"
          src="assets/star.webp"
          width={getWidth(16)}
          draggable="false"
        />
      </span>
    </div>
  );
}
