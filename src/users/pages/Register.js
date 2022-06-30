import React from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import { NavLink } from "react-router-dom";

const Register = () => {
    const [formState, inputHandler] = useForm(
        {
          email: {
            value: "",
            isValid: false,
          },
          password: {
            value: "",
            isValid: false,
          },
          ReenterPassword: {
            value: "",
            isValid: false,
          },
        },
        false
      );

      const regSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
      };
  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <form className="place-form" onSubmit={regSubmitHandler}>
        {/* this element is the custom from Input component */}
        <Input
          id="title"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]} //takes nothing and return an object with key, type = validator_type_require which is a variable with a string 'REQUIRE'
          errorText="Please enter a valid email address."
          onInput={inputHandler} //defining our props.onInput in the Input file
        />
        <Input
          id="password"
          element="input"
          label="Password "
          type="passord"
          validators={[VALIDATOR_MINLENGTH(5)]} //validator_minl is fn that takes a value then assign that val to val and also has a type minlength that takes a string 'min_length"
          errorText="Please enter a valid password at least 5 characters"
          onInput={inputHandler}
        />
        <Input
          id="reenterpassword"
          element="input"
          label="Re-enter Password "
          type="passord"
          validators={[VALIDATOR_MINLENGTH(5)]} //validator_minl is fn that takes a value then assign that val to val and also has a type minlength that takes a string 'min_length"
          errorText="Please enter a valid password at least 5 characters"
          onInput={inputHandler}
        />
        
        <Button type="submit" disabled={!formState.isValid}>
          LOG IN
        </Button>
        {/* <h3>You have an account?</h3><span><NavLink to="/Auth">
          <h4>Click here to Login</h4>
        </NavLink></span> */}
        
      </form>
    </Card>
  );
};

export default Register;

//i also managed to create the register page
//copy the same files from newplace, login, etc
//i placed a NavLink to take one back to the login
//and on the login add a navlink to register