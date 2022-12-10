import { useSearchParams } from 'react-router-dom';

import useDirPath from './dir-path';

import * as routes from '../routes';

function useResolvedPreviewSearchParam() {
  const [searchParams] = useSearchParams();
  const dirPath = useDirPath();

  const previewParam = searchParams.get('preview');
  if (previewParam == null) {
    return null;
  }

  return routes.join(dirPath, previewParam);
}

export default useResolvedPreviewSearchParam;
