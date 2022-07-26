import React from 'react';

import { useSelector } from 'react-redux';

import { getFileById } from '../../store/reducers/files';

import TimeAgo from '../ui/TimeAgo';

import SidePreviewActions from '../Browser/SidePreviewActions';

import BookmarkButton from '../BookmarkButton';
import FileInfoTabs from '../FileInfoTabs';

function Info({ className, fileId }) {
  const file = useSelector((state) => getFileById(state, fileId));

  return (
    <div className={className}>
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

      <div className="mt-4 flex justify-between py-3">
        <SidePreviewActions files={[file]} />
      </div>

      <div className="mt-4">
        <FileInfoTabs fileId={fileId} />
      </div>
    </div>
  );
}

export default Info;
