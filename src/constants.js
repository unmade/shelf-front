export const REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA =
  import.meta.env.SNOWPACK_PUBLIC_REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA ?? 10 * 60_000; // default to 10 minutes
export const TRASH_FOLDER_NAME = import.meta.env.SNOWPACK_PUBLIC_TRASH_FOLDER_NAME ?? 'Trash';

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
    'application/javascript',
    'application/json',
    'application/sql',
    'application/x-sh',
    'application/x-zsh',
    'application/xml',
  ]),
  isFolder(mediaType) {
    return mediaType === this.FOLDER;
  },
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
    if (mediaType.startsWith('text')) {
      return true;
    }
    return this.TEXTS.has(mediaType);
  },
};

export const MediaQuery = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
};

export const ThumbnailSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: '2xl',
  xxxl: '3xl',
};

export const thumbnailSizes = [
  ThumbnailSize.xs,
  ThumbnailSize.sm,
  ThumbnailSize.md,
  ThumbnailSize.lg,
  ThumbnailSize.xl,
  ThumbnailSize.xxl,
  ThumbnailSize.xxxl,
];
