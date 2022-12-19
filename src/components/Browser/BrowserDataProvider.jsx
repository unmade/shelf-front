import React, { createContext, useContext } from 'react';

const BrowserDataContext = createContext(null);

function BrowserDataProvider({ children, dataContext }) {
  return (
    <BrowserDataContext.Provider value={{ dataContext }}>{children}</BrowserDataContext.Provider>
  );
}

export default BrowserDataProvider;

export function useBrowserDataContext() {
  const { dataContext } = useContext(BrowserDataContext);
  return useContext(dataContext);
}
