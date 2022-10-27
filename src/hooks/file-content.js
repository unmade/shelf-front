import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { download } from '../store/actions/files';
import { getDownload } from '../store/reducers/files';

function useFileContent(path, size, maxSize) {
  const dispatch = useDispatch();
  const original = useSelector((state) => getDownload(state, path));
  const shouldDownload = original == null && size < maxSize;

  useEffect(() => {
    if (shouldDownload) {
      dispatch(download(path));
    }
  }, [path, shouldDownload]);

  return original;
}

export default useFileContent;
