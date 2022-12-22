import { useSelector } from 'react-redux';

import { selectAllSelectedFileIds } from '../store/browser';

import { useIsLaptop } from './media-query';

function useSidePreview() {
  const isLaptop = useIsLaptop();
  const hasSelection = useSelector((state) => selectAllSelectedFileIds(state).size !== 0);
  return isLaptop && hasSelection;
}

export default useSidePreview;
