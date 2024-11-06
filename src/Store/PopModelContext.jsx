import React, { createContext, useState } from 'react'

export const PopModelContext=createContext();

const PopModelContextProvider = (props) => {
  const [popModel, setPopModel] = useState(false);

  const closeModel = () => {
    setPopModel(false);
    // console.log('model oppend')
  };

  const value={
    setPopModel,closeModel,popModel

  }
  return (
  <PopModelContext.Provider value={value}>{props.children}</PopModelContext.Provider>
  )
}

export default PopModelContextProvider;
