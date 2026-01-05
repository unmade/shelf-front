import { createContext, useContext } from 'react';

import { useAppearance, type Appearance } from './appearance';

export { Appearance } from './appearance';

interface ContextValue {
  appearance: Appearance;
  colorScheme: Appearance.Light | Appearance.Dark;
  setAppearance: (value: Appearance) => void;
}

const AppearanceContext = createContext<ContextValue | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export default function AppearanceProvider({ children }: Props) {
  const value: ContextValue = useAppearance();

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

export function useAppearanceContext() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error('`useAppearanceContext` must be used within a `AppearanceProvider`');
  }
  return context;
}
