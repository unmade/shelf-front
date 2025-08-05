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

    const onPrefersDark = ({ matches }: MediaQueryListEvent) =>
      matches && persistScheme(ColorScheme.Dark);

    const onPrefersLight = ({ matches }: MediaQueryListEvent) =>
      matches && persistScheme(ColorScheme.Light);

    const cleanup = () => {
      dark.removeEventListener('change', onPrefersDark);
      light.removeEventListener('change', onPrefersLight);
    };

    if (scheme !== ColorScheme.Auto) {
      persistScheme(scheme);
      return cleanup;
    }

    if (dark.matches) {
      persistScheme(ColorScheme.Dark);
    } else if (light.matches) {
      persistScheme(ColorScheme.Light);
    } else {
      persistScheme(ColorScheme.Auto);
    }

    dark.addEventListener('change', onPrefersDark);
    light.addEventListener('change', onPrefersLight);

    return cleanup;
  }, [scheme]);

  useEffect(() => {
    if (scheme === ColorScheme.Dark) {
      document.documentElement.classList.add(ColorScheme.Dark);
    } else {
      document.documentElement.classList.remove(ColorScheme.Dark);
    }
  }, [scheme]);

  return [scheme, persistScheme];
}

export default usePrefersColorScheme;
