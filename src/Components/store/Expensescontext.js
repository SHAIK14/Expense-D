import React, { useState } from "react";
import { createContext } from "react";

export const Expensescontext = React.createContext({
  addItems: (items) => {},
});

export const Authcontextproviders = (props) => {
  const [item, setitems] = useState([]);
  const [data, setdata] = useState([]);

  //for adding the items in the handler
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
    const index = data.findIndex((item) => item.id === data.id);
    const updatedData = [...data];
    updatedData[index] = data;
    setdata(updatedData);
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
