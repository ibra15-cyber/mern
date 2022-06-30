import { createContext } from "react";


export const AuthContext = createContext({
    isLogIn: false,
    login: () => {},
    logout: () => {}
});

//can be used to feed any part of our code that needs it
//once it changes it affect all the places
   