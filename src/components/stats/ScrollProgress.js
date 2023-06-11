import { useContext } from "react";
import ResizeContext from "../context/ResizeContext";

export default function ScrollProgress({ status }) {
  const { getWidth } = useContext(ResizeContext);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: getWidth(10),
        marginTop: getWidth(32),
        marginRight: getWidth(15),
      }}
    >
      <div
        className="w-100 h-100"
        style={{
          backgroundColor: "red",
          transformOrigin: "top",
          transition: "transform 0.1s",
          transform: `scaleY(${status})`,
        }}
      />
    </div>
  );
}
