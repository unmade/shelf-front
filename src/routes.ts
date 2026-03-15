import type { SVGProps } from 'react';

import i18n from './i18n';
import * as icons from './icons';

export const BOOKMARKS = {
  prefix: '/bookmarks',
  route: '/bookmarks/*',
};

export const EMAIL_VERIFICATION = {
  prefix: '/email-verification',
  route: '/email-verification/*',
};

export const FILES = {
  prefix: '/files',
  route: '/files/*',
};

export const PHOTOS = {
  prefix: '/photos',
  route: '/photos',
};

export const PHOTOS_ALBUMS = {
  prefix: '/photos/albums',
  route: '/albums',
};

export const PHOTOS_ALBUMS_ALBUM = {
  prefix: '/photos/albums',
  route: '/albums/:albumId',
};

export const PHOTOS_FAVOURITES = {
  prefix: '/favourites',
  route: '/favourites',
};

export const PHOTOS_SHARED_VIA_LINK = {
  prefix: '/shared-links',
  route: '/shared-links',
};

export const PHOTOS_TRASH = {
  prefix: '/trash',
  route: '/trash',
};

export const SHARED_IN_APP = {
  prefix: '/shared-in-app',
  route: '/shared-in-app',
};

export const SHARED_VIA_LINK = {
  prefix: '/shared-via-link',
  route: '/shared-via-link',
};

export const SHARED_LINK_FILE = {
  prefix: '/s',
  route: '/s/:token/:filename',
};

export const SIGNIN = {
  prefix: '/signin',
  route: '/signin',
};

export const SIGNUP = {
  prefix: '/signup',
  route: '/signup',
};

export const TRASH = {
  prefix: '/trash',
  route: '/trash/*',
};

export const USER_MANAGEMENT = {
  prefix: '/admin/user-management',
  route: '/admin/user-management',
};

export function basename(path: string): string {
  const end = path.lastIndexOf('/');
  if (end < 0) {
    return path;
  }
  return path.substring(end + 1);
}

export function encodePath(path: string): string {
  return path
    .split('/')
    .map((item) => encodeURIComponent(item))
    .join('/');
}

export function join(pathA: string, pathB: string): string {
  if (pathA === '.') {
    return pathB;
  }
  if (pathB === '.') {
    return pathA;
  }

  let a = pathA;
  if (a.endsWith('/')) {
    a = a.substring(0, a.length - 1);
  }

  let b = pathB;
  if (b.startsWith('/')) {
    b = b.substring(1);
  }

  return `${a}/${b}`;
}

export function folderName(path: string): string {
  if (path === '.') {
    return i18n.t('Home');
  }
  return path.split('/').at(-1) ?? path;
}

export function parent(path: string): string | null {
  if (path === '.') {
    return null;
  }
  const end = path.lastIndexOf('/');
  if (end < 0) {
    return '.';
  }
  return path.substring(0, end);
}

export function parents(path: string): string[] {
  const items: string[] = [];
  for (let parentPath: string | null = path; parentPath !== null; parentPath = parent(parentPath)) {
    items.push(parentPath);
  }
  return items;
}

export function isRoot(path: string): boolean {
  return path === '.' || path.toLowerCase() === 'trash';
}

export function isTrashed(path: string): boolean {
  return path.toLowerCase() === 'trash' || path.toLowerCase().startsWith('trash/');
}

interface BreadcrumbEntry {
  key: string;
  name: string;
  Icon?: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  url: string;
}

const breadcrumbsAliases: Record<string, BreadcrumbEntry> = {
  [FILES.prefix]: {
    key: FILES.prefix,
    name: i18n.t('Home'),
    Icon: icons.Home,
    url: FILES.prefix,
  },
  [TRASH.prefix]: {
    key: TRASH.prefix,
    name: i18n.t('Trash'),
    Icon: icons.Trash,
    url: TRASH.prefix,
  },
  [BOOKMARKS.prefix]: {
    key: BOOKMARKS.prefix,
    name: i18n.t('Saved'),
    Icon: icons.BookmarkOutlined,
    url: BOOKMARKS.prefix,
  },
};

i18n.on('languageChanged init', () => {
  breadcrumbsAliases[FILES.prefix].name = i18n.t('Home');
  breadcrumbsAliases[TRASH.prefix].name = i18n.t('Trash');
  breadcrumbsAliases[BOOKMARKS.prefix].name = i18n.t('Saved');
});

export function breadcrumbsFromUrl(pathname: string): BreadcrumbEntry[] {
  const matchedPrefix = Object.keys(breadcrumbsAliases).find(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/'),
  );

  if (!matchedPrefix) {
    return [];
  }

  const root = breadcrumbsAliases[matchedPrefix];
  const items: BreadcrumbEntry[] = [root];

  const rest = pathname.slice(matchedPrefix.length);
  if (!rest || rest === '/') {
    return items;
  }

  rest
    .split('/')
    .filter(Boolean)
    .forEach((segment) => {
      const prev = items[items.length - 1];
      const url = `${prev.url}/${segment}`;
      items.push({
        key: url,
        name: decodeURIComponent(segment),
        url,
      });
    });

  return items;
}
