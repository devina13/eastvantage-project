import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Display() {
  const [randomUser, setRandomUser] = useState();


  const getData = async () => {
    try {
      let response = await axios.get("https://randomuser.me/api");
      let user = response.data.results;
      localStorage.setItem("Users", JSON.stringify(user));
      console.log();
      
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  //retrieving from Local Storage
  const loadNewUser = async () => {
    localStorage.clear();
    await getData();
    let retrievedUser = JSON.parse(localStorage.getItem("Users"));
    setRandomUser(retrievedUser);
    console.log();
  };
  return (
    <div>
      <h1>Random Users List</h1>
      {randomUser && (
        <div>
          <p>
           <strong>Name:</strong> {`${randomUser[0]?.name.first} ${randomUser[0]?.name.last}`}
          </p>
          <p><strong>Email: </strong>{randomUser[0]?.email}</p>
          <br />
        </div>
      )}
      <button
        onClick={() => {
          loadNewUser();
        }}
        className="btn btn-primary"
      >
      Refresh
      </button>
    </div>
  );
}

export default Display;