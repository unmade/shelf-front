import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface SelectionContextValue {
  selectedIds: Set<string>;
  toggleSelection: (id: string) => void;
  select: (ids: string[]) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

interface SelectionProviderProps {
  children: React.ReactNode;
}

export function SelectionProvider({ children }: SelectionProviderProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const select = useCallback((ids: string[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds]);

  const value = useMemo(
    () => ({
      selectedIds,
      toggleSelection,
      select,
      clearSelection,
      isSelected,
    }),
    [selectedIds, toggleSelection, select, clearSelection, isSelected],
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelectionContext() {
  const context = useContext(SelectionContext);
  if (context === null) {
    throw new Error('useSelectionContext must be used within a SelectionProvider');
  }
  return context;
}

export function useIsSelected(id: string): boolean {
  const { selectedIds } = useSelectionContext();
  return selectedIds.has(id);
}

export function useSelect() {
  const { select } = useSelectionContext();
  return select;
}
