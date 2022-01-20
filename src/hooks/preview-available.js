import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { getHasSelectedFiles } from '../store/reducers/ui';

import { MediaQuery } from '../constants';

function useSidePreview() {
  const isOnLaptop = useMediaQuery({ query: MediaQuery.lg });
  const hasSelectedFiles = useSelector(getHasSelectedFiles);
  return isOnLaptop && hasSelectedFiles;
}

export default useSidePreview;
