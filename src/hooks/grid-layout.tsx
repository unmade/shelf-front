import { Breakpoint, useBreakpoint } from 'hooks/media-query';

interface GridLayout {
  columnCount: number;
  rowCount: number;
}

export default function useGridLayout(ids: string[] | undefined): GridLayout {
  const breakpoint = useBreakpoint();
  let columnCount = 5;
  if (breakpoint === Breakpoint.base) {
    columnCount = 3;
  }
  return { columnCount, rowCount: Math.ceil((ids?.length ?? 0) / columnCount) };
}
