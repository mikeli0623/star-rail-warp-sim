import "../css/DataBank.css";
import React, { useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { json, allChars, allWeapons } from "../classes/Constants";
import CloseButton from "./CloseButton";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import ResizeContext from "./ResizeContext";
import ItemCard from "./ItemCard";

export default function DataBank({ type, setContent }) {
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

  return (
    <section className="db-back">
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
      <div className="db-item-container">
        {sortedStash
          .filter(([name]) => {
            if (type === "char") return allChars.includes(name);
            else return allWeapons.includes(name);
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
      </div>

      <CloseButton onClose={handleExit} />
    </section>
  );
}
