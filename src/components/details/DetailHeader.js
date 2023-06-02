import { useContext } from "react";
import ResizeContext from "../context/ResizeContext";

export default function DetailHeader({ title }) {
  const { getWidth } = useContext(ResizeContext);

  return (
    <div
      className="d-flex justify-content-between align-items-center my-2"
      style={{
        backgroundColor: "#515254",
        color: "white",
        borderRadius: `0 ${getWidth(10)}px 0 0`,
        height: getWidth(50),
        paddingRight: "15px",
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          width: getWidth(30),
          height: getWidth(65),
        }}
      >
        <span
          style={{
            left: "1%",
            backgroundColor: "#f29d38",
            width: getWidth(4, 2),
            height: getWidth(65),
          }}
        />
      </div>
      <p className="m-0">{title}</p>
    </div>
  );
}
