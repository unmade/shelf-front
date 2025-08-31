import { useEffect, useState } from 'react';

import { getItem, setItem } from 'hooks/local-storage';

const APPEARANCE_KEY = 'state.appearance';

export enum ColorScheme {
  Light = 'light',
  Dark = 'dark',
  Auto = 'auto',
}

function usePrefersColorScheme(): [ColorScheme, (value: ColorScheme) => void] {
  const initialValue = getItem<ColorScheme>(APPEARANCE_KEY) ?? ColorScheme.Auto;
  const [scheme, setScheme] = useState<ColorScheme>(initialValue);

  const persistScheme = (value: ColorScheme) => {
    setScheme(value);
    setItem(APPEARANCE_KEY, value);
  };

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const light = window.matchMedia('(prefers-color-scheme: light)');

    const onPrefersDark = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        document.documentElement.classList.add(ColorScheme.Dark);
      }
    };

    const onPrefersLight = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        document.documentElement.classList.remove(ColorScheme.Dark);
      }
    };

    const cleanup = () => {
      dark.removeEventListener('change', onPrefersDark);
      light.removeEventListener('change', onPrefersLight);
    };

    switch (scheme) {
      case ColorScheme.Light:
        cleanup();
        document.documentElement.classList.remove(ColorScheme.Dark);
        break;
      case ColorScheme.Dark:
        cleanup();
        document.documentElement.classList.add(ColorScheme.Dark);
        break;
      case ColorScheme.Auto:
        cleanup();
        if (dark.matches) {
          document.documentElement.classList.add(ColorScheme.Dark);
        } else {
          document.documentElement.classList.remove(ColorScheme.Dark);
        }
        dark.addEventListener('change', onPrefersDark);
        light.addEventListener('change', onPrefersLight);
        break;
    }

    return cleanup;
  }, [scheme]);

  return [scheme, persistScheme];
}

export default usePrefersColorScheme;
