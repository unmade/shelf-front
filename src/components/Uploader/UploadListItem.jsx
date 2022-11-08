import React from 'react';

import { useSelector } from 'react-redux';

import { getUploadById } from '../../store/reducers/uploads';

import * as icons from '../../icons';

import UploadThumbnail from './UploadThumbnail';

const textColors = {
  completed: {
    primary: 'text-teal-700',
    secondary: 'text-teal-600',
  },
  failed: {
    primary: 'text-red-700',
    secondary: 'text-red-600',
  },
  inProgress: {
    primary: 'text-gray-600',
    secondary: 'text-gray-500',
  },
};

const bgColors = {
  completed: 'bg-teal-400/25',
  failed: 'bg-red-400/25',
  inProgress: 'bg-blue-400/25',
};

function getStatus({ progress, error }) {
  if (error) {
    return 'failed';
  }
  if (progress === 100) {
    return 'completed';
  }
  return 'inProgress';
}

function UploadListItem({ uploadId, style }) {
  const item = useSelector((state) => getUploadById(state, uploadId));

  const { id, name, parentPath, progress, error } = item;

  const fillerStyles = {
    height: 'calc(100% - 0.25rem)',
    width: `${error ? '100' : progress}%`,
    transition: 'width 0.3s ease-in-out',
  };

  const status = getStatus(item);
  const textColor = textColors[status];
  const bgColor = bgColors[status];

  return (
    <div style={style}>
      <div className="flex h-full flex-row items-center space-x-4 py-2">
        <div style={fillerStyles} className={`absolute rounded-xl ${bgColor}`} />
        <div className="z-10">
          <UploadThumbnail className={`${textColor.secondary} h-12 w-12`} uploadId={id} />
        </div>

        <div className="z-10 flex w-full min-w-0 flex-col">
          <div className="flex flex-row items-center justify-between space-x-4">
            <div className={`flex min-w-0 flex-col ${textColor.primary}`}>
              <p className="truncate font-semibold">{name}</p>
              <p className={`truncate ${textColor.secondary}`}>{parentPath}</p>
            </div>

            <div className="text-right text-sm">
              {error ? (
                <icons.ExclamationCircle className={`z-10 mr-2 h-5 w-5 ${textColor.secondary}`} />
              ) : (
                <div className={`mr-2 font-medium ${textColor.secondary}`}>{progress}%</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadListItemContainer({ data, index, style }) {
  return <UploadListItem uploadId={data[index]} style={style} />;
}

export default React.memo(UploadListItemContainer);
