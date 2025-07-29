import type React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  ids: string[];
  clearSelection: () => void;
  isSelected: (itemId: string) => boolean;
  toggleSelection: (itemId: string) => void;
  select: (itemId: string) => void;
}

const SelectionContext = createContext<ContextValue | null>(null);

export default function SelectionProvider({ children }: Props) {
  const [state, setState] = useState<Record<string, boolean>>({});

  const clearSelection = () => {
    if (Object.keys(state).length) {
      setState({});
    }
  };

  const isSelected = (itemId: string) => state[itemId] != null && state[itemId];

  const select = (itemId: string) => {
    if (!state[itemId]) {
      setState({ [itemId]: true });
    }
  };

  const toggleSelection = (itemId: string) => {
    if (state[itemId]) {
      const nextState = { ...state };
      delete nextState[itemId];
      setState(nextState);
    } else {
      setState({ ...state, [itemId]: true });
    }
  };

  const context = useMemo<ContextValue>(
    () => ({ ids: Object.keys(state), clearSelection, isSelected, select, toggleSelection }),
    [state],
  );

  return (
    <SelectionContext.Provider value={context}>
      <span
        onClick={() => {
          clearSelection();
        }}
        aria-hidden
      >
        {children}
      </span>
    </SelectionContext.Provider>
  );
}

export function useSelection(): ContextValue {
  const value = useContext(SelectionContext);
  if (value == null) {
    throw new Error('`useSelection` must be used within a `SelectionProvider`');
  }
  return value;
}
