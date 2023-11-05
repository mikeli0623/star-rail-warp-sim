import React, { useContext, useState } from "react";
import "../../css/Phono.css";
import Modal from "react-bootstrap/Modal";
import SoundContext from "../context/SoundContext";
import CloseButton from "../CloseButton";
import Button from "../Button";
import { BGM } from "../../util/Constants";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PhonoTrack from "../PhonoTrack";
import Checkbox from "../Checkbox";
const trans = require("../../assets/data/translations.json");

export default function PhonoModal({
  show,
  setShow,
  currentAlbum,
  currentTrack,
  handleSelect,
}) {
  const { sound, useSound, setSoundEnabled, loaded } = useContext(SoundContext);

  const handleClose = () => setShow(false);

  const [playModalOpen] = useSound(
    `../assets/audio/sfx/phono-open-${Math.random() < 0.5 ? 1 : 2}.mp3`
  );
  const [playModalClose] = useSound("../assets/audio/sfx/phono-close.mp3");
  const [playButton] = useSound("/assets/audio/sfx/phono-select.mp3");
  const [playTrack1] = useSound("/assets/audio/sfx/phono-track-select-1.mp3");
  const [playTrack2] = useSound("/assets/audio/sfx/phono-track-select-2.mp3");
  const [playRepeat] = useSound("/assets/audio/sfx/version-repeat.mp3");
  const [playAlbumSelect] = useSound(
    "/assets/audio/sfx/phono-album-select.mp3"
  );

  const { t, i18n } = useTranslation();

  const handleAlbum = (selected) => {
    if (chosenAlbum !== selected) {
      if (sound) playAlbumSelect();
      setChosenAlbum(selected);

      if (BGM[selected].includes(chosenTrack)) {
        setFillerAlbumChangeTrack(undefined);
        setFillerAlbumChangeAlbum(undefined);
      } else {
        setFillerAlbumChangeTrack(BGM[selected][0]);
        setFillerAlbumChangeAlbum(selected);
      }
    }
  };

  const [actualAlbum, setActualAlbum] = useState(currentAlbum);

  const [actualTrack, setActualTrack] = useState(currentTrack);

  const [chosenAlbum, setChosenAlbum] = useState(currentAlbum);

  const [chosenTrack, setChosenTrack] = useState(currentTrack);

  const [fillerAlbumChangeTrack, setFillerAlbumChangeTrack] =
    useState(undefined);

  const [fillerAlbumChangeAlbum, setFillerAlbumChangeAlbum] =
    useState(undefined);

  const [checked, setChecked] = useState(
    localStorage.getItem("bgm") ? JSON.parse(localStorage.getItem("bgm")) : true
  );

  const handleBGM = () => {
    localStorage.setItem("bgm", (!checked).toString());
    setChecked(!checked);
    setSoundEnabled(!checked);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
      }}
      onEntering={() => {
        if (sound) playModalOpen();
      }}
      onExiting={() => {
        if (sound) playModalClose();
        handleSelect(
          actualAlbum + "-" + actualTrack,
          actualAlbum === chosenAlbum && actualTrack === chosenTrack
        );
        setChosenAlbum(actualAlbum);
        setChosenTrack(actualTrack);
      }}
      className="phono-modal"
      centered
    >
      <Modal.Header
        style={{
          backgroundColor: "#23252f",
          borderBottom: "none",
          color: "white",
        }}
      >
        <Modal.Title>
          <LazyLoadImage
            className="phono-icon"
            effect="opacity"
            alt="Phonograph Icon"
            src="./assets/phono/phono-icon.webp"
            draggable="false"
          />
          {t("modal.phono.title")}
        </Modal.Title>
        <CloseButton
          onClose={() => {
            handleClose();
          }}
          style={{ transform: "translate(-10%, -10%)" }}
          resize={false}
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#23252f" }}>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-column p-2 phono-albums">
            <div style={{ position: "relative" }}>
              <LazyLoadImage
                className="mx-2 mb-3 phono-album"
                actual={(chosenAlbum === "ooc").toString()}
                effect="opacity"
                alt="Album Art"
                src="./assets/phono/ooc.webp"
                onClick={() => handleAlbum("ooc")}
                draggable="false"
              />
              {actualAlbum === "ooc" && (
                <LazyLoadImage
                  alt="Current BGM"
                  className="current-icon"
                  effect="opacity"
                  draggable="false"
                  src="assets/phono/current.webp"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translate(-80%, -20%)",
                  }}
                />
              )}
            </div>
            <div style={{ position: "relative" }}>
              <LazyLoadImage
                className="mx-2 my-3 phono-album"
                actual={(chosenAlbum === "osae").toString()}
                effect="opacity"
                alt="Album Art"
                src="./assets/phono/osae.webp"
                onClick={() => handleAlbum("osae")}
                draggable="false"
              />
              {actualAlbum === "osae" && (
                <LazyLoadImage
                  alt="Current BGM"
                  className="current-icon"
                  effect="opacity"
                  draggable="false"
                  src="assets/phono/current.webp"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translate(-80%, -20%)",
                  }}
                />
              )}
            </div>
            <div style={{ position: "relative" }}>
              <LazyLoadImage
                className="mx-2 mt-3 phono-album"
                actual={(chosenAlbum === "ss").toString()}
                effect="opacity"
                alt="Album Art"
                src="./assets/phono/ss.webp"
                onClick={() => handleAlbum("ss")}
                draggable="false"
              />
              {actualAlbum === "ss" && (
                <LazyLoadImage
                  alt="Current BGM"
                  className="current-icon"
                  effect="opacity"
                  draggable="false"
                  src="assets/phono/current.webp"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translate(-80%, -20%)",
                  }}
                />
              )}
            </div>
          </div>
          <div style={{ color: "white" }}>
            <div className="mx-2" style={{ fontSize: 20 }}>
              <em>{trans[chosenAlbum][i18n.resolvedLanguage]}</em>
            </div>
            {BGM[chosenAlbum].map((track) => {
              return (
                <PhonoTrack
                  key={trans[track][i18n.resolvedLanguage]}
                  track={trans[track][i18n.resolvedLanguage]}
                  actual={actualTrack === track}
                  chosen={chosenTrack === track}
                  filler={fillerAlbumChangeTrack === track}
                  muted={!sound || !checked}
                  loaded={loaded}
                  handleSelect={() => {
                    handleSelect(chosenAlbum + "-" + track);
                    setFillerAlbumChangeAlbum(undefined);
                    setFillerAlbumChangeTrack(undefined);
                    if (sound) {
                      if (chosenTrack !== track)
                        Math.random() < 0.5 ? playTrack1() : playTrack2();
                      else playRepeat();
                    }
                    setChosenTrack(track);
                  }}
                />
              );
            })}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        className="d-flex justify-content-between align-items-center px-4"
        style={{ backgroundColor: "#23252f", borderTop: "none" }}
      >
        <Checkbox handleCheck={handleBGM} checked={checked} text="BGM" />
        <Button
          onClick={() => {
            if (!(actualTrack === chosenTrack && !fillerAlbumChangeTrack)) {
              if (sound) playButton();
              setActualAlbum(
                fillerAlbumChangeAlbum ? fillerAlbumChangeAlbum : chosenAlbum
              );
              setActualTrack(
                fillerAlbumChangeTrack ? fillerAlbumChangeTrack : chosenTrack
              );
              if (fillerAlbumChangeTrack) {
                handleSelect(
                  fillerAlbumChangeAlbum + "-" + fillerAlbumChangeTrack
                );
                setChosenAlbum(fillerAlbumChangeAlbum);
                setChosenTrack(fillerAlbumChangeTrack);
              }
              setFillerAlbumChangeTrack(undefined);
              setFillerAlbumChangeAlbum(undefined);
            }
          }}
          content={
            actualTrack === chosenTrack && !fillerAlbumChangeTrack
              ? t("button.current")
              : t("button.phono")
          }
          size="md"
          muted
          disabled={actualTrack === chosenTrack && !fillerAlbumChangeTrack}
          resize={false}
        />
      </Modal.Footer>
    </Modal>
  );
}
