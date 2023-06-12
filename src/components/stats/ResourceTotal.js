import { useContext } from "react";
import ResizeContext from "../context/ResizeContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ResourceTotal({ type, amount }) {
  const { getWidth } = useContext(ResizeContext);
  return (
    <div
      className="resource-total"
      style={{
        width: `${
          getWidth(140) + amount.toString().length * getWidth(10, 4)
        }px`,
        height: getWidth(36, 18),
        color: "#b6b8ba",
      }}
    >
      <LazyLoadImage
        effect="opacity"
        src={`../assets/${type}.webp`}
        width={getWidth(35, 12)}
        alt={type}
        draggable="false"
      />
      {amount}
    </div>
  );
}
