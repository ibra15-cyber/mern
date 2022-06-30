import React, { useContext, useState } from "react";

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
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Auth = () => {
  const auth = useContext(AuthContext); //defining and listening to our context

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [isLoginMode, setIsLoginMode] = useState(true);
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode); //this is important because it checks both state and revert which is diff to saying it should go false whihc mean it will be stuck in one mode
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //the barrier to backend
  const authSubmitHandler = async (event) => {
    //instead of async you can use promise
    event.preventDefault();
    // console.log(formState.inputs);
    // auth.login(); //we are calling the login() fn in our context ; simulating login before backend
    
    setIsLoading(true); //turn it true initially

    //this should only run when we are in signup mode
    if (isLoginMode) {
      //we copy the same code from signup just have to take of /signup to /login and also remove name field
      try { 
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    } else {
      try {
        setIsLoading(true); //change the state
        const response = await fetch("http:/localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            //require to send
            "Content-Type": "application/json", //correct json from son
          },
          body: JSON.stringify({
            //taking our data from form
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        }); //or use axios to http request
        const responseData = await response.json();

        if (!response.ok) {
          //only 200 code will make it, hence 500 or 400 should be stopped
          throw new Error(responseData.message); 
        }
        console.log(responseData);
        setIsLoading(false); //end loading
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false); //end loading
        setError(err.message || "Something went wrong, please try again");
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {/* this modal will popup only when there's an error */}
     { /*  <ErrorModal error={error} onClear={errorHandler} />  */}

      <Card className="authentication">
       {/*} {isLoading && <LoadingSpinner asOverlay />} */}
        {/* if is loading is true run the spinner this happens as the signup is waiting */}

        <h2>Login Required</h2>
        <hr />
        <form className="" onSubmit={authSubmitHandler}>
          {/* className="place-form" makes the form appear diff to the card and it looks beutiful */}
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}

          <Input
            element="input" //input means display our <input> tag
            id="email" //id= email means we will use validators to define what's is valid email
            type="email" //this made me stuck to confirm the LOGIN enable
            label="E-Mail" //just a lable for the header
            validators={[VALIDATOR_EMAIL()]} //takes nothing and return an object with key, type = validator_type_require which is a variable with a string 'REQUIRE' and must be met
            errorText="Please enter a valid email address." //error msg to display below th input definition in <Input /> definition
            onInput={inputHandler} //defining our props.onInput in the Input file
          />
          <Input
            element="input"
            id="password"
            label="Password "
            type="password" //got this wrong too, hence the password wasn't getting harshed
            validators={[VALIDATOR_MINLENGTH(5)]} //validator_minl is fn that takes a value then assign that val to val and also has a type minlength that takes a string 'min_length"
            errorText="Please enter a valid password at least 5 characters"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
          {/* <h3>Don't have an account?</h3>
        <NavLink to="/register">
          <span>Click here to Register</span>
        </NavLink> */}
        </form>

        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;

//to create this requirement
//i set a route to the link /auth to display element this file <Authen />
//then it talks about form so i copied a form from new places
//did the necessary imports etc
//use card around it for visual
//truncate useform to match the number of inputs ie 2

//they decided to make use of only this page instead of separating them.
//based on the condition it displays either login or register
//so firstly, if we are on signup page, it should add a name input field
//render the rest of the page
//so if we are not on the signup, that will not happen and only the initila page is rendered
//i got element and type spellings which made authentication difficult
//then we got two buttons, that are both dynamic
//the first one is either login or signup but where is it isLoginMode ie Login or not then signup displayed
//the second button is swtich which happens based on again where we are isLoading true ie login or !isLoading is true
//and for that matter signup is true hence sign up
//but the above is just display
//we needed a fn to control the onclick to do real thing.
//we create switchModeHandler which normally will have contro isLoading to false
//but you got stuck after it switches signup when you want to get back.
//hence turning isloading off isnt the ideal, you simply pass the prevState and tell it to change the state
//so that it will forver be switching between the two states
//but before it changes state we tract where we are if in signup validate copy all the previous state and add name as undefined
//and the validity is checked for both email and password in signup too
//else if in login copy the previous state
//name value is empty and isvalid is false by default

//also we got our authSub tha handles form onSubmit which works a button with type submit by default
//when the button is clicked the onSub property is passed to the form and here we want it to first close the page and log console the input
//until we get a working backend
//so the Switching button shouldnt be part of the form by default so we can separate them
