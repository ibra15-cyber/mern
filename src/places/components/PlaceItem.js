import React, { useContext, useState } from "react";

import Map from "../../shared/components/UIElements/Map";
import Modal from "../../shared/components/UIElements/Modal";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceItem.css";
import { AuthContext } from "../../shared/context/auth-context";

import Map3 from "../../shared/components/UIElements/Map3";

const PlaceItem = (props) => {
  //defining or listening to our context to see where loggin or not
  const auth = useContext(AuthContext)

  //show map function
  const [showMap, setShowMap] = useState(false);
  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showDeleteWarningHandler = () => { 
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = () => {
    console.log("DELETING....");
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap} //initially false
        onCancel={closeMapHandler}
        header={props.address}
        // we are passing more styling because we created that possiblity to use address
        // default sytle plus a props. that can be added later. so here alhough the default css
        // is modal.css here we are passing a style from placeitem.css
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} />
          {/* <div id='map'></div> */}
          {/* <div id="map" style="width: 400px; height: 300px"></div> */}
        {/* <Map /> */}
        <div>
        </div>
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delte not that it can't be undone
          thereafter 
        </p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>

          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>

          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {/* only show both edit and delete button unless someone logs in */}
            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
            {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>
              DELETE
              </Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;

//we had a button here DELETE
//we reuse the modal, which is a popup and renders and overlay fn with our design structure
//we define our header, show to display it, oncancel to turn it off showConfirModal to dispaly this modal
//contentClass for fromating of footer item
//our footer renders two buttons instead of one in the case of map
//so we wrap it with fragment react
//one is cancel so onclick the usestate changes the value of 
//so onclick on button we invoke the fn,  showDeleteWarningHandler from false to true to display the modal
//remember the overaly fn embedded in the modal is expecting props.children in a div
//so we pass our Map as before after the header and before the footer
//here too we a warning paragraph
//and in the footer which is props we pass 2 buttons wraped in REact.Frame
//we inverse the first for styling and danger on the delete button
//but what happen when we click either
//with the first one, onClick is set setDeleteConfirmHandler off which is the fn that control the showing of the modal
//and fn confirmDelete does nothing as of now.
