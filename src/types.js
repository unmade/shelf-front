import PropTypes from 'prop-types';

export const BreadcrumbShape = PropTypes.shape({
  key: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  url: PropTypes.string,
  path: PropTypes.path,
});

export const Children = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]);

export const FileShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  mtime: PropTypes.number.isRequired,
  hidden: PropTypes.bool.isRequired,
  thumbnail_url: PropTypes.string,
});

export const SharedLinkFileShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  mtime: PropTypes.number.isRequired,
  hidden: PropTypes.bool.isRequired,
  thumbnail_url: PropTypes.string,
});

export const ToastShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  closeAfter: PropTypes.number,
});
