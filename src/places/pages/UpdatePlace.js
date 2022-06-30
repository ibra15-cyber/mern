import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { DUMMY_PLACES } from "./UserPlaces";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import "./UpdatePlace.css";

export const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        val: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId); //we imported dummy_places from userplaces

  useEffect(() => {
    if (identifiedPlace) { //the ! infront of this gave me another headache
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]); //both dependencies will not change though, the first is static but the second is prevented using useCaller

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  //if the user place not found run this
  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card >
          <h2>Could not find a place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2> Loading... </h2>
      </div>
    );
  }

  return (
    //edited code for it to first check title value exist before it renders
    //i fear this would never render becasue already i have been struggling to get to work
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        label="Title"
        type="text"
        validtors={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validtors={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

//update places is also a form just like add places
//but ofcourse with update we call the same thing and edit it so it will be rendered throught the edit button
//already we have stated that on click on the EDIT button in PlaceItem to route to {`/places/${props.id}`} ie 
//places.:id for diff places that needs editing
//so onclicking this button we are routed to places.id
//remember this is only possible because becasue we wraped NavLinks as props in th Button component


//as usual we use useParams to get the dynamic places on placeId which is defined in App routing
//here we use the method find to find those id's with the same placeId ie only the the same place is found and saved as
//identifiedPlace

//we call our custom useForm to control states
//passing or destructuring our param formState, inputHandler, setFormData
//formState refers to the initial data
//setFormData to update data
//input handler to change our input all done in our hook


//we use useEffect to track changes in both setFormData and identifiedPlaces that change as dependencies.
//but we only update if the identifiedPlace is found and same


//we created a useState that takes isLoading and setLoading with default as true
//when loading show a text is loading
//so when setFormData runs and changes it shouuld turn off setLoading ie it should show
//if we find the a place, render a form with 2 inputs else say nothing found

//our form will submit on submit we want it to close
//then send the data to console until to find a backend
