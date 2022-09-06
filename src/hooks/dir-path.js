import { useParams } from 'react-router-dom';

function useDirPath() {
  const { '*': dirPath } = useParams();
  return dirPath === '' ? '.' : dirPath;
}

export default useDirPath;
