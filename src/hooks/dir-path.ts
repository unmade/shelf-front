import { useParams } from 'react-router';

export function useDirPath(): string | undefined {
  const { '*': dirPath } = useParams();
  return dirPath === '' ? '.' : dirPath;
}
