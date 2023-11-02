import React, { useRef ,FC, ReactNode } from "react";
import style from "./modal-overlay.module.css";

type TModalOverlayProps = {
  handleClose: () => void;
  children: ReactNode;
}

const ModalOverlay: FC<TModalOverlayProps> = (props) => {

  const overlay = useRef<HTMLDivElement>(null)

  const handleOverlayClick = (e: MouseEvent) => {
    if(e.target === overlay.current){
      props.handleClose();
    }
  }

  return (
    <div onClick={() => handleOverlayClick} ref={overlay} className={style.overlay}>
      {props.children}
    </div>
  ) 
}

export default ModalOverlay;