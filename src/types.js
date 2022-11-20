import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const FileShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  mtime: PropTypes.number.isRequired,
  hidden: PropTypes.bool.isRequired,
});
