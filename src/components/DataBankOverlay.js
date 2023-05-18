import "../css/DataBank.css";
import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSound from "use-sound";
import SoundContext from "./SoundContext";
import ResizeContext from "./ResizeContext";

export default function DataBankOverlay({ show, setShow, handleSelect }) {
  const { getWidth } = useContext(ResizeContext);
  const { sound } = useContext(SoundContext);

  const [playMenuOpen] = useSound("../assets/audio/sfx/db-menu-open.mp3");
  const [playMenuClose] = useSound("../assets/audio/sfx/db-menu-close.mp3");
  const [playSelect] = useSound("../assets/audio/sfx/db-select.mp3");

  const handleClose = () => setShow(false);
  return (
    <Modal
      className="db"
      style={{ backgroundColor: "rgba(24, 29, 49, 0.8)" }}
      show={show}
      onHide={handleClose}
      centered
      onEntering={() => {
        if (sound) playMenuOpen();
      }}
      onExiting={() => {
        if (sound) playMenuClose();
      }}
    >
      <LazyLoadImage
        className="db-type-icon"
        effect="opacity"
        alt="Characters Icon"
        src="/assets/db-char-icon.webp"
        onClick={() => {
          if (sound) playSelect();
          handleSelect("char");
        }}
        draggable="false"
      />
      <LazyLoadImage
        className="db-type-icon"
        effect="opacity"
        alt="Light Cones Icon"
        src="/assets/db-weap-icon.webp"
        onClick={() => {
          if (sound) playSelect();
          handleSelect("weap");
        }}
        draggable="false"
      />
    </Modal>
  );
}
