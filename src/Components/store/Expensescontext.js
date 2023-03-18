import React, { useState } from "react";
import { createContext } from "react";

export const Expensescontext = React.createContext({
  addItems: (items) => {},
});

export const Authcontextproviders = (props) => {
  const [item, setitems] = useState([]);
  const [data, setdata] = useState([]);

  const AdditemHandler = (items) => {
    setitems((prestate) => {
      return [...prestate, items];
    });
  };

  const updateItems = (data) => {
    const index = item.findIndex((item) => item.id === data.id);

    const updatedItems = [...item];
    updatedItems[index] = data;
    setitems(updatedItems);
  };

  const updateProfile = (data) => {
    setdata(data);
  };

  const contextvalue = {
    addItems: AdditemHandler,
    item: item,
    update: updateItems,
    updatedDatas: updateProfile,
  };

  return (
    <Expensescontext.Provider value={contextvalue}>
      {props.children}
    </Expensescontext.Provider>
  );
};
