import React from 'react';

import * as icons from '../icons';

import ProgressBar from './ui/ProgressBar';

import FileIcon from './FileIcon';

const styles = {
  padding: '0.25rem',
  fontSize: '0.5rem',
};

function UploadListItem({ item }) {
  const {
    name, mediatype, parentPath, progress, error,
  } = item;
  return (
    <div className="flex flex-row items-center space-x-4">
      <div>
        <FileIcon className="text-gray-400 w-6 h-6" mediatype={mediatype} />
        {/* <icons.File className="text-gray-400 w-6 h-6" /> */}
      </div>

      <div className="w-full flex flex-col space-y-2 min-w-0">

        <div className="flex flex-row items-center justify-between space-x-4">
          <div className="flex flex-col min-w-0">
            <p className="font-semibold truncate">
              {name}
            </p>

            <p className="text-gray-600 truncate">
              {parentPath}
            </p>
          </div>

          <div className="text-right text-sm">
            {(error) ? (
              <button
                type="button"
                title="Retry"
                className="w-4 h-4 bg-red-500 text-red-100 rounded-full"
                style={styles}
              >
                <icons.Redo />
              </button>
            ) : (
              <div className="font-semibold">
                {(progress < 100) ? (
                  `${progress}%`
                ) : (
                  <icons.CheckCircle className="text-green-500" />
                )}
              </div>
            )}
          </div>
        </div>

        {(error) ? (
          <div className="flex flex-row text-red-500 space-x-2">
            <p>
              Upload failed
            </p>
          </div>
        ) : (
          <ProgressBar progress={progress} />
        )}

      </div>
    </div>
  );
}

export default UploadListItem;
