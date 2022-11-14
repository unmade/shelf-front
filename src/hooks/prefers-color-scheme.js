import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { getAppearance } from '../store/reducers/ui';

function usePrefersColorScheme() {
  const appearance = useSelector(getAppearance);

  const [scheme, setScheme] = useState('no-preference');

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return () => {};
    }

    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const light = window.matchMedia('(prefers-color-scheme: light)');

    const onPrefersDark = ({ matches }) => matches && setScheme('dark');
    const onPrefersLight = ({ matches }) => matches && setScheme('light');

    const cleanup = () => {
      dark.removeEventListener('change', onPrefersDark);
      light.removeEventListener('change', onPrefersLight);
    };

    if (appearance !== 'auto') {
      setScheme(appearance);
      return cleanup;
    }

    if (dark.matches) {
      setScheme('dark');
    } else if (light.matches) {
      setScheme('light');
    } else {
      setScheme('no-preference');
    }

    dark.addEventListener('change', onPrefersDark);
    light.addEventListener('change', onPrefersLight);

    return cleanup;
  }, [appearance]);

  useEffect(() => {
    if (scheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [scheme]);

  return scheme;
}

export default usePrefersColorScheme;
