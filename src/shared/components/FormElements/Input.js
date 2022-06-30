import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      }
    }
      
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props; //we destructure id and onInput from props
  const { value, isValid } = inputState; //destructure inputState and get its value and isValid

  //use effect takes a fn and array of dependencies to be tracked. upon changed the use effect execute
  useEffect(() => {
    //we define a props called onInput the takes id value and isValue
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  // [props, inputState] this could have been the above as dependencies
  //but we destructure it to obtain the relevant and not everything in those arrays
  //so in summary, useEffect executes when any of the element in the list changes
  //therefore rendering the onInput with the new values
  //remember though that onInput is a props
  //hence whereever is going to be called it will use the onInput name with the params
  //also id is default to props hence the reason we were able to destructure it here

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        "form-control--invalid"}`}
    >
      <label htmlFor={props.id}>{props.label}</label>

      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;

//returns a div
//which contains a label
//and variable element that contains a condition

//with an element variable that contains default Input tag
//with properties id, type, placeholder, onChange, value which are all default
//props.element is expecting an element, if it's "input", return the default input tag with the above properties
//else return a default textarea tag with properties id,
//rows for how many rows it should extend,
//onchange is the detecting of entering input
//value the value entered.

//state control

//just like useState but a bit different because it takes 2 param instead of one
//it takes a fn inputReader that takes 2 paramaters also and uses switch case
//if the second.type property is change return all the previous list with val as the second param.val
//ie extract the val in the second param and save it as value
//and set isValid as true
//defualt switch is set to return state, the item or indexitem

//we pass the inputREducer fn in useReducer
//then the other para takes an obj
//this obj contains value, and isValid as false
//note just like useState it takes the first and edit what it wants the second
//

//very complex logic
// again the inputState is supposed to take the default value in the useReader jsut like useState
//then the second, dispatch change properties type and val
//onchange in the input, change the value of dispatch

//for the add places to look like his i detected he stopped using Input component and used input tag
//and that solved the problem

//COMPONENT
//so we created a component called Input
//that renders a label, an element which could be either input or text area and an error message paragragraph

//FUNCTIONALITY STATE CONTROL
//inputReducer is a fn that takes 2 parameters
//it checks the props type on the second arguement
//and based on the value it sets initial states as either "CHANGE" OR "TOUCH"
//os input state whihc is a destructure of the useReducer is set by default to this value above
//to change this state just like setState in useState
//we create another fn onInput as props that takes other props id, value and isValid
//we pass that to useEffect so as to track the props parameters when any change
//we didnt use props on the above becasue we object destructuring to obtain the props
//then just like we can create a fn for set in useState we create some for dispatch to control changes
//when it "CHANGE" and when it "TOUCH"
//onChange and onBlur are default props for both textArea and input tages
