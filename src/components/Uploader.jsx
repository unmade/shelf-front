import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import UploaderItem from '../containers/UploaderItem';

function Uploader({ files, uploadFile }) {
  useEffect(() => {
    const filesToUpload = files.filter((item) => item.progress === 0);
    filesToUpload.map((file) => uploadFile(file));
  });

  return (files.length) ? (
    <div
      className="absolute bottom-0 right-0 w-1/4 m-4 bg-white rounded shadow"
    >
      <div className="p-2">
        <p>Uploads</p>
      </div>

      <div className="p-4 h-64 overflow-scroll">
        {files.map((item) => (
          <UploaderItem key={item.id} uniqueKey={item.id} />
        ))}
      </div>

    </div>
  ) : (
    null
  );
}

Uploader.propTypes = {
  files: PropTypes.array.isRequired,
};

export default Uploader;
