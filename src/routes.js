export const FILES = {
  route: '/files/:dirPath*',
  reverse({ path }) {
    return `/files/${path}`;
  },
  preview({ name, path }) {
    const parent = path.slice(0, path.length - name.length - 1);
    return `/files/${parent}?preview=${name}`;
  },
};

export const TRASH = {
  route: '/trash/:dirPath*',
};
