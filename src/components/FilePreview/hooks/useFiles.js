import { shallowEqual, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import usePreviewSearchParam from '../../../hooks/preview-search-param';
import useResolvedPreviewSearchParam from '../../../hooks/resolved-preview-search-param';

function useFiles({ ids, selectById }) {
  const [, setSearchParams] = useSearchParams();
  const pathToPreview = useResolvedPreviewSearchParam();

  const paths = useSelector((state) => ids.map((id) => selectById(state, id).path), shallowEqual);

  let currentIndex = 0;
  let prevIndex = 0;
  let nextIndex = 0;
  if (paths.length) {
    currentIndex = paths.findIndex((path) => path.replace('Trash/', '') === pathToPreview);
    prevIndex = currentIndex - 1 < 0 ? ids.length - 1 : currentIndex - 1;
    nextIndex = currentIndex + 1 > ids.length - 1 ? 0 : currentIndex + 1;
  }

  const files = useSelector(
    (state) => ({
      prevFile: selectById(state, ids[prevIndex]),
      file: selectById(state, ids[currentIndex]),
      nextFile: selectById(state, ids[nextIndex]),
    }),
    shallowEqual,
  );

  const prevFilePreview = usePreviewSearchParam(files.prevFile?.path ?? '');
  const nextFilePreview = usePreviewSearchParam(files.nextFile?.path ?? '');

  return {
    currentIndex,
    files,
    setPrevFile: () => setSearchParams(prevFilePreview, { replace: true }),
    setNextFile: () => setSearchParams(nextFilePreview, { replace: true }),
  };
}

export default useFiles;
