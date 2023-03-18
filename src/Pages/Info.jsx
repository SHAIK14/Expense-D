import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Expensescontext } from "./store/Expensescontext";
import "./style.css";

export const Addexpenses = () => {
  const [data, setdata] = useState([]);
  const Authctx = useContext(Expensescontext);
  const Addmoneryref = useRef();
  const Adddescref = useRef();
  const addcatagoerref = useRef();

  let userdata = false;

  const userEmail = localStorage.getItem("email");
  const newEmail = userEmail.replace(/[@.]/g, "");
  console.log(newEmail);

  function getuserData() {
    fetch(
      `https://expense-d-default-rtdb.firebaseio.com/${newEmail}expenses.json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((datas) => {
        const result = [];
        for (let key in datas) {
          result.push({ id: key, ...datas[key] });
        }
        console.log(result);
        setdata(result);
      });
  }

  const submithandler = (e) => {
    e.preventDefault();
    let EnterdMoneyValue = Addmoneryref.current.value;
    let EnterDescfvalue = Adddescref.current.value;
    let EnteredCatagoryvalue = addcatagoerref.current.value;

    if (userdata) {
      axios
        .put(
          `https://expense-d-default-rtdb.firebaseio.com/${newEmail}expenses.json`,
          {
            EnterdMoneyValue,
            EnterDescfvalue,
            EnteredCatagoryvalue,
          }
        )

        .then((data) => {
          userdata = false;
          Authctx.update(data.data);
          console.log(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let url = "https://expense-d-default-rtdb.firebaseio.com/data.json";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          EnterdMoneyValue,
          EnterDescfvalue,
          EnteredCatagoryvalue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
        });
      getuserData();
    }
  };

  useEffect(() => {
    getuserData();
  }, []);

  return (
    <div>
      <form className="form">
        <label htmlFor="">Add Money</label>
        <input type="text" ref={Addmoneryref} placeholder="Add Money" />
        <br />
        <label htmlFor="">Add Desc</label>
        <input type="text" ref={Adddescref} placeholder="Desc" />
        <br />
        <label htmlFor="">Catagory</label>
        <select ref={addcatagoerref}>
          <option>Food</option>
          <option>Petrol</option>
          <option>Salary</option>
          <option>Car</option>
        </select>
        <br />
        <br />
        <button onClick={submithandler} className="btn">
          Add Expenses
        </button>
      </form>
      <ul>
        {data.map((items) => {
          return (
            <li key={Math.random()}>
              {items.EnterdMoneyValue} {items.EnterDescfvalue}{" "}
              {items.EnteredCatagoryvalue}
              <button
                onClick={() => {
                  updateData(items.id);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteData(items.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
