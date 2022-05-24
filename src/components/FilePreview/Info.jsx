import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getFileById } from '../../store/reducers/files';

import FileSize from '../ui/FileSize';
import TimeAgo from '../ui/TimeAgo';

import SidePreviewActions from '../Browser/SidePreviewActions';

import BookmarkButton from '../BookmarkButton';

function Info({ className, fileId }) {
  const { t } = useTranslation();

  const file = useSelector((state) => getFileById(state, fileId));

  return (
    <div className={className}>
      <div>
        <div className="flex">
          <div className="mr-4 w-full min-w-0 text-gray-800">
            <p className="truncate text-lg font-semibold">{file.name}</p>
            <p className="text-xs font-medium text-gray-500">
              <TimeAgo mtime={file.mtime * 1000} />
            </p>
          </div>
          <div>
            <BookmarkButton fileId={file.id} className="hover:bg-orange-50" size="lg" />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-base font-medium">{t('Information')}</h3>
          <div className="divide-y text-xs font-medium">
            <div className="flex justify-between py-3">
              <p className="text-gray-500">{t('Size')}</p>
              <p>
                <FileSize size={file.size} />
              </p>
            </div>
            <div className="flex justify-between py-3">
              <p className="text-gray-500">{t('Created')}</p>
              <p>
                <TimeAgo mtime={file.mtime * 1000} format="LLL" />
              </p>
            </div>
            <div className="flex justify-between py-3">
              <p className="text-gray-500">{t('Modified')}</p>
              <p>
                <TimeAgo mtime={file.mtime * 1000} format="LLL" />
              </p>
            </div>
            <div className="flex justify-between py-3">
              <SidePreviewActions files={[file]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
