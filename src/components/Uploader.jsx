import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import ProgressBar from './ProgressBar';

function UploadItem({ item }) {
  const { file, progress } = item;
  return (
    <div>
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2">
            {file.name}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block">
            {(progress < 100) ? (
              `${progress}%`
            ) : (
              <icons.CheckCircle className="text-green-500" />
            )}
          </span>
        </div>
      </div>

      <ProgressBar progress={progress} />
    </div>
  );
}

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
          <UploadItem key={item.id} item={item} />
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
