import { createContext, useContext } from 'react';

import type { ColorScheme } from './prefers-color-scheme';
import usePrefersColorScheme from './prefers-color-scheme';

export { ColorScheme } from './prefers-color-scheme';

interface ContextValue {
  scheme: ColorScheme;
  setScheme: (value: ColorScheme) => void;
}

const PrefersColorSchemeContext = createContext<ContextValue | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export default function PrefersColorSchemeProvider({ children }: Props) {
  const [scheme, setScheme] = usePrefersColorScheme();

  const value: ContextValue = {
    scheme,
    setScheme,
  };

  return (
    <PrefersColorSchemeContext.Provider value={value}>
      {children}
    </PrefersColorSchemeContext.Provider>
  );
}

export function usePrefersColorSchemeContext() {
  const context = useContext(PrefersColorSchemeContext);
  if (!context) {
    throw new Error(
      '`usePrefersColorSchemeContext` must be used within a `PrefersColorSchemeProvider`',
    );
  }
  return context;
}
