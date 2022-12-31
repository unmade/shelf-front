import i18n from './i18n';

export const BOOKMARKS = {
  prefix: '/bookmarks',
  route: '/bookmarks/*',
};

export const DUPLICATES = {
  prefix: '/duplicates',
  route: '/duplicates/*',
};

export const FILES = {
  prefix: '/files',
  route: '/files/*',
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

export function basename(path) {
  const end = path.lastIndexOf('/');
  if (end < 0) {
    return path;
  }
  return path.substring(end + 1);
}

export function encodePath(path) {
  return path
    .split('/')
    .map((item) => encodeURIComponent(item))
    .join('/');
}

export function join(pathA, pathB) {
  if (pathA === '.') {
    return pathB;
  }
  if (pathB === '.') {
    return pathA;
  }

  let a = pathA;
  if (a[a.length - 1] === '/') {
    a = a.substring(0, a.length - 1);
  }

  let b = pathB;
  if (b[0] === '/') {
    b = b.substring(1);
  }

  return `${a}/${b}`;
}

export function folderName(path) {
  if (path === '.') {
    return 'Home';
  }
  return path.split('/').pop();
}

export function parent(path) {
  if (path === '.') {
    return null;
  }
  const end = path.lastIndexOf('/');
  if (end < 0) {
    return '.';
  }
  return path.substring(0, end);
}

export function isRoot(path) {
  return path === '.' || path.toLowerCase() === 'trash';
}

const breadcrumbsAliases = {
  files: {
    key: '.',
    name: i18n.t('Home'),
    url: FILES.prefix,
    path: '.',
  },
  trash: {
    key: 'trash',
    name: i18n.t('Trash'),
    url: TRASH.prefix,
    path: 'trash',
  },
};

i18n.on('languageChanged init', () => {
  breadcrumbsAliases.files.name = i18n.t('Home');
  breadcrumbsAliases.trash.name = i18n.t('Trash');
});

export function breadcrumbs(path) {
  const items = [];

  if (path.toLowerCase() === 'trash' || path.toLowerCase().startsWith('trash/')) {
    items.push(breadcrumbsAliases.trash);
  } else {
    items.push(breadcrumbsAliases.files);
  }

  if (isRoot(path)) {
    return items;
  }

  path
    .split('/')
    .slice(items[0].key === 'trash' ? 1 : 0)
    .forEach((part, idx) => {
      const itemPath = join(items[idx].path, part);
      items.push({
        key: itemPath,
        name: part,
        url: join(items[idx].url, encodePath(part)),
        path: itemPath,
      });
    });

  return items;
}
