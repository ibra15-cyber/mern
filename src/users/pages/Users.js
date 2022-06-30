import React, {useEffect, useState } from "react";
import UsersList from "../components/UsersList";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const USERS = [
    {
      id: "id",
      name: "Max Schwarz",
      image:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/526.jpg",
      places: 3,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(()=> { //async and promise not needed by useEffect
    const sendRequest = async () => {
      setIsLoading(true)

      try {
        const response = await fetch("http://localhost:5000/api/users");

      const responseData = await response.json();

      if(!response.ok) { //it's not 200 but other codes that are not stopped as error
        throw new Error(responseData.message)
      }

      setLoadedUsers(responseData.users) //the users here is the one received in user controller
      

      }catch (err) { 
        setError(err.message);
      }
      setIsLoading(false);
    }
    sendRequest();   
  }, [] )

  const errorHandler = () => {
    setError(null)
  }
  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={errorHandler} />  */}
      { isLoading && (
      <div className="center">
        <LoadingSpinner />
      </div>
      )}
    {!isLoading && loadedUsers && <UsersList users={loadedUsers} />} 
    
    {/* if its not loading and we got loadedUsers then pass it to userslist and render it */}

    <UsersList users={USERS} />
    </React.Fragment>
  );
};

export default Users;
