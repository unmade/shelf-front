import PropTypes from 'prop-types';

export const FileShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  mtime: PropTypes.number.isRequired,
  hidden: PropTypes.bool.isRequired,
});

export const ToastShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  closeAfter: PropTypes.number,
});
