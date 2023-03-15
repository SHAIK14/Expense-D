import React, { useContext, useRef, useState } from "react";
import { Expensescontext } from "./store/Expensescontext";

export const Completeprofile = () => {
  const inputText = useRef();
  const inputFile = useRef();
  const ctx = useContext(Expensescontext);
  const tokens = localStorage.getItem("token");
  const [userData, setUserData] = useState({});

  const getuserData = async () => {
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          idToken: tokens,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA6R_DJfGGKtlgiNJQBMi2xhMf3ePoEYIM`,
        requestOptions
      );
      const data = await response.json();
      if (data.users && data.users.length > 0) {
        setUserData(data.users[0]);
        inputText.current.value = data.users[0].displayName;
        inputFile.current.value = data.users[0].photoUrl;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    const enterName = inputText.current.value;
    const enterFile = inputFile.current.value;
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        idToken: tokens,
        displayName: enterName,
        photoUrl: enterFile,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA6R_DJfGGKtlgiNJQBMi2xhMf3ePoEYIM`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        ctx.updatedDatas(data.users);
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="name">Full Name:</label>
      <input type="text" name="name" ref={inputText} />

      <label htmlFor="file">Profile Photo URL:</label>
      <input type="email" name="file" ref={inputFile} />

      <button onClick={updateData}>Update</button>
    </div>
  );
};
