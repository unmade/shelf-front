import { useSearchParams } from 'react-router-dom';

import useDirPath from './dir-path';

const trashPrefix = 'trash/';

function usePreviewSearchParam(path) {
  if (path.toLowerCase().startsWith(trashPrefix)) {
    // eslint-disable-next-line no-param-reassign
    path = path.slice(trashPrefix.length);
  }
  if (path.toLowerCase() === 'trash') {
    // eslint-disable-next-line no-param-reassign
    path = '';
  }

  const dirPath = useDirPath();
  let relPath = path;
  if (dirPath !== '.' && path.toLocaleLowerCase().startsWith(dirPath.toLocaleLowerCase())) {
    relPath = path.replace(dirPath, '').substring(1);
  }
  const [searchParams] = useSearchParams();
  searchParams.set('preview', relPath);
  return searchParams;
}

export default usePreviewSearchParam;
