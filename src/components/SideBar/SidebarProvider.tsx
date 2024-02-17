import React, { createContext, useContext, useMemo } from 'react';

import { IAppConfig } from 'types/AppConfig';

const SidebarContext = createContext<{ app: IAppConfig } | null>(null);

interface Props {
  children: React.ReactNode;
  app: IAppConfig;
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
