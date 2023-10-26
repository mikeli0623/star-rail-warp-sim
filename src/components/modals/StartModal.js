import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    fetch("https://api.github.com/repos/mikeli0623/star-rail-warp-sim/commits")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let list = [];
        let i = 0;
        while (list.length < 5) {
          if (!data[i].commit.message.includes("Merge pull request"))
            list.push(data[i].commit);
          i++;
        }
        setCommits(list);
        console.log(list);
      });
  }, []);

  const [commits, setCommits] = useState([]);

  const convertISODateToCustomFormat = (isoDate) => {
    const dateObj = new Date(isoDate);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = String(dateObj.getFullYear()).slice(-2);

    const customFormatDate = `${month}/${day}/${year}`;
    return customFormatDate;
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
        {commits
          ? commits.map((commit) => {
              return (
                <p key={commit.author.date} style={{ color: "#868686" }}>
                  <span style={{ color: "black" }}>
                    {convertISODateToCustomFormat(commit.author.date)}:{" "}
                  </span>
                  {commit.message}
                </p>
              );
            })
          : "Loading..."}
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
