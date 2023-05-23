import "../css/DataBank.css";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
const trans = require("../assets/data/translations.json");

export default function FilterButton({ text, active, handleSelect }) {
  const dumbText = text.toLowerCase().replace(/ /g, "-");
  useEffect(() => console.log(text, dumbText));
  const { i18n } = useTranslation();
  return (
    <div className="filter-button" onClick={() => handleSelect(text)}>
      <div className="filter-img-circle" active={active.toString()}>
        <div
          className="filter-img"
          style={{
            backgroundImage: `url(assets/icon-${dumbText}.webp)`,
          }}
          active={active.toString()}
        />
      </div>
      <span className="filter-text" active={active.toString()}>
        {trans[dumbText][i18n.resolvedLanguage]}
      </span>
    </div>
  );
}
