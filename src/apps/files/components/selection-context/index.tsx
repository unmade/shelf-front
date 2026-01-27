import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface SelectionContextValue {
  selectedCount: number;
  selectedIds: Set<string>;
  toggleSelection: (id: string) => void;
  selectMultiple: (ids: string[]) => void;
  selectAll: (ids: string[]) => void;
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

  const selectMultiple = useCallback((ids: string[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  }, []);

  const selectAll = useCallback((ids: string[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds]);

  const selectedCount = selectedIds.size;

  const value = useMemo(
    () => ({
      selectedIds,
      toggleSelection,
      selectMultiple,
      selectAll,
      clearSelection,
      isSelected,
      selectedCount,
    }),
    [
      selectedIds,
      toggleSelection,
      selectMultiple,
      selectAll,
      clearSelection,
      isSelected,
      selectedCount,
    ],
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

/**
 * Hook to check if a specific file is selected.
 * This is optimized to only cause re-renders when the selection state
 * of this specific file changes.
 */
export function useIsSelected(id: string): boolean {
  const { selectedIds } = useSelectionContext();
  return selectedIds.has(id);
}
