import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import CloseButton from "./CloseButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Settings = ({ resize }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <img
        id="settings-button"
        alt="Settings Button"
        src="assets/phone.webp"
        onClick={handleShow}
        draggable="false"
      />

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <Offcanvas.Header>
          <img alt="Game Logo" src="assets/logo.webp" draggable="false" />
          <CloseButton resize={resize} onClose={handleClose} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <img
            alt="Data Bank Button"
            className="menu-button"
            src="assets/data-bank.webp"
            draggable="false"
          />
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};

export default Settings;
