import React, { createContext, useContext, useMemo, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  toggleSelection: (itemId: string) => void;
  select: (itemId: string) => void;
  isSelected: (itemId: string) => boolean;
}

const SelectionContext = createContext<ContextValue | null>(null);

export default function SelectionProvider({ children }: Props) {
  const [state, setState] = useState<Record<string, boolean>>({});

  const select = (itemId: string) => {
    if (!state[itemId]) {
      setState({ [itemId]: true });
    }
  };

  const toggleSelection = (itemId: string) => {
    if (state[itemId]) {
      setState({ ...state, [itemId]: false });
    } else {
      setState({ ...state, [itemId]: true });
    }
  };

  const isSelected = (itemId: string) => state[itemId] != null && state[itemId];

  const context = useMemo<ContextValue>(() => ({ select, toggleSelection, isSelected }), [state]);

  return <SelectionContext.Provider value={context}>{children}</SelectionContext.Provider>;
}

export function useSelection(): ContextValue {
  const value = useContext(SelectionContext);
  if (value == null) {
    throw new Error('`useSelection` must be used within a `SelectionProvider`');
  }
  return value;
}
