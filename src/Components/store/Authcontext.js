import React, { useState } from "react";

export const Authcontent = React.createContext({
  token: "",
  islogined: false,
  login: (token) => {},
  logout: () => {},
  email: "",
});

export const Authcontextprovider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const [token, settoken] = useState(initialToken);
  const [email, setemail] = useState(initialEmail);
  const userislogined = !!token;

  const loginhandler = (token) => {
    settoken(token);
    setemail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };
  const logoutHandler = () => {
    settoken(null);
    setemail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    console.log("logout handler");
  };
  const contextvalue = {
    token: token,
    islogined: userislogined,
    login: loginhandler,
    logout: logoutHandler,
  };

  return (
    <Authcontent.Provider value={contextvalue}>
      {props.children}
    </Authcontent.Provider>
  );
};
