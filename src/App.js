import React, { useState, useCallback } from "react";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";

import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import { UpdatePlace } from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import Register from "./users/pages/Register";
import { AuthContext } from "./shared/context/auth-context";
import './shared/components/Navigation/MainHeader.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []); //callback wrapped to prevent unnecessay creation of login that leads to loops so it tracks the creation
  //empty dependency once again mean this will never be created becasue no dependencie is tracked to effect any change
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        {/* <Route path="/register" element={<Register />} /> mine */}
        <Route path="/places/new" element={ <NewPlace /> } />
        <Route path="/places/:placeId" element={ <UpdatePlace /> } />
        <Route path="/auth" element={<Navigate to="/" />} />
        {/* <Navigate to="/auth" replace /> */}
        {/* <Route path="/auth" element={user ? <Navigate to="/" replace /> :  <Login />}  /> */}
        
        {/* redirect to route when you get stuck anywhere, wrong page */}
        {/* <Route path="*" element={<Navigate to="/auth" />} /> */}
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="*" element={<Navigate to="/auth" />} /> */}
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main className="main">
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

//install react-router-dom
//use Browserrouter, then route with elements
//then for redirection state the path and where to go

//our AuthContext is now seen by all routes
//so in our default create context file
//we wanted a context with 3 fns the default of which is false
//then we need another login and logout
//we call it here and create arguements to pass our values through the provider
//we use useState to track isloggin which we said to be false by default
//then we turn it on with login and off with logout
//so now all routes can see

//we formatted some routes to be available when isLoggedIn is true ie when we are logged in
//and others when we are not.
//'/register is mine
