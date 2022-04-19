import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
const AppUpdateContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const useAppUpdateContext = () => {
    return useContext(AppUpdateContext)
}

export const AppProvider = ({ children }) => {
  const [context, setContext] = useState({ selected: {} });

  const updateContext = (newState) => {
      setContext(prev => newState)
  }

  return (
    <AppContext.Provider value={context}>
      <AppUpdateContext.Provider value={updateContext}>
        {children}
      </AppUpdateContext.Provider>
    </AppContext.Provider>
  );
};
