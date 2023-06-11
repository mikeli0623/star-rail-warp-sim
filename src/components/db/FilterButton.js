import React from "react";
import { useTranslation } from "react-i18next";
const trans = require("../../assets/data/translations.json");

export default function FilterButton({ text, active, handleSelect }) {
  const dumbText = text.toLowerCase().replace(/ /g, "-");
  const { i18n } = useTranslation();

  // const one = {
  //   hidden: { pathLength: 0, opacity: 0, rotate: "45deg" },
  //   visible: () => {
  //     return {
  //       pathLength: 0.35,
  //       opacity: 1,
  //       rotate: "405deg",
  //       transition: {
  //         pathLength: { type: "spring", duration: 1, bounce: 0 },
  //         opacity: { duration: 0.1 },
  //         rotate: { repeat: Infinity, duration: 15, ease: "linear" },
  //       },
  //     };
  //   },
  // };

  // const two = {
  //   hidden: { pathLength: 0, opacity: 0, rotate: "225deg" },
  //   visible: () => {
  //     return {
  //       pathLength: 0.35,
  //       opacity: 1,
  //       rotate: "585deg",
  //       transition: {
  //         pathLength: { type: "spring", duration: 1, bounce: 0 },
  //         opacity: { duration: 0.1 },
  //         rotate: { repeat: Infinity, duration: 15, ease: "linear" },
  //       },
  //     };
  //   },
  // };

  return (
    <div className="filter-button" onClick={() => handleSelect(text)}>
      {/* <motion.svg
                  width="600"
                  height="600"
                  viewBox="0 0 600 600"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.circle
                    className="solid-circle"
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#fdd073"
                    variants={one}
                  />
                  <motion.circle
                    className="solid-circle"
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#fdd073"
                    variants={two}
                  />
                </motion.svg> */}
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
