import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import PropTypes from "prop-types";

const renderPlace = document.getElementById('modal-root');

function Modal(props) {

  React.useEffect(() => {
    const handleEscPress = (e) => {
      if(e.key === 'Escape'){
        props.handleClose();
      }
    }

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    }
  }, [])

  return ReactDOM.createPortal(
    <>
      <ModalOverlay handleClose={props.handleClose}>
        <div className={style.module + " pt-10 pr-10 pl-10 pb-15"}>
          <div className={style.titlenbtn}>
            <h3 className="text text_type_main-large">{props.title}</h3>
            <button
              className={style.button}
              onClick={props.handleClose}
            >
              <CloseIcon type="primary" />
            </button>
          </div>
          {props.children}
        </div>
      </ModalOverlay>
    </>,
    renderPlace
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}.isRequired

export default Modal;
