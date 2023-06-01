import { useState } from "react";
import ResizeContext from "../ResizeContext";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import RecordsTable from "./RecordsTable";

export default function RecordsContent({ type, history, title }) {
  const { t } = useTranslation();
  const [pagIndex, setPagIndex] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);

  const showNext = () => {
    if (currentPosition + 5 < history.length) {
      const remainingElements = history.length - currentPosition;
      const elementsToShow = Math.min(remainingElements, 5);

      if (elementsToShow > 0) {
        setPagIndex(pagIndex + 1);
        setCurrentPosition(currentPosition + elementsToShow);
      }
    }
  };

  const showPrev = () => {
    if (currentPosition !== 0) {
      const elementsToShow = Math.min(currentPosition, 5);

      if (elementsToShow > 0) {
        setPagIndex(pagIndex - 1);
        setCurrentPosition(currentPosition - elementsToShow);
      }
    }
  };

  const slicedHistory = history.slice(currentPosition, currentPosition + 5);

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-between px-5">
      <h1 style={{ fontWeight: "bold", alignSelf: "flex-start" }}>
        {type === "char"
          ? t("modal.vers.event1")
          : type === "weap"
          ? t("modal.vers.event2")
          : title}
      </h1>
      <RecordsTable history={slicedHistory} type={type} title={title} />
      <div className="d-flex justify-content-center align-items-center">
        <LazyLoadImage
          effect="opacity"
          alt="Right Pagination Arrow"
          src="./assets/details/pag-arrow.webp"
          style={{ rotate: "-180deg" }}
          onClick={showPrev}
        />
        <p style={{ color: "#767676", margin: "0 40px" }}>{pagIndex}</p>
        <LazyLoadImage
          effect="opacity"
          alt="Left Pagination Arrow"
          src="./assets/details/pag-arrow.webp"
          onClick={showNext}
        />
      </div>
    </div>
  );
}
