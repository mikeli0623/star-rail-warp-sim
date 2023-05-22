import React, { useState, useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Tooltip from "react-bootstrap/Tooltip";
import CloseButton from "./CloseButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import ResetModal from "./modals/ResetModal";
import VersionModal from "./modals/VersionModal";
import ResizeContext from "./ResizeContext";
import DataBankOverlay from "./DataBankOverlay";
import CreditsModal from "./modals/CreditsModal";
import LangModal from "./modals/LangModal";
import { useTranslation } from "react-i18next";

const Settings = ({
  lockout,
  vers,
  showDB,
  setShowDB,
  setVers,
  setDBType,
  setContent,
  fancy,
  setFancy,
}) => {
  const { getWidth } = useContext(ResizeContext);

  const [showSettings, setShowSettings] = useState(false);

  const handleClose = () => {
    setShowSettings(false);
    if (sound) playMenuClose();
  };
  const handleShow = () => setShowSettings(true);

  const [playMenuOpen] = useSound("../assets/audio/sfx/menu-open.mp3");

  const [playMenuClose] = useSound("../assets/audio/sfx/menu-close.mp3");

  const [playMenuSelect] = useSound("../assets/audio/sfx/menu-select.mp3");

  const [playButtonSelect] = useSound(
    "../assets/audio/sfx/menu-button-select.mp3"
  );

  const [playPageOpen] = useSound("../assets/audio/sfx/page-open.mp3");
  // const [playPhonoOpen] = useSound("../assets/audio/sfx/phono-open-1.mp3");
  const [playModalOpen] = useSound("../assets/audio/sfx/modal-open.mp3");

  const { sound, setSound } = useContext(SoundContext);

  const [showReset, setShowReset] = useState(false);

  const [showVersion, setShowVersion] = useState(false);

  const [showCredits, setShowCredits] = useState(false);

  const [showLang, setShowLang] = useState(false);

  const handleDBSelect = (type) => {
    setDBType(type);
    setContent("data-bank");
  };

  const { i18n } = useTranslation();

  return (
    <React.Fragment>
      <LazyLoadImage
        effect="opacity"
        id="settings-button"
        alt="Settings Button"
        src="assets/menu/phone.webp"
        width={getWidth(33)}
        onClick={() => {
          handleShow();
          if (sound) playMenuSelect();
        }}
        draggable="false"
      />
      <Tooltip id="button-tooltip">Coming soon...</Tooltip>
      <ResetModal show={showReset} setShow={setShowReset} />
      <VersionModal
        show={showVersion}
        setShow={setShowVersion}
        currentVers={vers}
        setVers={setVers}
      />
      <DataBankOverlay
        show={showDB}
        setShow={setShowDB}
        handleSelect={handleDBSelect}
      />
      <CreditsModal show={showCredits} setShow={setShowCredits} />
      <LangModal show={showLang} setShow={setShowLang} />
      <Offcanvas
        show={showSettings}
        onHide={handleClose}
        placement="end"
        style={{
          backgroundColor: "#111213",
          color: "#e9e9eb",
          width: getWidth(450),
        }}
        onEntering={() => {
          if (sound) setTimeout(() => playMenuOpen(), 200);
        }}
      >
        <Offcanvas.Header>
          <LazyLoadImage
            effect="opacity"
            alt="Game Logo"
            src={`assets/menu/${i18n.resolvedLanguage}/logo.webp`}
            draggable="false"
            width={getWidth(356)}
          />
          <CloseButton onClose={handleClose} />
        </Offcanvas.Header>
        <Offcanvas.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: getWidth(20),
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginBottom: getWidth(15),
            }}
          >
            <LazyLoadImage
              effect="opacity"
              alt="Banner Version Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/banner-version.webp`}
              draggable="false"
              width={getWidth(114)}
              onClick={() => {
                if (sound) playButtonSelect();
                setShowVersion(true);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Data Bank Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/data-bank.webp`}
              draggable="false"
              width={getWidth(114)}
              onClick={() => {
                if (sound) playButtonSelect();
                setShowDB(true);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Language Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/language.webp`}
              draggable="false"
              width={getWidth(114)}
              onClick={() => {
                if (sound) playButtonSelect();
                setShowLang(true);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginBottom: getWidth(15),
            }}
          >
            <LazyLoadImage
              effect="opacity"
              alt="Audio Toggle Button"
              className="menu-button"
              src={`./assets/menu/${i18n.resolvedLanguage}/audio-${
                sound ? "on" : "off"
              }.webp`}
              draggable="false"
              title={lockout ? "Sounds are loading..." : ""}
              width={getWidth(114)}
              onClick={() => {
                if (!lockout) {
                  playButtonSelect();
                  setSound(!sound);
                }
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Fancy Animations Toggle Button"
              className="menu-button"
              src={`./assets/menu/${i18n.resolvedLanguage}/fancy-${
                fancy ? "on" : "off"
              }.webp`}
              draggable="false"
              width={getWidth(114)}
              onClick={() => {
                if (sound) playButtonSelect();
                setFancy(!fancy);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Reset Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/reset.webp`}
              draggable="false"
              width={getWidth(114)}
              onClick={() => {
                if (sound) {
                  playButtonSelect();
                  playModalOpen();
                }
                setShowReset(true);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <LazyLoadImage
              effect="opacity"
              alt="Credits Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/credits.webp`}
              draggable="false"
              width={getWidth(114)}
              onClick={() => {
                if (sound) {
                  playButtonSelect();
                  playModalOpen();
                }
                setShowCredits(true);
              }}
            />
            <a
              href="https://github.com/mikeli0623/star-rail"
              target="_blank"
              rel="noreferrer"
            >
              <LazyLoadImage
                effect="opacity"
                alt="GitHub Link"
                className="menu-button"
                src={`assets/menu/${i18n.resolvedLanguage}/plug.webp`}
                draggable="false"
                width={getWidth(114)}
                onClick={() => {
                  if (sound) {
                    playButtonSelect();
                    playPageOpen();
                  }
                }}
              />
            </a>
            <a href="https://ko-fi.com/hbhhi" target="_blank" rel="noreferrer">
              <LazyLoadImage
                effect="opacity"
                alt="Language Button"
                className="menu-button"
                src={`assets/menu/${i18n.resolvedLanguage}/panhandling.webp`}
                draggable="false"
                width={getWidth(114)}
                onClick={() => {
                  if (sound) {
                    playButtonSelect();
                    playPageOpen();
                  }
                }}
              />
            </a>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};

export default Settings;
