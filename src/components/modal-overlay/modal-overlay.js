import React from "react";
import style from "./modal-overlay.module.css";
import Modal from "../modal/modal";
import PropTypes from "prop-types";

const ModalOverlay = React.forwardRef((props, ref) => {

  return (
    <div onClick={props.handleOverlayClick} ref={ref} className={props.isHidden === true ? style.hidden : '' + ' ' + style.overlay}>
      {props.children}
    </div>
  ) 
})

ModalOverlay.propTypes = {
  handleOverlayClick: PropTypes.func,
  isHidden: PropTypes.bool,
  children: PropTypes.node
}

export default ModalOverlay;