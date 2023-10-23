import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import SoundContext from "../context/SoundContext";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import Checkbox from "../Checkbox";

export default function StartModal({ show, setShow }) {
  const { sound, setSound, setContinueSound, useSound } =
    useContext(SoundContext);
  const [wantSound, setWantSound] = useState(true);
  const handleClose = () => {
    setShow(false);
    setSound(wantSound);
    setContinueSound(wantSound);
  };
  const [playModalClose] = useSound("../assets/audio/sfx/modal-close.mp3");

  const { t } = useTranslation();

  const [checked, setChecked] = useState(true);

  const handleSound = () => {
    setWantSound(!wantSound);
    setChecked(!checked);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      onExiting={() => {
        if (sound) playModalClose();
      }}
      keyboard={false}
      centered
    >
      <Modal.Header style={{ backgroundColor: "#e9e7e2" }}>
        <Modal.Title style={{ fontWeight: "bold" }}>What's New</Modal.Title>
        <CloseButton
          onClose={handleClose}
          variant="dark"
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#e9e7e2" }}>
        <p style={{ color: "#868686" }}>
          <span style={{ color: "black" }}>Oct. 10/23/23:</span> Various changes
          and fixes.
        </p>
        <a
          href="https://github.com/mikeli0623/star-rail-warp-sim/commits/main"
          style={{ color: "#868686" }}
        >
          More info
        </a>
      </Modal.Body>
      <Modal.Footer
        className="justify-content-between"
        style={{ backgroundColor: "#e9e7e2" }}
      >
        <Checkbox
          handleCheck={handleSound}
          checked={checked}
          text={t("button.sound")}
        />
        <Button
          onClick={handleClose}
          content={
            <span className="d-flex align-items-center justify-content-center">
              <img
                className="mx-1"
                alt="Confirm"
                src="assets/button-confirm.webp"
                width={18}
              />
              {t("button.close")}
            </span>
          }
          size="sm"
          resize={false}
        />
      </Modal.Footer>
    </Modal>
  );
}
