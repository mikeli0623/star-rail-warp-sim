import "../css/DataBank.css";
import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { json } from "../classes/Constants";
import { useTranslation } from "react-i18next";
import ResizeContext from "../components/ResizeContext";
const trans = require("../assets/data/translations.json");

const asianLang = ["zh"];

export default function NameTag({ style, name, bottom = false, anim = true }) {
  const cleanText = (text) => {
    return text
      .replace(/[^\w\s-]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };
  const dumbText = name.toLowerCase().replace(/ /g, "-");
  const tagWidth = () => {
    const multi = asianLang.includes(i18n.resolvedLanguage) ? 34 : 16;
    const calcName =
      i18n.resolvedLanguage === "en"
        ? name
        : trans[i18n.resolvedLanguage][dumbText];
    return calcName.length * multi;
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
        fontSize: getWidth(24),
      }}
      anim={anim.toString()}
    >
      <span
        className="name-tag-top"
        style={{ width: getWidth(34 + tagWidth()) }}
      >
        <LazyLoadImage
          alt={json.getElement(dumbText)}
          src={`assets/${cleanText(json.getElement(dumbText))}.webp`}
          draggable="false"
          width={getWidth(34)}
        />
        {i18n.resolvedLanguage === "en"
          ? name
          : trans[i18n.resolvedLanguage][dumbText]}
      </span>
      <span
        className="name-tag-bottom"
        bottom={bottom.toString()}
        style={{ width: getWidth(100) }}
      >
        <LazyLoadImage alt="star" src="assets/star.webp" width={getWidth(16)} />
        <LazyLoadImage alt="star" src="assets/star.webp" width={getWidth(16)} />
        <LazyLoadImage alt="star" src="assets/star.webp" width={getWidth(16)} />
        <LazyLoadImage alt="star" src="assets/star.webp" width={getWidth(16)} />
        <LazyLoadImage alt="star" src="assets/star.webp" width={getWidth(16)} />
      </span>
    </div>
  );
}
