import { useCallback } from 'react';

interface FileData {
  id: string;
  name: string;
  path: string;
}

interface FileActions {
  download: () => void;
  rename: () => void;
  move: () => void;
  copy: () => void;
  copyLink: () => void;
  addToFavorites: () => void;
  delete: () => void;
}

/**
 * Hook providing file action handlers.
 * Currently mocked - will be connected to actual implementations.
 */
export function useFileActions(file: FileData): FileActions {
  const download = useCallback(() => {
    console.log('Download:', file.name);
    // TODO: Implement download
  }, [file.name]);

  const rename = useCallback(() => {
    console.log('Rename:', file.name);
    // TODO: Implement rename dialog
  }, [file.name]);

  const move = useCallback(() => {
    console.log('Move:', file.name);
    // TODO: Implement move dialog
  }, [file.name]);

  const copy = useCallback(() => {
    console.log('Copy:', file.name);
    // TODO: Implement copy
  }, [file.name]);

  const copyLink = useCallback(() => {
    console.log('Copy link:', file.path);
    // TODO: Implement copy link to clipboard
  }, [file.path]);

  const addToFavorites = useCallback(() => {
    console.log('Add to favorites:', file.name);
    // TODO: Implement favorites
  }, [file.name]);

  const deleteFile = useCallback(() => {
    console.log('Delete:', file.name);
    // TODO: Implement delete confirmation
  }, [file.name]);

  return {
    download,
    rename,
    move,
    copy,
    copyLink,
    addToFavorites,
    delete: deleteFile,
  };
}
