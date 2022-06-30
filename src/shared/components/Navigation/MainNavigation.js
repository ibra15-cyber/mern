import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  
  //you can use this or type it directly
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerIsOpenHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
          {/* we placed it here which make it a backdrop by default */}
          {/* it is inside react.Fragment but not a any component */}
      {drawerIsOpen && <Backdrop onClick={closeDrawerIsOpenHandler} />}
            {/* if drawerIsOpen is false sidedrawer will be closed */}
            {/* {drawerIsOpen && <SideDrawer> */}
            {/* the above is updated with a transition
            which turns the drawer off on default */}
            {/* Also since it seems side drawer doesnt close except clicking the backdrop
            it doesnt also close when we go to another Link
            so we tell it to do so by introducing onClick prop on SideDrawer and passing props.onClick
            which we call here to make sure any click on the drawer will close it */}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerIsOpenHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      
      <MainHeader>
        {/* we turn side drawer on only if we click the button with 3 spam */}
        <button 
          className="main-navigation__menu-btn" 
          onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
