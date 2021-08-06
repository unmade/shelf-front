import { BREADCRUMBS_ALIASES } from './constants';

export const FILES = {
  prefix: '/files',
  route: '/files/:dirPath*',
};

export const TRASH = {
  prefix: 'trash',
  route: '/trash/:dirPath*',
};

export const USER_MANAGEMENT = {
  prefix: '/admin/user-management',
};

function norm(path) {
  if (path !== '.' && !path.startsWith('./')) {
    return `./${path}`;
  }
  return path;
}

export function breadcrumbs(path, aliases = BREADCRUMBS_ALIASES) {
  const items = [];
  const parts = norm(path).split('/').filter((e) => e !== '');
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
  if (a[a.length - 1] === '/') {
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
  return path.substring(0, end);
}

function basename(path) {
  const end = path.lastIndexOf('/');
  if (end < 0) {
    return path;
  }
  return path.substring(end + 1);
}

export function makeFileRoute({ path, asPreview }) {
  let { prefix } = FILES;
  if (path.toLowerCase().startsWith('trash')) {
    prefix = '/';
    // eslint-disable-next-line no-param-reassign
    path = `${path.charAt(0).toLowerCase()}${path.slice(1)}`;
  }
  if (asPreview) {
    return `${join(prefix, parent(path))}?preview=${basename(path)}`;
  }
  return join(prefix, path);
}
