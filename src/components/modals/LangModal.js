import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import useSound from "use-sound";
import SoundContext from "../SoundContext";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { useTranslation } from "react-i18next";

const langs = {
  en: { nativeName: "English" },
  zh: { nativeName: "中文" },
};

export default function LangModal({ show, setShow }) {
  const { sound } = useContext(SoundContext);
  const handleClose = () => setShow(false);

  const { t, i18n } = useTranslation();

  const [playModalOpen] = useSound("../assets/audio/sfx/banner-open.mp3");
  const [playModalClose] = useSound("../assets/audio/sfx/banner-close.mp3");
  const [playButton] = useSound("/assets/audio/sfx/button-select.mp3");
  const [playCancel] = useSound("/assets/audio/sfx/button-cancel.mp3");

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
    >
      <Modal.Header style={{ backgroundColor: "#e9e7e2" }}>
        <Modal.Title style={{ fontWeight: "bold" }}>
          {t("modal.lang.title")}
        </Modal.Title>
        <CloseButton
          onClose={handleClose}
          variant="dark"
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#e9e7e2", display: "flex" }}>
        {Object.keys(langs).map((lang) => (
          <Button
            key={lang}
            style={{
              fontWeight: i18n.resolvedLanguage === lang ? "bold" : "normal",
              margin: "0 5px",
            }}
            size="sm"
            text={
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <img
                  alt="country icon"
                  src={`assets/lang-icons/${lang}.webp`}
                  width={22}
                />
                {langs[lang].nativeName}
              </span>
            }
            onClick={() => {
              i18n.changeLanguage(lang);
              if (sound) playButton();
            }}
          />
        ))}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#e9e7e2" }}>
        <Button
          onClick={() => {
            if (sound) {
              playCancel();
            }
            handleClose();
          }}
          text={t("button.close")}
          size="sm"
          resize={false}
        />
      </Modal.Footer>
    </Modal>
  );
}
