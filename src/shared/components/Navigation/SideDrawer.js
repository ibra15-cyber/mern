import React from "react";
// import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  // const content
   return (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  // return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;

//we create a component sidedrawer
//it returns an aside
//and then a props.children which means many items

//the second part is about using createPortal of the react dom to render the aside or sidedrawer
//we could have easily return jsx component instead of creacteportal and will still work