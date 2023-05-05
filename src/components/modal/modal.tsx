import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";

const renderPlace = document.getElementById('modal-root');

type TModalProps = {
  title: string;
  handleClose: () => void;
  children?: ReactNode;
}

const Modal: FC<TModalProps> = (props) => {

  React.useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if(e.key === 'Escape'){
        props.handleClose();
      }
    }

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    }
  }, [])

  return renderPlace ? ReactDOM.createPortal(
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
          <>{props.children}</>
        </div>
      </ModalOverlay>
    </>,
    renderPlace
  ): null;
}

export default Modal;
