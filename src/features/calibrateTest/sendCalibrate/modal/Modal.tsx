import React from "react";
import "./Modal.scss";
const Modal = props => {

  var style = {};
  if (props.title === "Send Calibrate Test") {
    style = {
      width: props.width,
      position: "initial",
      margin: "8% auto",
      transform: "none"
    };
  } else {
    style = {
      width: props.width
    };
  }

  return (
    <div className="modal-content" style={style}>
      <span onClick={props.onClose} className="close"></span>
      <div className="modal-heading">{props.title}</div>
      {props.dataToDisplay}
    </div>
  );
};

export default Modal;
