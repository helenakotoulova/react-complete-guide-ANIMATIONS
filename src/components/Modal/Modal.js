import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./Modal.css";

const animationTiming = {
    enter: 400,
    exit: 1000
};

const modal = props => {
  return (
    <CSSTransition 
        mountOnEnter 
        unmountOnExit 
        in={props.show} 
        timeout={animationTiming}
        classNames={{
            enter: '',
            enterActive: 'ModalOpen',
            exit: '',
            exitActive: 'ModalClosed'
        }}>
          <div className="Modal">
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>
              Dismiss
            </button>
          </div>
    </CSSTransition>
  );
};

export default modal;

// misto timeout={300} muzeme dat timeOut={animationTiming}

// puvodne: //const cssClasses = ['Modal', props.show? 'ModalOpen' : 'ModalClosed'];

/*
Takhle to bylo za pouziti Transition:
<CSSTransition in={props.show} timeout={animationTiming} mountOnEnter unmountOnExit>
      {(state) => {
        const cssClasses = [
          "Modal",
          state === "entering"
            ? "ModalOpen"
            : state === "exiting"
            ? "ModalClosed"
            : null,
        ];
        return (
          <div className={cssClasses.join(" ")}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>
              Dismiss
            </button>
          </div>
        );
      }}
    </CSSTransition>
*/
