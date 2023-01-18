import React from "react";
import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {

  const overlay = React.useRef(null)

  const handleOverlayClick = (e) => {
    if(e.target === overlay.current){
      props.handleClose();
    }
  }

  return (
    <div onClick={handleOverlayClick} ref={overlay} className={/*props.isHidden === true ? style.hidden : '' + ' ' + */style.overlay}>
      {props.children}
    </div>
  ) 
}

ModalOverlay.propTypes = {
  handleOverlayClick: PropTypes.func,
  children: PropTypes.node
}

export default ModalOverlay;