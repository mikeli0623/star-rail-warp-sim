import "../../css/Details.css";
import { useState, useContext, useEffect } from "react";
import SoundContext from "../context/SoundContext";
import CloseButton from "../CloseButton";
import ResizeContext from "../context/ResizeContext";
import { Scrollbars } from "react-custom-scrollbars-2";
import { json, LATESTVERS } from "../../util/Constants";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import DetailsContent from "./DetailsContent";
import RecordsContent from "./RecordsContent";

const DetailsButton = ({ text, handleSelect, isActive }) => {
  const { getWidth } = useContext(ResizeContext);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      onClick={handleSelect}
      style={{
        color: isActive ? "#d9c190" : "#a4a4a4",
        height: getWidth(60),
        borderBottom: isActive && `${getWidth(4, 1)}px solid #d9c190`,
      }}
    >
      {text}
    </div>
  );
};

export default function DetailsMain({ setContent, bannerType, history }) {
  const vers = sessionStorage.getItem("vers") || LATESTVERS;
  const [detailType, setDetailType] = useState("details");
  const { getWidth } = useContext(ResizeContext);

  const { t, i18n } = useTranslation();

  const { sound, useSound } = useContext(SoundContext);

  const [playTab] = useSound("/assets/audio/sfx/details-type-select.mp3");
  const [playClose] = useSound("/assets/audio/sfx/details-close.mp3");

  const handleSelect = (type) => {
    if (type !== detailType) {
      setDetailType(type);
      if (sound) playTab();
    }
  };

  useEffect(() => {
    function handleKeyDown({ keyCode }) {
      if (keyCode === 27) {
        if (sound) playClose();
        setContent("main");
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sound, setContent, playClose]);

  return (
    <motion.main
      key="details"
      initial={{ filter: "brightness(0)" }}
      animate={{ filter: "brightness(1)" }}
      exit={{ filter: "brightness(0)" }}
      className="details-back d-flex justify-content-center align-items-center"
      style={{ backgroundImage: "url(assets/details/back.webp)" }}
    >
      <div
        className="position-relative overflow-hidden"
        style={{
          backgroundColor: "#f1f1f1",
          width: "70vw",
          height: "70vh",
          fontSize: getWidth(28, 14),
        }}
      >
        <nav
          className="position-sticky d-flex justify-content-center align-items-center py-2"
          style={{ backgroundColor: "#303030", top: 0, zIndex: 2 }}
        >
          <CloseButton
            onClose={() => {
              if (sound) playClose();
              setContent("main");
            }}
          />
          <DetailsButton
            text={t("button.view-details")}
            handleSelect={() => handleSelect("details")}
            isActive={detailType === "details"}
          />
          <div
            style={{
              width: 1,
              height: 40,
              backgroundColor: "#c6c6c6",
              margin: `0 ${getWidth(80)}px`,
            }}
          />
          <DetailsButton
            text={t("button.records")}
            handleSelect={() => handleSelect("records")}
            isActive={detailType === "records"}
          />
        </nav>
        <Scrollbars style={{ height: "82%" }}>
          {detailType === "details" && (
            <DetailsContent
              vers={vers}
              bannerType={bannerType}
              title={json.getTitle(vers, bannerType, i18n.resolvedLanguage)}
            />
          )}
          {detailType === "records" && (
            <RecordsContent
              title={json.getTitle(vers, bannerType, i18n.resolvedLanguage)}
              type={bannerType}
              history={history.toReversed()}
            />
          )}
        </Scrollbars>
      </div>
    </motion.main>
  );
}
