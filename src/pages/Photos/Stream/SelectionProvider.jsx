import React, { createContext, useContext, useState } from 'react';

const SelectionContext = createContext({
  toggleSelection: () => {},
  select: () => {},
  isSelected: () => false,
});

export default function SelectionProvider({ children }) {
  const [state, setState] = useState({});

  const select = (itemId) => {
    if (!state[itemId]) {
      setState({ [itemId]: true });
    }
  };

  const toggleSelection = (itemId) => {
    if (state[itemId]) {
      setState({ ...state, [itemId]: false });
    } else {
      setState({ ...state, [itemId]: true });
    }
  };

  const isSelected = (itemId) => state[itemId] != null && state[itemId];

  return (
    <SelectionContext.Provider value={{ select, toggleSelection, isSelected }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const { select, toggleSelection, isSelected } = useContext(SelectionContext);
  return { select, toggleSelection, isSelected };
}
