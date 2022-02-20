export const BOOKMARKS = {
  prefix: '/bookmarks',
  route: '/bookmarks',
};

export const DUPLICATES = {
  prefix: '/duplicates',
  route: '/duplicates/:dirPath*',
};

export const FILES = {
  prefix: '/files',
  route: '/files/:dirPath*',
};

export const TRASH = {
  prefix: '/trash',
  route: '/trash/:dirPath*',
};

export const USER_MANAGEMENT = {
  prefix: '/admin/user-management',
  route: '/admin/user-management',
};

function basename(path) {
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
  const end = path.lastIndexOf('/');
  if (end < 0) {
    return '.';
  }
  return path.substring(0, end);
}

export function makeUrlFromPath({ path, asPreview }) {
  let { prefix } = FILES;
  if (path.toLowerCase().startsWith('trash')) {
    prefix = '/';
    // eslint-disable-next-line no-param-reassign
    path = `${path.charAt(0).toLowerCase()}${path.slice(1)}`;
  }
  if (asPreview) {
    return `${join(prefix, encodePath(parent(path)))}?preview=${encodePath(basename(path))}`;
  }
  return join(prefix, encodePath(path));
}

export function makePathFromUrl(url) {
  const start = url.slice(1).indexOf('/');
  if (start < 0) {
    return '.';
  }
  return decodeURIComponent(url.substring(start + 2));
}

export function isRoot(path) {
  return path === '.' || path.toLowerCase() === 'trash';
}
