import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import useSound from "use-sound";
import SoundContext from "../SoundContext";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { useTranslation } from "react-i18next";

export default function ResetModal({ show, setShow }) {
  const { sound } = useContext(SoundContext);
  const handleClose = () => setShow(false);
  const [playModalClose] = useSound("../assets/audio/sfx/modal-close.mp3");
  const [playButton] = useSound("/assets/audio/sfx/button-select.mp3");
  const [playCancel] = useSound("/assets/audio/sfx/button-cancel.mp3");

  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      onExiting={() => {
        if (sound) playModalClose();
      }}
    >
      <Modal.Header style={{ backgroundColor: "#e9e7e2" }}>
        <Modal.Title style={{ fontWeight: "bold" }}>
          {t("modal.reset.title")}
        </Modal.Title>
        <CloseButton
          onClose={handleClose}
          variant="dark"
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#e9e7e2" }}>
        {t("modal.reset.body")}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#e9e7e2" }}>
        <Button
          onClick={() => {
            handleClose();
            if (sound) {
              playCancel();
            }
          }}
          content={t("button.cancel")}
          size="sm"
          resize={false}
        />
        <Button
          onClick={() => {
            if (sound) playButton();
            setTimeout(() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            }, 250);
          }}
          style={{ color: "#c42c2c" }}
          content={t("button.reset")}
          size="sm"
          resize={false}
        />
      </Modal.Footer>
    </Modal>
  );
}
