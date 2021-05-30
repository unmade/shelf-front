import { BREADCRUMBS_ALIASES } from './constants';

export function breadcrumbs(path, aliases = BREADCRUMBS_ALIASES) {
  const items = [];
  const parts = path.split('/').filter((e) => e !== '');
  let prefix = '';
  parts.forEach((part) => {
    prefix = (part !== '.') ? `${prefix}/${part}` : part;
    items.push({
      path: prefix,
      name: (aliases && aliases[part]) || part,
    });
  });

  return items;
}

export function join(pathA, pathB) {
  if (pathA === '.') {
    return pathB;
  }
  if (pathB === '.') {
    return pathA;
  }

  let a = pathA;
  if (a[a.length] === '/') {
    a = a.substring(0, a.length - 1);
  }

  let b = pathB;
  if (b[0] === '/') {
    b = b.substring(1);
  }

  return `${a}/${b}`;
}

export function parent(path) {
  const end = path.lastIndexOf('/');
  if (end < 0) {
    return '.';
  }
  return path.substring(0, path.lastIndexOf('/'));
}

export const FILES = {
  route: '/files/:dirPath*',
  reverse({ path }) {
    return join('/files', path);
  },
  preview({ name, path }) {
    return `${join('/files', parent(path))}?preview=${name}`;
  },
};

export const TRASH = {
  route: '/trash/:dirPath*',
  reverse({ path }) {
    return join('/trash', path);
  },
};

export const USER_MANAGEMENT = {
  route: '/admin/user-management',
  reverse() {
    return this.route;
  },
};
