import { useEffect } from 'react';

type KeyHandlers = Partial<Record<KeyboardEvent['code'], () => void>>;

interface UseKeyUpOptions {
  handlers: KeyHandlers;
  skip?: boolean;
}

export function useKeyUp({ handlers, skip = false }: UseKeyUpOptions) {
  useEffect(() => {
    if (skip) return;

    const onKeyUp = ({ code }: KeyboardEvent) => {
      handlers[code]?.();
    };
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [handlers, skip]);
}
