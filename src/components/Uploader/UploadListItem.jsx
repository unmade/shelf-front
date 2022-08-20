import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUploadById } from '../../store/reducers/uploads';

import * as icons from '../../icons';

import Button from '../ui/Button';

import FileIcon from '../FileIcon';

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

  const { name, mediatype, parentPath, progress, error } = item;
  const { t } = useTranslation();

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
        <div style={fillerStyles} className={`absolute my-1 rounded-lg ${bgColor}`} />
        <div>
          <FileIcon className={`${textColor.secondary} h-6 w-6`} mediatype={mediatype} />
        </div>

        <div className="z-10 flex w-full min-w-0 flex-col space-y-2">
          <div className="flex flex-row items-center justify-between space-x-4">
            <div className={`flex min-w-0 flex-col ${textColor.primary}`}>
              <p className="truncate font-semibold">{name}</p>
              <p className={`truncate ${textColor.secondary}`}>{parentPath}</p>
            </div>

            <div className="text-right text-sm">
              {error ? (
                <Button
                  type="primary"
                  className="mr-2"
                  size="base"
                  title={t('Retry')}
                  icon={<icons.Redo className="z-10 h-4 w-4" />}
                  danger
                />
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
