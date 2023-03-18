import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Authcontextprovider } from "./Components/store/Authcontext";
import { BrowserRouter } from "react-router-dom";
import { Authcontextproviders } from "./Components/store/Expensescontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Authcontextprovider>
      <Authcontextproviders>
        <App />
      </Authcontextproviders>
    </Authcontextprovider>
  </BrowserRouter>
);

reportWebVitals();
