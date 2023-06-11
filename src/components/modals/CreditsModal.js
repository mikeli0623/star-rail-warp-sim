import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import SoundContext from "../context/SoundContext";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { useTranslation } from "react-i18next";

export default function CreditsModal({ show, setShow }) {
  const { sound, useSound } = useContext(SoundContext);
  const handleClose = () => {
    setShow(false);
  };

  const [playModalOpen] = useSound("../assets/audio/sfx/modal-open.mp3");
  const [playModalClose] = useSound("../assets/audio/sfx/modal-close.mp3");

  const { t } = useTranslation();

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
          {t("modal.credits.title")}
        </Modal.Title>
        <CloseButton
          onClose={handleClose}
          variant="dark"
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#e9e7e2" }}>
        {t("modal.credits.body1")}
        <br />
        {t("modal.credits.body2")}
        <ul>
          <li>
            <a
              href="https://www.flaticon.com/free-icons/reset"
              title="Reset Icons"
              target="_blank"
              rel="noreferrer"
            >
              Reset icons created by inkubators - Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.com/free-icons/country"
              title="Country Icons"
              target="_blank"
              rel="noreferrer"
            >
              Country icons created by Freepik - Flaticon
            </a>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#e9e7e2" }}>
        <Button
          onClick={() => handleClose()}
          content={
            <span className="d-flex align-items-center justify-content-center">
              <img
                className="mx-1"
                alt="Cancel"
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
