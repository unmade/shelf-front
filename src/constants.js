export const TRASH_FOLDER_NAME = import.meta.env.SNOWPACK_PUBLIC_TRASH_FOLDER_NAME ?? 'Trash';

export const Dialogs = {
  createFolder: 'createFolder',
  emptyTrash: 'emptyTrash',
  delete: 'delete',
  deleteImmediately: 'deleteImmediately',
  move: 'move',
  rename: 'rename',
};

export const MediaType = {
  FOLDER: 'application/directory',
  IMAGES: new Set([
    'image/gif',
    'image/heic',
    'image/heif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
    'image/x-icon',
  ]),
  TEXTS: new Set([
    'text/javascript',
    'text/json',
    'text/sql',
    'text/x-sh',
    'text/x-zsh',
    'text/xml',
  ]),
  isImage(mediaType) {
    return this.IMAGES.has(mediaType);
  },
  isPDF(mediaType) {
    return mediaType === 'application/pdf';
  },
  isSVG(mediaType) {
    return mediaType === 'image/svg+xml';
  },
  isText(mediaType) {
    return this.TEXTS.has(mediaType);
  },
};

export const MediaQuery = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
};

export const MENU = [
  {
    path: '/files',
    title: 'All files',
  },
  {
    path: '/trash',
    title: TRASH_FOLDER_NAME,
  },
];
