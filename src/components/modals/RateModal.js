import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import SoundContext from "../context/SoundContext";
import CloseButton from "../CloseButton";
import { json } from "../../util/Constants";
import { useTranslation } from "react-i18next";
import RateIcon from "../RateIcon";

export default function RateModal({ show, setShow, vers, type }) {
  const { sound, useSound } = useContext(SoundContext);
  const handleClose = () => setShow(false);

  const { t } = useTranslation();

  const [playModalOpen] = useSound("../assets/audio/sfx/rate-open.mp3", {
    volume: 0.8,
  });
  const [playModalClose] = useSound("../assets/audio/sfx/rate-close.mp3", {
    volume: 0.8,
  });
  const [playSelect] = useSound("/assets/audio/sfx/item-select.mp3");

  const handleSelect = () => {
    if (sound) playSelect();
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
      <Modal.Header
        style={{
          backgroundColor: "#e9e7e2",
        }}
      >
        <Modal.Title style={{ fontWeight: "bold" }}>
          {t(`modal.rate.title.${type}`)}
        </Modal.Title>
        <CloseButton
          onClose={handleClose}
          variant="dark"
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#e9e7e2",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          color: "#686868",
          fontSize: 18,
        }}
      >
        {t("modal.rate.rate5")}
        <RateIcon
          item={json.getRateUpFive(vers, type)[0]}
          rarity="5"
          type={type}
          handleSelect={handleSelect}
        />
        {t("modal.rate.rate4")}
        <span style={{ display: "flex" }}>
          {json.getRateUpFour(vers, type).map((item) => {
            return (
              <RateIcon
                key={item}
                item={item}
                rarity="4"
                type={type}
                handleSelect={handleSelect}
              />
            );
          })}
        </span>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#e9e7e2" }} />
    </Modal>
  );
}
