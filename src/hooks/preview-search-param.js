import { useSearchParams } from 'react-router';

import useDirPath from './dir-path';

const trashPrefix = 'trash/';

function usePreviewSearchParam(path) {
  if (path.toLowerCase().startsWith(trashPrefix)) {
    path = path.slice(trashPrefix.length);
  }
  if (path.toLowerCase() === 'trash') {
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
