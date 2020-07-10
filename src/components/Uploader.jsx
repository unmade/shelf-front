import React from 'react';
import PropTypes from 'prop-types';

import UploaderItem from '../containers/UploaderItem';

function Uploader({ uploads }) {
  return (uploads.length) ? (
    <div
      className="absolute bottom-0 right-0 w-1/4 m-4 bg-white rounded shadow"
    >
      <div className="p-2">
        <p>Uploads</p>
      </div>

      <div className="p-4 h-64 overflow-scroll">
        {uploads.map((uploadId) => (
          <UploaderItem key={uploadId} uniqueKey={uploadId} />
        ))}
      </div>

    </div>
  ) : (
    null
  );
}

Uploader.propTypes = {
  uploads: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Uploader;
