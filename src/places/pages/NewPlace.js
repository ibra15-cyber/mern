import React from "react";
import { useForm } from "../../shared/hooks/form-hook";

import Input from "../../shared/components/FormElements/Input";

import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";

const NewPlace = () => {
  //destructure formState and inputHandler from useform
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // const titleInputHandler = useCallback((id, value, isValid) => {}, []);
  // const descriptionInputHan dler = useCallback((id, value, isValid) => {}, []);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs.title.value);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      {/* this element is the custom from Input component */}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title "
        validators={[VALIDATOR_REQUIRE()]} //takes nothing and return an object with key, type = validator_type_require which is a variable with a string 'REQUIRE'
        errorText="Please enter a valid title "
        onInput={inputHandler} //defining our props.onInput in the Input file
      />
      <Input
        id="description"
        element="textarea"
        label="Description "
        type="text"
        validators={[VALIDATOR_MINLENGTH(5)]} //validator_minl is fn that takes a value then assign that val to val and also has a type minlength that takes a string 'min_length"
        errorText="Please enter a valid description at least 5 characters"
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address "
        validators={[VALIDATOR_REQUIRE()]} //takes nothing and return an object with key, type = validator_type_require which is a variable with a string 'REQUIRE'
        errorText="Please enter a valid address."
        onInput={inputHandler} //defining our props.onInput in the Input file
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;

//we returning a form with an Input that is customize and control by props.element
//when props.element is given input it displays input tag else it displays textarea
//so here we used 2 Inputs which means we want twice of the <Input component rendering diff
//because of the diff conditions.
//
