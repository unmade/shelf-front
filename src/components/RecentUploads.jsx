import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import UploadList from '../containers/UploadList';
import UploadListItem from '../containers/UploadListItem';

import Button from './ui/Button';
import Pill from './ui/Pill';

const height = {
  minHeight: '20vh',
  maxHeight: '50vh',
};

const fixedHeight = {
  height: height.maxHeight,
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

const TEXTS = {
  all: 'No recents',
  inProgress: 'No in-progress uploads',
  failed: 'No failed uploads',
};

function RecentUploads({
  uploadCount, visibilityFilter, onClear, onSetVisibilityFilter,
}) {
  const virtual = uploadCount > 10;
  return (
    <div className="mt-6">
      <p className="font-semibold">
        Recent Uploads
      </p>

      <div className="sm:flex sm:flex-col-reverse">
        <div className="pt-4 pb-2 sm:pb-0 sm:pt-2 text-xs border-b sm:border-b-0 sm:border-t border-solid flex flex-row justify-between">
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
          <Button
            type="text"
            icon={<icons.Clear className="w-4 h-4" />}
            title="Clear"
            onClick={onClear}
          />
        </div>

        {(uploadCount > 0) ? (
          <div className="text-xs" style={(virtual) ? fixedHeight : height}>
            <UploadList
              itemRender={UploadListItem}
              virtual={virtual}
            />
          </div>
        ) : (
          <div
            className="h-20 text-gray-600 flex flex-row items-center justify-center space-x-2"
            style={height}
          >
            <icons.Collection className="w-6 h-6 text-gray-500" />
            <p className="text-sm">
              {TEXTS[visibilityFilter]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

RecentUploads.propTypes = {
  uploadCount: PropTypes.number.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  onSetVisibilityFilter: PropTypes.func.isRequired,
};

export default RecentUploads;
