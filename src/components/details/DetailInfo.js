import { useContext } from "react";
import ResizeContext from "../context/ResizeContext";

export default function DetailInfo({ text, rarity, chance }) {
  const { getWidth } = useContext(ResizeContext);

  return (
    <div
      className="my-2 d-flex justify-content-start align-items-center"
      style={{
        backgroundColor: "#e9e7e4",
        color: "#767676",
        border: `${getWidth(2, 1)}px solid #e0dace`,
        height: getWidth(50),
        fontSize: getWidth(24),
      }}
    >
      <div
        className="justify-content-start align-items-center details-stars"
        hide={chance.length === 2 ? "true" : "false"}
        style={{
          width: getWidth(180),
          height: getWidth(50),
          padding: `0 ${getWidth(20)}px`,
        }}
      >
        {[...Array(rarity)].map((i, j) => {
          return (
            <img
              key={j}
              alt="Star"
              width={getWidth(25)}
              src="./assets/details/star.webp"
              draggable="false"
            />
          );
        })}
      </div>
      {chance.length === 2
        ? text[0] + " " + chance[0] + "% " + text[1] + " " + chance[1] + "%)"
        : text + chance}
      <div
        className="mx-4 line-thing"
        style={{ flexGrow: "1", backgroundColor: "#e2ded8", height: 1 }}
      />
    </div>
  );
}
