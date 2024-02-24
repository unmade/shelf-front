export const REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA =
  import.meta.env.VITE_REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA ?? 10 * 60_000; // default to 10 minutes
export const TRASH_FOLDER_NAME = import.meta.env.VITE_TRASH_FOLDER_NAME ?? 'Trash';

export const TERMS_AND_CONDITION_URL = import.meta.env.VITE_TERMS_AND_CONDITION_URL ?? '#';
export const PRIVACY_POLICY_URL = import.meta.env.VITE_PRIVACY_POLICY_URL ?? '#';

export const MediaType = {
  FOLDER: 'application/directory',
  IMAGES: new Set([
    'image/bmp',
    'image/gif',
    'image/heic',
    'image/heif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
  ]),
  TEXTS: new Set([
    'application/javascript',
    'application/json',
    'application/sql',
    'application/x-sh',
    'application/x-zsh',
    'application/xml',
  ]),
  isFolder(mediaType: string) {
    return mediaType === this.FOLDER;
  },
  isImage(mediaType: string) {
    return this.IMAGES.has(mediaType);
  },
  isPDF(mediaType: string) {
    return mediaType === 'application/pdf';
  },
  isSVG(mediaType: string) {
    return mediaType === 'image/svg+xml';
  },
  isText(mediaType: string) {
    if (mediaType.startsWith('text')) {
      return true;
    }
    return this.TEXTS.has(mediaType);
  },
};

export const MEDIA_TYPE_EXT = {
  'image/bmp': ['.bmp'],
  'image/gif': ['.gif'],
  'image/heic': ['.heic', '.heif'],
  'image/heif': ['.heic', '.heif'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/png': ['.png'],
  'image/svg+xml': ['.svg'],
  'image/tiff': ['.tiff'],
  'image/webp': ['.webp'],
  'image/x-icon': ['.ico'],
};

export const ThumbnailSize = {
  xs: 'xs',
  lg: 'lg',
  xxl: 'xxl',
};

export const thumbnailSizes = [ThumbnailSize.xs, ThumbnailSize.lg, ThumbnailSize.xxl];
