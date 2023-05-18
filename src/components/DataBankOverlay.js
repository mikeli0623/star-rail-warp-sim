import "../css/DataBank.css";
import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { allChars, allWeapons } from "../classes/Constants";
import useSound from "use-sound";
import SoundContext from "./SoundContext";

export default function DataBankOverlay({ show, setShow, handleSelect }) {
  const { sound } = useContext(SoundContext);

  const [playMenuOpen] = useSound("../assets/audio/sfx/db-menu-open.mp3");
  const [playMenuClose] = useSound("../assets/audio/sfx/db-menu-close.mp3");
  const [playSelect] = useSound("../assets/audio/sfx/db-select.mp3");

  const handleClose = () => setShow(false);

  const stash = Object.entries(JSON.parse(localStorage.getItem("stash")));

  const total = stash.reduce(
    ([accLC, accC], [name, count]) => {
      if (allChars.includes(name)) return [accLC, accC + (count > 0 ? 1 : 0)];
      else return [accLC + (count > 0 ? 1 : 0), accC];
    },
    [0, 0]
  );

  return (
    <Modal
      className="db"
      style={{ backgroundColor: "rgba(24, 29, 49, 0.8)" }}
      show={show}
      onHide={handleClose}
      centered
      onEntering={() => {
        if (sound) playMenuOpen();
      }}
      onExiting={() => {
        if (sound) playMenuClose();
      }}
    >
      <div className="db-type-group">
        <LazyLoadImage
          className="db-type-icon"
          effect="opacity"
          alt="Light Cones Icon"
          src="/assets/db-weap-icon.webp"
          onClick={() => {
            if (sound) playSelect();
            handleSelect("weap");
          }}
          draggable="false"
        />
        <div style={{ color: "white" }}>Light Cones</div>
        <div style={{ color: "#dac291" }}>
          {total[0]}/{allWeapons.length}
        </div>
      </div>
      <div className="db-type-group">
        <LazyLoadImage
          className="db-type-icon"
          effect="opacity"
          alt="Characters Icon"
          src="/assets/db-char-icon.webp"
          onClick={() => {
            if (sound) playSelect();
            handleSelect("char");
          }}
          draggable="false"
        />
        <div style={{ color: "white" }}>Characters</div>
        <div style={{ color: "#dac291" }}>
          {total[1]}/{allChars.length}
        </div>
      </div>
    </Modal>
  );
}
