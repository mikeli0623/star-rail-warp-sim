import React, { useState, useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CloseButton from "./CloseButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import ResetModal from "./ResetModal";
import VersionModal from "./VersionModal";
import ResizeContext from "./ResizeContext";

const Settings = ({ lockout, vers, setVers }) => {
  const { getWidth } = useContext(ResizeContext);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    if (sound) playMenuClose();
  };
  const handleShow = () => setShow(true);

  const [playMenuOpen] = useSound("../assets/audio/sfx/menu-open.mp3");

  const [playMenuClose] = useSound("../assets/audio/sfx/menu-close.mp3");

  const [playMenuSelect] = useSound("../assets/audio/sfx/menu-select.mp3");

  const [playButtonSelect] = useSound(
    "../assets/audio/sfx/menu-button-select.mp3"
  );

  const [playVersionOpen] = useSound("../assets/audio/sfx/banner-open.mp3");
  const [playPageOpen] = useSound("../assets/audio/sfx/page-open.mp3");
  const [playDataBankOpen] = useSound("../assets/audio/sfx/db-menu-open.mp3");
  const [playPhonoOpen] = useSound("../assets/audio/sfx/phono-open-1.mp3");

  const [playModalOpen] = useSound("../assets/audio/sfx/modal-open.mp3");

  const { sound, setSound } = useContext(SoundContext);

  const [showReset, setShowReset] = useState(false);

  const handleShowReset = () => setShowReset(true);

  const [showVersion, setShowVersion] = useState(false);

  const handleShowVersion = () => setShowVersion(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Coming soon...
    </Tooltip>
  );

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
      <Offcanvas
        show={show}
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
            src="assets/menu/logo.webp"
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
              src="assets/menu/banner-version.webp"
              draggable="false"
              width={getWidth(114)}
              onClick={() => {
                if (sound) {
                  playButtonSelect();
                  playVersionOpen();
                }
                handleShowVersion();
              }}
            />
            <OverlayTrigger
              placement="top"
              delay={{ show: 400, hide: 200 }}
              overlay={renderTooltip}
            >
              <LazyLoadImage
                effect="opacity"
                alt="Data Bank Button"
                className="menu-button disabled"
                src="assets/menu/data-bank.webp"
                draggable="false"
                width={getWidth(114)}
                onClick={() => {
                  if (sound) {
                    playButtonSelect();
                    playDataBankOpen();
                  }
                }}
              />
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 400, hide: 200 }}
              overlay={renderTooltip}
            >
              <LazyLoadImage
                effect="opacity"
                alt="Phonograph Button"
                className="menu-button disabled"
                src="assets/menu/phonograph.webp"
                draggable="false"
                width={getWidth(114)}
                onClick={() => {
                  if (sound) {
                    playButtonSelect();
                    playPhonoOpen();
                  }
                }}
              />
            </OverlayTrigger>
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
              alt="Audio Toggle Button"
              className="menu-button"
              src={`./assets/menu/audio-${sound ? "on" : "off"}.webp`}
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
              alt="Reset Button"
              className="menu-button"
              src="assets/menu/reset.webp"
              draggable="false"
              width={getWidth(114)}
              onClick={() => {
                if (sound) {
                  playButtonSelect();
                  playModalOpen();
                }
                handleShowReset();
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
                src="assets/menu/plug.webp"
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
