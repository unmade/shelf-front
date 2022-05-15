import { useParams } from 'react-router-dom';

function useDirPath() {
  const { '*': dirPath } = useParams();
  return dirPath === '' ? '.' : decodeURIComponent(dirPath);
}

export default useDirPath;
