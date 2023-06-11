import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import SoundContext from "../context/SoundContext";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import Checkbox from "../Checkbox";

export default function StatsModal({ show, setShow }) {
  const { sound, useSound } = useContext(SoundContext);

  const handleClose = () => setShow(false);

  const [playModalOpen] = useSound("../assets/audio/sfx/modal-open.mp3");
  const [playModalClose] = useSound("../assets/audio/sfx/modal-close.mp3");
  const [playCancel] = useSound("/assets/audio/sfx/button-cancel.mp3");

  const { t } = useTranslation();

  const [stats, setStats] = useState({
    beginner: { total: parseInt(localStorage.getItem("beginnerTotal")) || 0 },
    char: { total: parseInt(localStorage.getItem("charTotal")) || 0 },
    weap: { total: parseInt(localStorage.getItem("weapTotal")) || 0 },
    standard: { total: parseInt(localStorage.getItem("standardTotal")) || 0 },
  });

  const [cheat, setCheat] = useState(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      onEntering={() => {
        if (sound) playModalOpen();
      }}
      onExiting={() => {
        if (sound) playModalClose();
      }}
      centered
    >
      <Modal.Header style={{ backgroundColor: "#e9e7e2" }}>
        <Modal.Title style={{ fontWeight: "bold" }}>
          {t("modal.vers.title")}
        </Modal.Title>
        <CloseButton
          onClose={handleClose}
          variant="dark"
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body
        style={{ backgroundColor: "#e9e7e2" }}
        className="d-flex flex-column"
      >
        <div>
          Stellar Jade spent:{" "}
          {Object.values(stats).reduce((acc, val) => acc + val.total, 0) * 160}
        </div>
        <div># Beginner Warps: {stats.beginner.total}</div>
        <div># Character Warps: {stats.char.total}</div>
        <div># Light Cone Warps: {stats.weap.total}</div>
        <div># Stellar Warps:{stats.standard.total}</div>
      </Modal.Body>
      <Modal.Footer
        className="justify-content-between"
        style={{ backgroundColor: "#e9e7e2" }}
      >
        <Checkbox
          handleCheck={() => setCheat(!cheat)}
          checked={cheat}
          text="Cheat"
        />
        <Button
          onClick={() => {
            if (sound) playCancel();
            handleClose();
          }}
          content={
            <span className="d-flex align-items-center justify-content-center">
              <img
                className="mx-1"
                alt="Close"
                src="assets/button-cancel.webp"
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
