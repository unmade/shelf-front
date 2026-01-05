import { useEffect, useState } from 'react';

import { getItem, setItem } from 'hooks/local-storage';

const APPEARANCE_KEY = 'state.appearance';

export enum Appearance {
  Light = 'light',
  Dark = 'dark',
  Auto = 'auto',
}

export function useAppearance(): {
  appearance: Appearance;
  colorScheme: Appearance.Light | Appearance.Dark;
  setAppearance: (value: Appearance) => void;
} {
  const initialValue = getItem<Appearance>(APPEARANCE_KEY) ?? Appearance.Auto;
  const [appearance, setAppearance] = useState<Appearance>(initialValue);

  const dark = window.matchMedia('(prefers-color-scheme: dark)');
  const initialColorScheme = dark.matches ? Appearance.Dark : Appearance.Light;

  const [colorScheme, setColorScheme] = useState<Appearance.Light | Appearance.Dark>(
    initialColorScheme,
  );

  const persistAppearance = (value: Appearance) => {
    setAppearance(value);
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
        document.documentElement.classList.add(Appearance.Dark);
        setColorScheme(Appearance.Dark);
      }
    };

    const onPrefersLight = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        document.documentElement.classList.remove(Appearance.Dark);
        setColorScheme(Appearance.Light);
      }
    };

    const cleanup = () => {
      dark.removeEventListener('change', onPrefersDark);
      light.removeEventListener('change', onPrefersLight);
    };

    switch (appearance) {
      case Appearance.Light:
        cleanup();
        document.documentElement.classList.remove(Appearance.Dark);
        setColorScheme(Appearance.Light);
        break;
      case Appearance.Dark:
        cleanup();
        document.documentElement.classList.add(Appearance.Dark);
        setColorScheme(Appearance.Dark);
        break;
      case Appearance.Auto:
        cleanup();
        if (dark.matches) {
          document.documentElement.classList.add(Appearance.Dark);
          setColorScheme(Appearance.Dark);
        } else {
          document.documentElement.classList.remove(Appearance.Dark);
          setColorScheme(Appearance.Light);
        }
        dark.addEventListener('change', onPrefersDark);
        light.addEventListener('change', onPrefersLight);
        break;
    }

    return cleanup;
  }, [appearance]);

  return { appearance, colorScheme, setAppearance: persistAppearance };
}
