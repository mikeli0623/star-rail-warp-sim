import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import SoundContext from "../context/SoundContext";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { allVers, hidden, json } from "../../util/Constants";
import VersionInfo from "../VersionInfo";
import { useTranslation } from "react-i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import Checkbox from "../Checkbox";

export default function VersionModal({
  show,
  setShow,
  currentVers,
  setVers,
  bannerType,
  setBannerType,
}) {
  const { sound, useSound } = useContext(SoundContext);
  const handleClose = () => {
    setShow(false);
  };

  const [playModalOpen] = useSound("../assets/audio/sfx/banner-open.mp3");
  const [playModalClose] = useSound("../assets/audio/sfx/banner-close.mp3");

  const [selected, setSelected] = useState(currentVers);

  const { t } = useTranslation();

  const [showHidden, setShowHidden] = useState(false);

  const handleCheck = () => setShowHidden(!showHidden);

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
      centered
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
      <Modal.Body
        style={{
          backgroundColor: "#e9e7e2",
        }}
      >
        <Scrollbars
          style={{
            height: "50vh",
            width: "100%",
          }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
          {allVers
            .filter((ver) => {
              if (showHidden) return true;
              return !hidden.includes(ver);
            })
            .map((vers, i) => {
              return (
                <VersionInfo
                  key={vers + i}
                  isCurrentSelected={vers === selected}
                  vers={vers}
                  setSelected={setSelected}
                />
              );
            })}
        </Scrollbars>
      </Modal.Body>
      <Modal.Footer
        className="d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#e9e7e2" }}
      >
        <Button
          cancel
          onClick={() => {
            handleClose();
            setSelected(currentVers);
          }}
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
        {/* <Checkbox
          text="Hidden"
          handleCheck={handleCheck}
          checked={showHidden}
        /> */}
        <Button
          onClick={() => {
            setVers(selected);
            sessionStorage.setItem("vers", selected);
            if (bannerType.includes("rerun") && !json.checkRerun(selected)) {
              if (bannerType.includes("char")) setBannerType("char");
              else setBannerType("weap");
            }
            handleClose();
          }}
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
