import React from 'react';
import PropTypes from 'prop-types';

import getHumanSize from '../filesize';

function FileSize({ size }) {
  return (
    <div>
      {getHumanSize(size)}
    </div>
  );
}

FileSize.propTypes = {
  size: PropTypes.number.isRequired,
};

export default FileSize;
