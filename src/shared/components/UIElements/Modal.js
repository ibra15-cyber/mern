import React from "react";
import { CSSTransition } from "react-transition-group";

import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
  const content = ( 
    //   so className css is modal + any other css file css can be called
    <div className={`modal ${props.className}`} style={props.style} >

      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault //This closes the form
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>

      </form>

    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
        {/* becasue initially show which be pass showMap which is off, backdrop wouldn't work */}
      {props.show && <Backdrop onClick={props.onCancel} />}
      {/* when i click the backdrop it should cancel */}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmoutOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
