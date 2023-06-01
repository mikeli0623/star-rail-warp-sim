import "../../css/Details.css";
import { useState } from "react";
import CloseButton from "../CloseButton";
import ResizeContext from "../ResizeContext";
import { Scrollbars } from "react-custom-scrollbars-2";
import { json } from "../../util/Constants";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import DetailsContent from "./DetailsContent";
import RecordsContent from "./RecordsContent";

const DetailsButton = ({ text, handleSelect, isActive }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      onClick={handleSelect}
      style={{
        color: isActive ? "#d9c190" : "#a4a4a4",
        height: 60,
        borderBottom: isActive && "4px solid #d9c190",
      }}
    >
      {text}
    </div>
  );
};

export default function DetailsMain({ setContent, bannerType, history }) {
  const [vers] = useState(sessionStorage.getItem("vers") || "1.0.1");
  const [detailType, setDetailType] = useState("details");

  const { t, i18n } = useTranslation();
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
          fontSize: 30,
        }}
      >
        <nav
          className="position-sticky d-flex justify-content-center align-items-center py-2"
          style={{ backgroundColor: "#303030", top: 0, zIndex: 2 }}
        >
          <CloseButton onClose={() => setContent("main")} />
          <DetailsButton
            text={t("button.view-details")}
            handleSelect={() => setDetailType("details")}
            isActive={detailType === "details"}
          />
          <div
            style={{
              width: 1,
              height: 40,
              backgroundColor: "#c6c6c6",
              margin: "0 80px",
            }}
          />
          <DetailsButton
            text={t("button.records")}
            handleSelect={() => setDetailType("records")}
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
