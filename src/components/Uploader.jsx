import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import FileDrop from '../containers/FileDrop';
import UploadButton from '../containers/UploadButton';
import UploadList from '../containers/UploadList';
import UploadListItem from '../containers/UploadListItem';

import Pill from './ui/Pill';

const maxHeight = {
  maxHeight: '50vh',
};

const height = {
  height: '50vh',
};

const dropzoneClass = [
  'p-4',
  'border-2',
  'border-dashed',
  'rounded-md',
  'flex',
  'flex-row',
  'items-center',
  'justify-center',
  'space-x-6',
  'transition',
  'ease-in',
  'duration-75',
].join(' ');

function Dropzone({ dragging }) {
  let classes;
  if (dragging) {
    classes = 'border-blue-400 bg-blue-100';
  } else {
    classes = 'bg-gray-100';
  }
  return (
    <div className={`${dropzoneClass} ${classes}`}>
      <icons.CloudUploadOutlined className="w-12 h-12 text-gray-400" />
      <div className="flex flex-col text-center">
        <p className="text-sm font-semibold text-gray-600">
          Drag files here
        </p>
        <p className="text-sm text-gray-400">
          or
        </p>
        <UploadButton className="px-2 py-1 font-semibold bg-blue-500 text-white rounded-md">
          <div className="flex flex-row items-center space-x-2">
            <icons.Upload />
            <p className="text-sm">
              Browse
            </p>
          </div>
        </UploadButton>
      </div>
    </div>
  );
}

Dropzone.propTypes = {
  dragging: PropTypes.bool,
};

Dropzone.defaultProps = {
  dragging: false,
};

const TEXTS = {
  all: 'No recents',
  inProgress: 'No in-progress uploads',
  failed: 'No failed uploads',
};

const PILLS = [
  {
    key: 'all',
    text: 'All',
    title: 'Show all uploads',
  },
  {
    key: 'inProgress',
    text: 'In-Progress',
    title: 'Show in-progress uploads',
  },
  {
    key: 'failed',
    text: 'Failed',
    title: 'Show failed uploads',
  },
];

function Uploader({
  uploadCount, uploadTo, visibilityFilter, onClear, onSetVisibilityFilter,
}) {
  const virtual = uploadCount > 10;
  return (
    <div className="w-96 p-4 bg-white rounded shadow text-gray-700">

      <FileDrop
        uploadTo={uploadTo}
        className="w-full"
        render={Dropzone}
      />

      <div className="mt-6 space-y-4">
        <p className="font-semibold">
          Recent Uploads
        </p>

        {(uploadCount > 0) ? (
          <div className="text-xs" style={(virtual) ? height : maxHeight}>
            <UploadList
              itemRender={UploadListItem}
              virtual={virtual}
            />
          </div>
        ) : (
          <div className="h-20 text-gray-600 flex flex-row items-center justify-center space-x-2">
            <icons.Collection className="w-6 h-6 text-gray-500" />
            <p className="text-sm">
              {TEXTS[visibilityFilter]}
            </p>
          </div>
        )}

        <div className="pt-2 text-xs border-t border-solid flex flex-row justify-between">
          <div className="flex flex-row space-x-2">
            {PILLS.map((pill) => (
              <Pill
                key={pill.key}
                title={pill.title}
                active={visibilityFilter === pill.key}
                onClick={() => (onSetVisibilityFilter(pill.key))}
              >
                {pill.text}
              </Pill>
            ))}
          </div>
          <button
            type="button"
            title="Clear"
            className="p-1 rounded-md hover:bg-gray-100"
            onClick={onClear}
          >
            <icons.Clear className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

Uploader.propTypes = {
  uploadCount: PropTypes.number.isRequired,
  uploadTo: PropTypes.string.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

export default Uploader;
