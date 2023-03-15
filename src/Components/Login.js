import React, { useContext, useRef } from "react";
import { Authcontent } from "./store/Authcontext";
import { useNavigate } from "react-router";
import "./style.css";
export const Login = () => {
  const navigation = useNavigate();
  const ctx = useContext(Authcontent);

  const logined = ctx.islogined;

  const inputEmailref = useRef();
  const inputpasswordref = useRef();

  //forget password

  const ForgetPasswordHandler = async () => {
    const enteremail = inputEmailref.current.value;
    const requestOptins = {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: enteremail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=
AIzaSyA6R_DJfGGKtlgiNJQBMi2xhMf3ePoEYIM`,
      requestOptins
    );
    const data = await response.json();
    console.log(data);
  };

  const submithandler = (e) => {
    e.preventDefault();
    const enteremail = inputEmailref.current.value;
    const enterpassword = inputpasswordref.current.value;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6R_DJfGGKtlgiNJQBMi2xhMf3ePoEYIM";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteremail,
        password: enterpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((res) => {
        if (res.ok) {
          navigation("/welcome");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessaege = data.error.message;
            console.log(errorMessaege);
            throw new Error(errorMessaege);
          });
        }
      })
      .then((data) => {
        // console.log("email", data.email);
        const newEmail = data.email.replace(/[@.]/g, "");
        ctx.login(data.idToken, newEmail);

        localStorage.setItem("email", newEmail);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div>
        <form className="form" onSubmit={submithandler}>
          <h2>Login</h2>
          <input type="email" placeholder="email" ref={inputEmailref} />
          <input
            type="password"
            placeholder="password"
            ref={inputpasswordref}
          />
          {!logined && <button className="btn-login">Login</button>}
          <button onClick={ForgetPasswordHandler} className="btn-forget">
            Forget password
          </button>
          <br />
        </form>
      </div>
    </>
  );
};
