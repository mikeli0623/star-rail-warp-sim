import React, { useState, useContext, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import CloseButton from "./CloseButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SoundContext from "./context/SoundContext";
import ResetModal from "./modals/ResetModal";
import VersionModal from "./modals/VersionModal";
import ResizeContext from "./context/ResizeContext";
import DataBankOverlay from "./db/DataBankOverlay";
import CreditsModal from "./modals/CreditsModal";
import PhonoModal from "./modals/PhonoModal";
import LangModal from "./modals/LangModal";
import { useTranslation } from "react-i18next";

const Settings = ({
  vers,
  showDB,
  setShowDB,
  setVers,
  setDBType,
  setContent,
  bgm,
}) => {
  const { getWidth } = useContext(ResizeContext);

  const [showSettings, setShowSettings] = useState(false);

  const handleClose = () => {
    setShowSettings(false);
    if (sound) playMenuClose();
  };
  const handleShow = () => setShowSettings(true);

  const { sound, setSound, setContinueSound, useSound } =
    useContext(SoundContext);

  const [playMenuOpen] = useSound("../assets/audio/sfx/menu-open.mp3");

  const [playMenuClose] = useSound("../assets/audio/sfx/menu-close.mp3");

  const [playMenuSelect] = useSound("../assets/audio/sfx/menu-select.mp3");

  const [playButtonSelect] = useSound(
    "../assets/audio/sfx/menu-button-select.mp3"
  );

  const [playPageOpen] = useSound("../assets/audio/sfx/page-open.mp3");

  const [showReset, setShowReset] = useState(false);

  const [showVersion, setShowVersion] = useState(false);

  const [showCredits, setShowCredits] = useState(false);

  const [showLang, setShowLang] = useState(false);

  const [showPhono, setShowPhono] = useState(false);

  const handleDBSelect = (type) => {
    setDBType(type);
    setContent("data-bank");
  };

  const { i18n } = useTranslation();

  const trackInfo = () => {
    const fileName = bgm[0];
    const regex = /^(.+?)-(.+?)$/;
    const match = fileName.match(regex);
    const title = match[2];
    const album = match[1].replace(/-/g, " ");
    return [album, title];
  };

  useEffect(() => {
    function handleKeyDown({ keyCode }) {
      if (keyCode === 27 && !showSettings && !showDB) {
        if (sound) playMenuSelect();
        setShowSettings(true);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSettings, showDB, sound, playMenuSelect]);

  return (
    <React.Fragment>
      <LazyLoadImage
        effect="opacity"
        id="settings-button"
        alt="Settings Button"
        src="assets/menu/phone.webp"
        width={getWidth(33, 18)}
        onClick={() => {
          handleShow();
          if (sound) playMenuSelect();
        }}
        draggable="false"
      />
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
      <PhonoModal
        show={showPhono}
        setShow={setShowPhono}
        handleSelect={bgm[1]}
        currentAlbum={trackInfo()[0]}
        currentTrack={trackInfo()[1]}
      />
      <Offcanvas
        show={showSettings}
        onHide={handleClose}
        placement="end"
        style={{
          backgroundColor: "#111213",
          color: "#e9e9eb",
          width: getWidth(450, 200),
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
            width={getWidth(356, 160)}
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
              marginBottom: getWidth(20),
            }}
          >
            <LazyLoadImage
              effect="opacity"
              alt="Banner Version Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/banner-version.webp`}
              draggable="false"
              width={getWidth(114, 50)}
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
              width={getWidth(114, 50)}
              onClick={() => {
                if (sound) playButtonSelect();
                setShowDB(true);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Phonograph Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/phono.webp`}
              draggable="false"
              width={getWidth(114, 50)}
              onClick={() => {
                if (sound) playButtonSelect();
                setShowPhono(true);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginBottom: getWidth(20),
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
              width={getWidth(114, 50)}
              onClick={() => {
                playButtonSelect();
                setSound(!sound);
                setContinueSound(!sound);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Reset Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/reset.webp`}
              draggable="false"
              width={getWidth(114, 50)}
              onClick={() => {
                if (sound) playButtonSelect();
                setShowReset(true);
              }}
            />
            <LazyLoadImage
              effect="opacity"
              alt="Language Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/language.webp`}
              draggable="false"
              width={getWidth(114, 50)}
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
            }}
          >
            <LazyLoadImage
              effect="opacity"
              alt="Credits Button"
              className="menu-button"
              src={`assets/menu/${i18n.resolvedLanguage}/credits.webp`}
              draggable="false"
              width={getWidth(114, 50)}
              onClick={() => {
                if (sound) playButtonSelect();

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
                width={getWidth(114, 50)}
                onClick={() => {
                  if (sound) {
                    playButtonSelect();
                    playPageOpen();
                  }
                }}
              />
            </a>
            <a
              href="https://ko-fi.com/mikeli0623"
              target="_blank"
              rel="noreferrer"
            >
              <LazyLoadImage
                effect="opacity"
                alt="Support Button"
                className="menu-button"
                src={`assets/menu/${i18n.resolvedLanguage}/panhandling.webp`}
                draggable="false"
                width={getWidth(114, 50)}
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
