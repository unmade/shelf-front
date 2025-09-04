import type React from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { AppConfig } from 'types/AppConfig';

const SidebarContext = createContext<{ app: AppConfig } | null>(null);

interface Props {
  children: React.ReactNode;
  app: AppConfig;
}

export default function SidebarProvider({ children, app }: Props) {
  const value = useMemo(() => ({ app }), [app]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value == null) {
    throw new Error('`useSidebarContext` must be used within a `SidebarProvider`');
  }
  return value;
}
