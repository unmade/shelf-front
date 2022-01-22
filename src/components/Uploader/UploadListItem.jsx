import React from 'react';

import { useTranslation } from 'react-i18next';

import * as icons from '../../icons';

import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

import FileIcon from '../FileIcon';

function UploadListItem({ item, style }) {
  const {
    name, mediatype, parentPath, progress, error,
  } = item;
  const { t } = useTranslation();

  return (
    <div style={style}>
      <div className="flex flex-row items-center space-x-4">
        <div>
          <FileIcon className="text-gray-400 w-6 h-6" mediatype={mediatype} />
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
                {t('Upload failed')}
              </p>
            </div>
          ) : (
            <ProgressBar progress={progress} />
          )}

        </div>
      </div>
    </div>
  );
}

export default UploadListItem;
