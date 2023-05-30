import "../../css/Details.css";
import { useState, useEffect } from "react";
import CloseButton from "../CloseButton";
import { json } from "../../util/Constants";
import useSound from "use-sound";
import SoundContext from "../SoundContext";
import ResizeContext from "../ResizeContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DetailsContent from "./DetailsContent";
import RecordsContent from "./RecordsContent";

export default function DetailsMain({ setContent, bannerType }) {
  const [vers] = useState(sessionStorage.getItem("vers") || "1.0.1");
  const [detailType, setDetailType] = useState("details");

  const { t } = useTranslation();
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
        className="position-relative overflow-auto"
        style={{
          backgroundColor: "white",
          width: "70vw",
          height: "70vh",
          fontSize: 30,
        }}
      >
        <nav style={{ alignSelf: "center" }}>
          <CloseButton variant="dark" onClose={() => setContent("main")} />
          <button className="mx-4" onClick={() => setDetailType("details")}>
            {t("button.view-details")}
          </button>
          <button className="mx-4" onClick={() => setDetailType("records")}>
            Records
          </button>
        </nav>

        {detailType === "details" && (
          <DetailsContent vers={vers} bannerType={bannerType} />
        )}
        {detailType === "records" && <RecordsContent />}
      </div>
    </motion.main>
  );
}
