import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function ProgressBar({ progress }) {
  const fillerStyles = {
    width: `${progress}%`,
    transition: 'width 1s ease-in-out',
  };

  return (
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
      <div
        style={fillerStyles}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500" />
    </div>
  );
}

function UploadItem({ item }) {
  const { file, progress } = item;
  return (
    <div>
      <div>
        <p>{file.name}</p>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
}

function Uploader({ files, uploadFile }) {
  useEffect(() => {
    const filesToUpload = files.filter((item) => item.progress === 0);
    filesToUpload.map((file) => uploadFile(file));
  }, [files.length]);

  return (files.length) ? (
    files.map((item) => (
      <UploadItem key={item.id} item={item} />
    ))
  ) : (
    <div>
      Empty
    </div>
  );
};

Uploader.propTypes = {
  files: PropTypes.array.isRequired,
};

export default Uploader;
