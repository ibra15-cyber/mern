import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
  //anticipating a list of items so we define a prop called item
  if (props.users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }
  //else for each of the item in the list
  //return a user item with key id image name and place count
  return (
    <ul className="users-list">
      {props.users.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
            //changed form user.places becasue noe its considered a list
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
