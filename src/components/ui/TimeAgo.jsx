import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

function TimeAgo({ mtime, format = null }) {
  const dt = (format != null) ? moment(mtime).format(format) : moment(mtime).fromNow();
  return (
    <>
      {dt}
    </>
  );
}

TimeAgo.propTypes = {
  mtime: PropTypes.number.isRequired,
};

export default TimeAgo;
