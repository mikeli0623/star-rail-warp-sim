import "../../css/Stats.css";
import { useState, useContext, useEffect, useRef } from "react";
import SoundContext from "../context/SoundContext";
import CloseButton from "../CloseButton";
import ResizeContext from "../context/ResizeContext";
import { Scrollbars } from "react-custom-scrollbars-2";
import { motion } from "framer-motion";
// import ScrollProgress from "./ScrollProgress";
import StatTotals from "./StatTotals";
import BannerStat from "./BannerStat";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import DefaultModal from "../modals/DefaultModal";
import MiniBanners from "../MiniBanners";

export default function StatsMain({
  setContent,
  bannerType,
  setBannerType,
  bannerState,
  setBannerState,
}) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { t } = useTranslation();

  const { sound, useSound } = useContext(SoundContext);

  const [playClose] = useSound("/assets/audio/sfx/stats-close.mp3");

  const [showDefault, setShowDefault] = useState(false);

  useEffect(() => {
    if (!showDefault) {
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
    }
  }, [sound, setContent, playClose, showDefault]);

  const scrollRef = useRef(null);

  //   const handleSetScrollPosition = () => {
  //     scrollRef.current.scrollTop(1000);
  //   };

  //   const [top, setTop] = useState(0);

  //   const handleScroll = () => {
  //     setTop(scrollRef.current?.getScrollTop());
  //   };

  return (
    <motion.main
      key="details"
      initial={{ filter: "brightness(0)" }}
      animate={{ filter: "brightness(1)" }}
      exit={{ filter: "brightness(0)" }}
      className="stats-back d-flex justify-content-center align-items-center"
      style={{ backgroundImage: "url(assets/details/back.webp)" }}
    >
      <DefaultModal
        type={bannerType}
        show={showDefault}
        setShow={setShowDefault}
        setBannerState={setBannerState}
      />
      <div
        className="stat-nav"
        style={{ height: getHeight(500, 300, 200), width: getWidth(300) }}
      >
        <MiniBanners bannerType={bannerType} setBannerType={setBannerType} />
        {/* <ScrollProgress
          status={
            top /
            (scrollRef.current?.getScrollHeight() -
              scrollRef.current?.getClientHeight())
          }
        /> */}
      </div>
      <div
        className="position-relative overflow-hidden stat-main"
        style={{
          backgroundColor: "#f1f1f1",
          width: "70vw",
          height: "75vh",
          fontSize: getWidth(28, 14),
        }}
      >
        <div
          className="position-relative d-flex justify-content-evenly align-items-center py-2 px-4"
          style={{
            backgroundColor: "#303030",
            top: 0,
            zIndex: 2,
            height: getWidth(70, 30),
            color: "white",
            whiteSpace: "nowrap",
          }}
        >
          {t("stats.total")}
          <div
            id="stick-thing"
            style={{
              width: 1,
              height: getWidth(40),
              backgroundColor: "#c6c6c6",
              margin: `0 ${getWidth(80)}px`,
            }}
          />
          <StatTotals />
          <CloseButton
            style={{ position: "static" }}
            onClose={() => {
              if (sound) playClose();
              setContent("main");
            }}
          />
        </div>
        <Scrollbars
          ref={scrollRef}
          style={{
            height: "78%",
            position: "relative",
            bottom: "0%",
          }}
          //   onScroll={handleScroll}
        >
          <BannerStat
            type={bannerType}
            state={bannerState[bannerType]}
            bannerState={bannerState}
            setBannerState={setBannerState}
          />
        </Scrollbars>
        <div
          className="position-absolute d-flex justify-content-end align-items-center py-2 px-4 w-100"
          style={{
            bottom: 0,
            zIndex: 2,
            height: getWidth(80),
          }}
        >
          <Button
            content={t("button.default")}
            onClick={() => setShowDefault(true)}
          />
        </div>
      </div>
    </motion.main>
  );
}
