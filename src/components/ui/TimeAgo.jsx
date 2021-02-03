import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

function TimeAgo({ mtime }) {
  return (
    <>
      {moment(mtime).fromNow()}
    </>
  );
}

TimeAgo.propTypes = {
  mtime: PropTypes.number.isRequired,
};

export default TimeAgo;
