import { useParams } from 'react-router';

function useDirPath() {
  const { '*': dirPath } = useParams();
  return dirPath === '' ? '.' : dirPath;
}

export default useDirPath;
