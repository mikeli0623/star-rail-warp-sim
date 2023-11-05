import "../../css/DataBank.css";
import React, { useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { json, allChars, allWeapons } from "../../util/Constants";
import CloseButton from "../CloseButton";
import SoundContext from "../context/SoundContext";
import ResizeContext from "../context/ResizeContext";
import ItemCard from "./ItemCard";
import FilterButton from "./FilterButton";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Checkbox from "../Checkbox";

export default function DataBank({ type, setContent, setShowDB }) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { sound, useSound } = useContext(SoundContext);

  const [playSelectItem] = useSound("../assets/audio/sfx/item-select.mp3");
  const [playSelectFilter] = useSound("../assets/audio/sfx/tab-select.mp3");
  const [playExit] = useSound("../assets/audio/sfx/db-exit.mp3");

  const handleExit = () => {
    if (sound) playExit();
    setContent("main");
    setShowDB(true);
  };

  const handleItemSelect = () => {
    if (sound) playSelectItem();
  };

  const stash = Object.entries(
    JSON.parse(localStorage.getItem("stash"))
  ).filter(([name]) => {
    if (type.includes("char")) return allChars.includes(name);
    else return allWeapons.includes(name);
  });

  const total = stash.reduce((acc, [, count]) => acc + (count > 0 ? 1 : 0), 0);

  const compareRarity = (a, b) => {
    const [keyA] = a;
    const [keyB] = b;

    const rarityA = json.getRarity(keyA);
    const rarityB = json.getRarity(keyB);

    if (rarityA !== rarityB) {
      return rarityB - rarityA;
    }
  };

  const groupedArray = stash.sort(compareRarity).reduce(
    (acc, curr) => {
      if (curr[1] !== 0) {
        acc.highPriority.push(curr);
      } else {
        acc.lowPriority.push(curr);
      }
      return acc;
    },
    { highPriority: [], lowPriority: [] }
  );

  const sortedStash = [
    ...groupedArray.highPriority,
    ...groupedArray.lowPriority,
  ];

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `#c4ceda`,
    };
    return (
      <div className="bar" style={{ ...style, ...thumbStyle }} {...props} />
    );
  };

  const [filter, setFilter] = useState("All");

  const handleFilterSelect = (newFilter) => {
    if (newFilter !== filter) {
      if (sound) playSelectFilter();
      setFilter(newFilter);
    }
  };

  const [checked, setChecked] = useState(
    sessionStorage.getItem("db-count")
      ? JSON.parse(sessionStorage.getItem("db-count"))
      : false
  );

  const handleCount = () => {
    sessionStorage.setItem("db-count", (!checked).toString());
    setChecked(!checked);
  };

  const { t } = useTranslation();

  useEffect(() => {
    function handleKeyDown({ keyCode }) {
      if (keyCode === 27) {
        if (sound) playExit();
        setContent("main");
        setShowDB(true);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setContent, setShowDB, playExit, sound]);

  return (
    <motion.section
      key="db"
      initial={{ filter: "brightness(0)" }}
      animate={{ filter: "brightness(1)" }}
      exit={{ filter: "brightness(0)" }}
      className="db-back"
      style={{ backgroundImage: "url(assets/db/db-back.webp)" }}
    >
      <div id="top-bar">
        <div
          id="info"
          style={{
            width: getWidth(680, 200),
            height: getHeight(50, 680, 20, 200),
          }}
        >
          <div
            id="warp-icon"
            style={{
              backgroundImage: "url(/assets/icon-db.webp)",
              width: getWidth(44, 22),
              height: getWidth(44, 22),
              backgroundSize: getWidth(44, 22),
            }}
          />
          <div
            style={{
              height: getHeight(50, 600),
              width: getWidth(600),
              display: "flex",
              flexDirection: "column",
              margin: 0,
              padding: 0,
            }}
          >
            <div
              id="title"
              style={{
                fontSize: getWidth(20, 9),
                height: getWidth(24, 11),
                textAlign: "left",
                marginTop: `-3px`,
              }}
            >
              {t("db.title")}
            </div>
            <div
              id="warp-type"
              style={{
                textAlign: "left",
                fontSize: getWidth(22, 11),
                height: getWidth(24, 11),
              }}
            >
              {type.includes("char") ? t("db.type2") : t("db.type1")}
            </div>
          </div>
        </div>
        <div
          className="indexed-info"
          style={{ color: "white", fontSize: getWidth(22, 10) }}
        >
          {t("db.indexed")}{" "}
          <span style={{ color: "#face75" }}>
            {total}/
            {type.includes("char") ? allChars.length : allWeapons.length}
          </span>
        </div>
        <CloseButton onClose={handleExit} />
      </div>
      <div className="db-content">
        <div className="item-filter-container">
          <FilterButton
            text="All"
            handleSelect={handleFilterSelect}
            active={filter === "All"}
          />
          <FilterButton
            text="Destruction"
            handleSelect={handleFilterSelect}
            active={filter === "Destruction"}
          />
          <FilterButton
            text="The Hunt"
            handleSelect={handleFilterSelect}
            active={filter === "The Hunt"}
          />
          <FilterButton
            text="Erudition"
            handleSelect={handleFilterSelect}
            active={filter === "Erudition"}
          />
          <FilterButton
            text="Harmony"
            handleSelect={handleFilterSelect}
            active={filter === "Harmony"}
          />
          <FilterButton
            text="Nihility"
            handleSelect={handleFilterSelect}
            active={filter === "Nihility"}
          />
          <FilterButton
            text="Preservation"
            handleSelect={handleFilterSelect}
            active={filter === "Preservation"}
          />
          <FilterButton
            text="Abundance"
            handleSelect={handleFilterSelect}
            active={filter === "Abundance"}
          />
          <Checkbox
            className="count-check"
            handleCheck={handleCount}
            checked={checked}
            text="Count"
          />
        </div>
        <Scrollbars
          className="db-item-container"
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          renderThumbVertical={renderThumb}
        >
          {sortedStash.length > 0 ? (
            sortedStash
              .filter(([name]) => {
                if (filter === "All") return true;
                return json.getPath(name) === filter;
              })
              .map(([name, count]) => {
                return (
                  <ItemCard
                    key={name}
                    type={type}
                    item={name}
                    showCount={checked && count > 0}
                    count={count}
                    indexed={count > 0}
                    handleSelect={handleItemSelect}
                  />
                );
              })
          ) : (
            <p style={{ color: "white" }}>
              Nothing appearing? Reset in the phone menu.
            </p>
          )}
        </Scrollbars>
      </div>
    </motion.section>
  );
}
