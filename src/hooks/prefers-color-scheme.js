import { useEffect, useState } from 'react';

function useColorScheme() {
  const [scheme, setScheme] = useState('no-preference');

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return () => {};
    }

    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const light = window.matchMedia('(prefers-color-scheme: light)');

    if (dark.matches) {
      setScheme('dark');
    } else if (light.matches) {
      setScheme('light');
    } else {
      setScheme('no-preference');
    }

    if (typeof dark.addEventListener === 'function') {
      const darkListener = ({ matches }) => matches && setScheme('dark');
      const lightListener = ({ matches }) => matches && setScheme('light');
      dark.addEventListener('change', darkListener);
      light.addEventListener('change', lightListener);
      return () => {
        dark.removeEventListener('change', darkListener);
        light.removeEventListener('change', lightListener);
      };
    }

    return () => {};
  }, []);

  return scheme;
}

export default useColorScheme;
