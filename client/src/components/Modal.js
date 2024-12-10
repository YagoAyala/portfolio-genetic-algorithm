import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";

const Modal = ({
  title,
  isOpen,
  children,
  onChangeModal,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }

    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };

    // eslint-disable-next-line
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      onChangeModal(false);
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  return isOpen ?
    ReactDOM.createPortal(
      <div
        onClick={handleOverlayClick}
        className={`modal-overlay ${isClosing ? "closing" : ""}`}
      >
        <div className={`modal ${isClosing ? "closing" : ""}`}>
          <div className={"header"}>
            <p className={"title"}>{title}</p>
            <p className="close-button" onClick={handleClose}>&times;</p>
          </div>
          {children}
        </div>
      </div> ,document.body
    )
  : <></>;
};

export default Modal;
