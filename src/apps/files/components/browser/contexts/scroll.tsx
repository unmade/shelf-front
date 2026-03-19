import { createContext, useCallback, useContext, useMemo, useRef } from 'react';

interface ScrollContextValue {
  getScrollOffset: (key: string) => number;
  setScrollOffset: (key: string, offset: number) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

interface ScrollProviderProps {
  children: React.ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const scrollOffsets = useRef<Map<string, number>>(new Map());

  const getScrollOffset = useCallback((key: string) => {
    return scrollOffsets.current.get(key) ?? 0;
  }, []);

  const setScrollOffset = useCallback((key: string, offset: number) => {
    scrollOffsets.current.set(key, offset);
  }, []);

  const value = useMemo(
    () => ({ getScrollOffset, setScrollOffset }),
    [getScrollOffset, setScrollOffset],
  );

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

function useScrollContext() {
  const context = useContext(ScrollContext);
  if (context === null) {
    throw new Error('`useScrollContext` must be used within a `ScrollProvider`');
  }
  return context;
}

export function useScrollPosition({ key }: { key: string }) {
  const { getScrollOffset, setScrollOffset } = useScrollContext();

  const initialScrollOffset = getScrollOffset(key);

  const onScrollOffsetChange = useCallback(
    ({ offset }: { key: string; offset: number }) => {
      setScrollOffset(key, offset);
    },
    [key, setScrollOffset],
  );

  return { initialScrollOffset, onScrollOffsetChange };
}
