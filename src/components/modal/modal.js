import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import PropTypes from "prop-types";

const Modal = React.forwardRef((props, ref) => {

  React.useEffect(() => {
    document.addEventListener('keydown', props.handleEscPress);

    return () => {
      document.removeEventListener('keydown', props.handleEscPress);
    }
  }, [])

  return ReactDOM.createPortal(
    <>
      <ModalOverlay ref={ref} isHidden={props.isHidden} handleOverlayClick={props.handleOverlayClick}>
        <div className={style.module + " pt-10 pr-10 pl-10 pb-15"}>
          <div className={style.titlenbtn}>
            <h3 className="text text_type_main-large">{props.title}</h3>
            <button
              className={style.button}
              onClick={props.handleCloseBtn}
            >
              <CloseIcon type="primary" />
            </button>
          </div>
          {props.children}
        </div>
      </ModalOverlay>
    </>,
    props.renderPlace.current
  );
})

Modal.propTypes = {
  handleEscPress: PropTypes.func,
  isHidden: PropTypes.bool,
  handleOverlayClick: PropTypes.func,
  title: PropTypes.string,
  handleCloseBtn: PropTypes.func,
  children: PropTypes.node,
  renderPlace: PropTypes.object
}

export default Modal;
