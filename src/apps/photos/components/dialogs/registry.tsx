import type React from 'react';
import { createContext, useContext, useMemo, useReducer } from 'react';

import type { IAlbum, IMediaItem } from '@/types/photos';

// ---- State ----

export interface PhotosDialogsState {
  addToAlbum: { mediaItems: IMediaItem[]; open: boolean };
  createAlbum: { open: boolean };
  deleteMediaItems: { mediaItems: IMediaItem[]; open: boolean };
  deleteAlbum: { album: IAlbum | null; open: boolean };
  deleteMediaItemsImmediately: { mediaItems: IMediaItem[]; open: boolean };
  emptyTrash: { open: boolean };
  renameAlbum: { album: IAlbum | null; open: boolean };
}

const initialState: PhotosDialogsState = {
  addToAlbum: { mediaItems: [], open: false },
  createAlbum: { open: false },
  deleteMediaItems: { mediaItems: [], open: false },
  deleteAlbum: { album: null, open: false },
  deleteMediaItemsImmediately: { mediaItems: [], open: false },
  emptyTrash: { open: false },
  renameAlbum: { album: null, open: false },
};

// ---- Actions ----

type Action =
  | { type: 'open-add-to-album'; mediaItems: IMediaItem[] }
  | { type: 'open-create-album' }
  | { type: 'open-delete-media-items'; mediaItems: IMediaItem[] }
  | { type: 'open-delete-album'; album: IAlbum }
  | { type: 'open-delete-media-items-immediately'; mediaItems: IMediaItem[] }
  | { type: 'open-empty-trash' }
  | { type: 'open-rename-album'; album: IAlbum }
  | { type: 'close'; key: keyof PhotosDialogsState };

function reducer(state: PhotosDialogsState, action: Action): PhotosDialogsState {
  switch (action.type) {
    case 'open-add-to-album':
      return { ...state, addToAlbum: { mediaItems: action.mediaItems, open: true } };
    case 'open-create-album':
      return { ...state, createAlbum: { open: true } };
    case 'open-delete-media-items':
      return { ...state, deleteMediaItems: { mediaItems: action.mediaItems, open: true } };
    case 'open-delete-album':
      return { ...state, deleteAlbum: { album: action.album, open: true } };
    case 'open-delete-media-items-immediately':
      return {
        ...state,
        deleteMediaItemsImmediately: { mediaItems: action.mediaItems, open: true },
      };
    case 'open-empty-trash':
      return { ...state, emptyTrash: { open: true } };
    case 'open-rename-album':
      return { ...state, renameAlbum: { album: action.album, open: true } };
    case 'close':
      return { ...state, [action.key]: initialState[action.key] } as PhotosDialogsState;
    default:
      return state;
  }
}

// ---- Context ----

interface RegistryContextValue {
  state: PhotosDialogsState;
  dispatch: React.Dispatch<Action>;
}

const PhotosDialogsContext = createContext<RegistryContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export function PhotosDialogsRegistryProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <PhotosDialogsContext.Provider value={value}>{children}</PhotosDialogsContext.Provider>;
}

export function usePhotosDialogsRegistry(): RegistryContextValue {
  const value = useContext(PhotosDialogsContext);
  if (value == null) {
    throw new Error(
      '`usePhotosDialogsRegistry` must be used within a `PhotosDialogsRegistryProvider`',
    );
  }
  return value;
}
