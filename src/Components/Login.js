import React, { useContext, useRef } from "react";
import { Authcontent } from "./store/Authcontext";
import { useNavigate } from "react-router";
import "./style.css";

export const Login = () => {
  const navigation = useNavigate();
  const ctx = useContext(Authcontent);
  const logined = ctx.islogined;
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const forgetPasswordHandler = async () => {
    const enterEmail = inputEmailRef.current.value;
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: enterEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA6R_DJfGGKtlgiNJQBMi2xhMf3ePoEYIM`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enterEmail = inputEmailRef.current.value;
    const enterPassword = inputPasswordRef.current.value;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6R_DJfGGKtlgiNJQBMi2xhMf3ePoEYIM";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enterEmail,
        password: enterPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;
            console.log(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("email", data.email);
        const newEmail = data.email.replace(/[@.]/g, "");
        ctx.login(data.idToken, newEmail);
        localStorage.setItem("email", newEmail);
        navigation("/welcome");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div>
        <form className="form" onSubmit={submitHandler}>
          <h2>Login</h2>
          <input type="email" placeholder="Email" ref={inputEmailRef} />
          <input
            type="password"
            placeholder="Password"
            ref={inputPasswordRef}
          />
          {!logined && (
            <button type="submit" className="btn-login">
              Login
            </button>
          )}
          <button
            type="button"
            onClick={forgetPasswordHandler}
            // className="btn-forget"
            className="btn-login"
            // id="profile-3"
          >
            Forgot password
          </button>
          <br />
        </form>
      </div>
    </>
  );
};
