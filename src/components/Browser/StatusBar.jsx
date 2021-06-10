import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getFilesCountByPath } from '../../store/reducers/files';

function StatusBar({ path }) {
  const count = useSelector((state) => getFilesCountByPath(state, path));
  return (
    <div className="bottom-0 w-full border-t bg-gray-50 text-center text-sm py-1 text-gray-400">
      {count}
      &nbsp;
      items
    </div>
  );
}

export default StatusBar;

StatusBar.propTypes = {
  path: PropTypes.string,
};

StatusBar.defaultProps = {
  path: '.',
};
