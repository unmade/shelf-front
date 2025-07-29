import { useMediaQuery } from 'react-responsive';

export const Breakpoint = {
  base: null,
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
};

const BreakpointWidth = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  xxl: '(min-width: 1536px)',
};

export function useBreakpoint() {
  const sm = useMediaQuery({ query: BreakpointWidth.sm });
  const md = useMediaQuery({ query: BreakpointWidth.md });
  const lg = useMediaQuery({ query: BreakpointWidth.lg });
  const xl = useMediaQuery({ query: BreakpointWidth.xl });
  const xxl = useMediaQuery({ query: BreakpointWidth.xxl });
  if (xxl) {
    return Breakpoint.xxl;
  }
  if (xl) {
    return Breakpoint.xl;
  }
  if (lg) {
    return Breakpoint.lg;
  }
  if (md) {
    return Breakpoint.md;
  }
  if (sm) {
    return Breakpoint.sm;
  }
  return Breakpoint.base;
}

export function useIsLaptop() {
  return useMediaQuery({ query: BreakpointWidth.lg });
}

export function useTouchDevice() {
  return useMediaQuery({ query: '(pointer: coarse)' });
}
