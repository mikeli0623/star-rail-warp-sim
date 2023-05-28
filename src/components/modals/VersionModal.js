import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import useSound from "use-sound";
import SoundContext from "../SoundContext";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { allVers } from "../../util/Constants";
import VersionInfo from "../VersionInfo";
import { useTranslation } from "react-i18next";

export default function VersionModal({ show, setShow, currentVers, setVers }) {
  const { sound } = useContext(SoundContext);
  const handleClose = () => {
    setShow(false);
  };

  const [playModalOpen] = useSound("../assets/audio/sfx/banner-open.mp3");
  const [playModalClose] = useSound("../assets/audio/sfx/banner-close.mp3");
  const [playButton] = useSound("/assets/audio/sfx/button-select.mp3");
  const [playCancel] = useSound("/assets/audio/sfx/button-cancel.mp3");

  const [selected, setSelected] = useState(currentVers);

  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        setSelected(currentVers);
      }}
      onEntering={() => {
        if (sound) playModalOpen();
      }}
      onExiting={() => {
        if (sound) playModalClose();
      }}
    >
      <Modal.Header style={{ backgroundColor: "#e9e7e2" }}>
        <Modal.Title style={{ fontWeight: "bold" }}>
          {t("modal.vers.title")}
        </Modal.Title>
        <CloseButton
          onClose={() => {
            handleClose();
            setSelected(currentVers);
          }}
          variant="dark"
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#e9e7e2" }}>
        {allVers.map((vers, i) => {
          return (
            <VersionInfo
              key={vers + i}
              isCurrentSelected={vers === selected}
              vers={vers}
              setSelected={setSelected}
            />
          );
        })}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#e9e7e2" }}>
        <Button
          onClick={() => {
            if (sound) {
              playCancel();
            }
            handleClose();
            setSelected(currentVers);
          }}
          content={t("button.cancel")}
          size="sm"
          resize={false}
        />
        <Button
          onClick={() => {
            if (sound) playButton();
            setVers(selected);
            sessionStorage.setItem("vers", selected);
            handleClose();
          }}
          content={t("button.confirm")}
          size="sm"
          resize={false}
        />
      </Modal.Footer>
    </Modal>
  );
}
