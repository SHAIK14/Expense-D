import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./style.css";
export const Addexpenses = () => {
  const [data, setdata] = useState([]);

  const Addmoneryref = useRef();
  const Adddescref = useRef();
  const addcatagoerref = useRef();

  const newEmail = localStorage.getItem("email");

  console.log(newEmail);

  const getuserData = useCallback(
    async function () {
      const response = axios.get(
        `https://expense-d-default-rtdb.firebaseio.com//${newEmail}expense.json`
      );
      let datas = await response;

      const result = [];
      for (let key in datas.data) {
        result.push({ id: key, ...datas.data[key] });
      }
      console.log(result);
      setdata(result);
    },
    [newEmail]
  );

  useEffect(() => {
    getuserData();
  }, [getuserData]);

  const submithandler = async (e) => {
    e.preventDefault();
    let EnterdMoneyValue = Addmoneryref.current.value;
    let EnterDescfvalue = Adddescref.current.value;
    let EnteredCatagoryvalue = addcatagoerref.current.value;

    let requestOptins = {
      Money: EnterdMoneyValue,
      Desc: EnterDescfvalue,
      Cata: EnteredCatagoryvalue,
    };
    const response = await axios.post(
      `https://expense-d-default-rtdb.firebaseio.com//${newEmail}expense.json`,
      requestOptins
    );
    console.log(response.data);

    Addmoneryref.current.value = "";
    Adddescref.current.value = "";
    addcatagoerref.current.value = "";

    getuserData();
  };

  const deleteData = async (id) => {
    console.log(id);
    const response = await axios.delete(
      `https://expense-d-default-rtdb.firebaseio.com//${newEmail}expense/${id}.json`
    );
    console.log(response);

    getuserData();
  };

  const updateData = (id) => {
    const index = data.findIndex((item) => item.id === id);
    console.log(id, data[index]);

    Addmoneryref.current.value = data[index].Money;
    Adddescref.current.value = data[index].Desc;
    addcatagoerref.current.value = data[index].Cata;

    deleteData(id);
  };
  console.log(data);

  return (
    <div>
      <form className="form">
        <label htmlFor="">Add Money</label>
        <input type="text" ref={Addmoneryref} placeholder="Add Money" />
        <br />
        <label htmlFor="">Add Description</label>
        <input type="text" ref={Adddescref} placeholder="Description" />
        <br />
        <label htmlFor="">category</label>
        <select ref={addcatagoerref}>
          <option>Food</option>
          <option>veggies & Fruits</option>
          <option>Shopping</option>
          <option>EMI</option>
        </select>
        <br />
        <br />
        <button onClick={submithandler} className="btn-login">
          Add Expenses
        </button>
      </form>
      <ul>
        {data.map((items) => {
          console.log(items);
          return (
            <li key={items.id}>
              {`${items.Money} - ${items.Desc} - ${items.Cata}`}
              <button
                className="btn-edit"
                onClick={() => {
                  updateData(items.id);
                }}
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => deleteData(items.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
