import React from 'react';

import { useTranslation } from 'react-i18next';

import * as icons from '../../icons';

import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

import FileIcon from '../FileIcon';

function UploadListItem({ item, style }) {
  const { name, mediatype, parentPath, progress, error } = item;
  const { t } = useTranslation();

  return (
    <div style={style}>
      <div className="flex flex-row items-center space-x-4">
        <div>
          <FileIcon className="h-6 w-6 text-gray-400" mediatype={mediatype} />
        </div>

        <div className="flex w-full min-w-0 flex-col space-y-2">
          <div className="flex flex-row items-center justify-between space-x-4">
            <div className="flex min-w-0 flex-col">
              <p className="truncate font-semibold">{name}</p>

              <p className="truncate text-gray-600">{parentPath}</p>
            </div>

            <div className="text-right text-sm">
              {error ? (
                <Button
                  type="primary"
                  shape="circle"
                  size="xs"
                  title="Retry"
                  icon={<icons.Redo />}
                  danger
                />
              ) : (
                <div className="font-semibold">
                  {progress < 100 ? (
                    `${progress}%`
                  ) : (
                    <icons.CheckCircle className="text-emerald-500" />
                  )}
                </div>
              )}
            </div>
          </div>

          {error ? (
            <div className="flex flex-row space-x-2 text-red-500">
              <p>{t('Upload failed')}</p>
            </div>
          ) : (
            <ProgressBar progress={progress} info={progress < 100} success={progress === 100} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadListItem;
