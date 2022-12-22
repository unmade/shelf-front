import { useMediaQuery } from 'react-responsive';

import { MediaQuery } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export function useIsLaptop() {
  return useMediaQuery({ query: MediaQuery.lg });
}
