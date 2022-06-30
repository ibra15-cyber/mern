import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;


//here we create a backdrop conponent
//it returns a div with onclick default prop
//then we define our props onClick 
//which will be passed when we call the component
//on rendering, we decided to render it in index.html in the public folder
//just like app.js
//when we call it we want to turn off slide drawer so we turning setdrawer to off
