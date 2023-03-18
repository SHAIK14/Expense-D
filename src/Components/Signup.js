import React, { useRef } from "react";
import { useState } from "react";
import { Login } from "./Login";
import { Button } from "react-bootstrap";
import "./style.css";

const Signup = () => {
  const [isLoading, setloading] = useState(false);

  const inputEmailref = useRef();
  const inputpasswordref = useRef();
  const inputconfirmpasswordref = useRef();

  const submithandler = (e) => {
    e.preventDefault();
    const enteremail = inputEmailref.current.value;
    const enterpassword = inputpasswordref.current.value;
    const enterconfirmpassword = inputconfirmpasswordref.current.value;

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6R_DJfGGKtlgiNJQBMi2xhMf3ePoEYIM";
    setloading(true);
    if (enterpassword === enterconfirmpassword) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteremail,
          password: enterpassword,
          cofirm_password: enterconfirmpassword,
          returnSecureToken: true,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setloading(false);
        if (res.ok) {
          alert("stored succwssfully");
          setloading(false);
        } else {
          return res.json().then((data) => {
            let errorMessage = "failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      });
    } else {
      alert("wrong password");
    }
  };

  return (
    <>
      <form onSubmit={submithandler} className="form">
        <input type="email" placeholder=" Email" ref={inputEmailref} required />
        <input
          type="password"
          placeholder="Password"
          ref={inputpasswordref}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          ref={inputconfirmpasswordref}
          required
        />
        {!isLoading && (
          <Button className="btn" variant="secondary" type="submit">
            Signup
          </Button>
        )}
        {isLoading && <p>isLoading ....</p>}
      </form>
    </>
  );
};

export default Signup;
