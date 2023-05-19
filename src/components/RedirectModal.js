import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "./Button";

let redirectTimeout;
export default function RedirectModal() {
  return (
    <React.Fragment>
      <Modal
        show={true}
        centered
        onEntered={() => {
          redirectTimeout = setTimeout(
            () => (window.location.href = "https://starrailwarpsim.com"),
            5000
          );
        }}
      >
        <Modal.Header style={{ backgroundColor: "#e9e7e2" }}>
          <Modal.Title style={{ fontWeight: "bold" }}>We've Moved!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#e9e7e2" }}>
          We have changed to a{" "}
          <a href="https://starrailwarpsim.com/" rel="noreferrer">
            different url.
          </a>{" "}
          Redirecting...
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#e9e7e2" }}>
          <Button
            onClick={() => {
              clearTimeout(redirectTimeout);
            }}
            text="Cancel"
            size="sm"
            resize={false}
          />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
