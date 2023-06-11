import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import SoundContext from "../context/SoundContext";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { useTranslation } from "react-i18next";

export default function DefaultModal({ show, setShow, type, setBannerState }) {
  const { sound, useSound } = useContext(SoundContext);
  const handleClose = () => setShow(false);
  const [playModalOpen] = useSound("../assets/audio/sfx/modal-open.mp3");
  const [playModalClose] = useSound("../assets/audio/sfx/modal-close.mp3");

  const { t } = useTranslation();

  const typeMap = {
    beginner: "beg",
    char: "char",
    weap: "weap",
    standard: "stand",
  };

  const defaultState = {
    beginner: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 50,
      softPity: 50,
      guaranteeFive: localStorage.getItem("begGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("begGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("begPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("begPityFour")) || 0,
    },
    char: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 90,
      softPity: 75,
      guaranteeFive: localStorage.getItem("charGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("charGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("charPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("charPityFour")) || 0,
    },
    weap: {
      rateFive: 0.008,
      rateFour: 0.066,
      maxPity: 80,
      softPity: 65,
      guaranteeFive: localStorage.getItem("weapGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("weapGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("weapPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("weapPityFour")) || 0,
    },
    standard: {
      rateFive: 0.006,
      rateFour: 0.051,
      maxPity: 90,
      softPity: 75,
      guaranteeFive: localStorage.getItem("standGuaranteeFive") === "true",
      guaranteeFour: localStorage.getItem("standGuaranteeFour") === "true",
      pityFive: parseInt(localStorage.getItem("standPityFive")) || 0,
      pityFour: parseInt(localStorage.getItem("standPityFour")) || 0,
    },
  };

  const handleDefault = () => {
    localStorage.removeItem(typeMap[type] + "RateFive");
    localStorage.removeItem(typeMap[type] + "RateFour");
    localStorage.removeItem(typeMap[type] + "HardPity");
    localStorage.removeItem(typeMap[type] + "SoftPity");

    setBannerState((prev) => {
      return { ...prev, [type]: defaultState[type] };
    });
    handleClose();
  };

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
          {t("modal.default.title")}
        </Modal.Title>
        <CloseButton
          onClose={handleClose}
          variant="dark"
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#e9e7e2" }}>
        {t("modal.default.body")}
      </Modal.Body>
      <Modal.Footer
        className="justify-content-between"
        style={{ backgroundColor: "#e9e7e2" }}
      >
        <Button
          cancel
          onClick={() => handleClose()}
          content={
            <span className="d-flex align-items-center justify-content-center">
              <img
                className="mx-1"
                alt="Cancel"
                src="assets/button-cancel.webp"
                width={18}
              />
              {t("button.cancel")}
            </span>
          }
          size="sm"
          resize={false}
        />
        <Button
          onClick={() => handleDefault()}
          content={
            <span className="d-flex align-items-center justify-content-center">
              <img
                className="mx-1"
                alt="Confirm"
                src="assets/button-confirm.webp"
                width={18}
              />
              {t("button.confirm")}
            </span>
          }
          size="sm"
          resize={false}
        />
      </Modal.Footer>
    </Modal>
  );
}
