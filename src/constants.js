export const TRASH_FOLDER_NAME = process.env.REACT_APP_TRASH_FOLDER_NAME || 'Trash';

export const BREADCRUMBS_ALIASES = {
  '.': 'Home',
  files: 'Home',
  trash: TRASH_FOLDER_NAME,
};

export const Dialogs = {
  delete: 'delete',
  deleteImmediately: 'deleteImmediately',
  move: 'move',
  rename: 'rename',
};

export const MediaType = {
  FOLDER: 'application/directory',
  isImage(mediaType) {
    const [type, subtype] = mediaType.split('/');
    return (type === 'image' && ['jpeg', 'png', 'svg+xml', 'x-icon'].includes(subtype));
  },
  isText(mediaType) {
    if (mediaType.startsWith('text')) {
      return true;
    }
    const subtype = mediaType.split('/')[1];
    return ['javascript', 'json', 'sql', 'x-sh', 'x-zsh', 'xml'].includes(subtype);
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
