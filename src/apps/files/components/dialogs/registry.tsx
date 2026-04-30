import type React from 'react';
import { createContext, useContext, useMemo, useReducer } from 'react';

import type { IFile } from '@/types/files';

// ---- State ----

export interface FilesDialogsState {
  copyLink: { file: IFile | null; open: boolean };
  createFolder: { path: string | undefined; open: boolean };
  delete: { files: IFile[]; open: boolean };
  deleteImmediately: { files: IFile[]; open: boolean };
  emptyTrash: { open: boolean };
  fileMembers: { fileId: string | undefined; open: boolean };
  move: { files: IFile[]; open: boolean };
  renameFile: { file: IFile | null; open: boolean };
}

const initialState: FilesDialogsState = {
  copyLink: { file: null, open: false },
  createFolder: { path: undefined, open: false },
  delete: { files: [], open: false },
  deleteImmediately: { files: [], open: false },
  emptyTrash: { open: false },
  fileMembers: { fileId: undefined, open: false },
  move: { files: [], open: false },
  renameFile: { file: null, open: false },
};

// ---- Actions ----

type Action =
  | { type: 'open-copy-link'; file: IFile }
  | { type: 'open-create-folder'; path: string }
  | { type: 'open-delete'; files: IFile[] }
  | { type: 'open-delete-immediately'; files: IFile[] }
  | { type: 'open-empty-trash' }
  | { type: 'open-file-members'; fileId: string }
  | { type: 'open-move'; files: IFile[] }
  | { type: 'open-rename-file'; file: IFile }
  | { type: 'close'; key: keyof FilesDialogsState };

function reducer(state: FilesDialogsState, action: Action): FilesDialogsState {
  switch (action.type) {
    case 'open-copy-link':
      return { ...state, copyLink: { file: action.file, open: true } };
    case 'open-create-folder':
      return { ...state, createFolder: { path: action.path, open: true } };
    case 'open-delete':
      return { ...state, delete: { files: action.files, open: true } };
    case 'open-delete-immediately':
      return { ...state, deleteImmediately: { files: action.files, open: true } };
    case 'open-empty-trash':
      return { ...state, emptyTrash: { open: true } };
    case 'open-file-members':
      return { ...state, fileMembers: { fileId: action.fileId, open: true } };
    case 'open-move':
      return { ...state, move: { files: action.files, open: true } };
    case 'open-rename-file':
      return { ...state, renameFile: { file: action.file, open: true } };
    case 'close':
      return { ...state, [action.key]: initialState[action.key] } as FilesDialogsState;
    default:
      return state;
  }
}

// ---- Context ----

interface RegistryContextValue {
  state: FilesDialogsState;
  dispatch: React.Dispatch<Action>;
}

const FilesDialogsContext = createContext<RegistryContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export function FilesDialogsRegistryProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <FilesDialogsContext.Provider value={value}>{children}</FilesDialogsContext.Provider>;
}

export function useFilesDialogsRegistry(): RegistryContextValue {
  const value = useContext(FilesDialogsContext);
  if (value == null) {
    throw new Error(
      '`useFilesDialogsRegistry` must be used within a `FilesDialogsRegistryProvider`',
    );
  }
  return value;
}
