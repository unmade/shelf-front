import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { selectAllSelectedFileIds } from '../store/browser';

import { MediaQuery } from '../constants';

function useSidePreview() {
  const isOnLaptop = useMediaQuery({ query: MediaQuery.lg });
  const hasSelection = useSelector((state) => selectAllSelectedFileIds(state).size !== 0);
  return isOnLaptop && hasSelection;
}

export default useSidePreview;
