import "../css/DataBank.css";
import React, { useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { json, allChars, allWeapons } from "../classes/Constants";
import CloseButton from "./CloseButton";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import ResizeContext from "./ResizeContext";
import ItemCard from "./ItemCard";
import FilterButton from "./FilterButton";

export default function DataBank({ type, setContent, setShowDB }) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { sound } = useContext(SoundContext);

  const [playLoad] = useSound("../assets/audio/sfx/db-load.mp3");
  const [playSelectItem] = useSound("../assets/audio/sfx/db-item-select.mp3");
  const [playSelectFilter] = useSound(
    "../assets/audio/sfx/db-filter-select.mp3"
  );
  const [playExit] = useSound("../assets/audio/sfx/db-exit.mp3");

  const handleExit = () => {
    if (sound) playExit();
    setContent("main");
    setShowDB(true);
  };

  useEffect(() => {
    if (sound) playLoad();
  }, [sound, playLoad]);

  const handleItemSelect = () => {
    if (sound) playSelectItem();
  };

  const stash = Object.entries(
    JSON.parse(localStorage.getItem("stash"))
  ).filter(([name]) => {
    if (type === "char") return allChars.includes(name);
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

  return (
    <section
      className="db-back"
      style={{ backgroundImage: "url(assets/db-back.webp)" }}
    >
      <div
        id="info"
        style={{
          width: getWidth(380),
          height: getHeight(50, 380),
        }}
      >
        <div
          id="warp-icon"
          style={{
            backgroundImage: "url(/assets/icon-db.webp)",
            width: getWidth(44),
            height: getWidth(44),
            backgroundSize: getWidth(44),
          }}
        />
        <div
          style={{
            height: getHeight(50, 300),
            width: getWidth(300),
            display: "flex",
            flexDirection: "column",
            margin: 0,
            padding: 0,
          }}
        >
          <div
            id="title"
            style={{
              fontSize: getWidth(22),
              height: getWidth(24),
              textAlign: "left",
              marginTop: `-${getWidth(6)}px`,
            }}
          >
            Data Bank
          </div>
          <div
            id="warp-type"
            style={{
              textAlign: "left",
              fontSize: getWidth(24),
              height: getWidth(24),
            }}
          >
            {type === "char" ? "Characters" : "Light Cones"}
          </div>
        </div>
      </div>
      <div
        className="indexed-info"
        style={{ color: "white", fontSize: getWidth(24) }}
      >
        Indexed{" "}
        <span style={{ color: "#face75" }}>
          {total}/{type === "char" ? allChars.length : allWeapons.length}
        </span>
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
        </div>
        <Scrollbars
          className="db-item-container"
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          renderThumbVertical={renderThumb}
        >
          {sortedStash
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
                  indexed={count > 0}
                  handleSelect={handleItemSelect}
                />
              );
            })}
        </Scrollbars>
      </div>

      <CloseButton onClose={handleExit} />
    </section>
  );
}
