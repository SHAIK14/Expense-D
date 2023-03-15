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
        // console.log(datas.data[key]);
        // const expense_item = JSON.parse(datas.data[key]);
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
    //finds the index if matches than update tha value

    const index = data.findIndex((item) => item.id === id);
    console.log(id, data[index]);
    //it will display data in the input boxes
    Addmoneryref.current.value = data[index].Money;
    Adddescref.current.value = data[index].Desc;
    addcatagoerref.current.value = data[index].Cata;

    //console.log(data[index].EnterdMoneyValue, data[index].EnterDescfvalue, data[index].EnteredCatagoryvalue);

    //when update function is called than userdata should be updated trues
    deleteData(id);
  };
  console.log(data);

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
