import React from 'react';

import { useDispatch } from 'react-redux';

import { download } from '../../../../store/files';

import * as icons from '../../../../icons';

import Button from '../../../../components/ui/Button';
import TimeAgo from '../../../../components/ui/TimeAgo';

import { useDeleteDialog } from '../../../../components/DeleteDialogProvider';

function DownloadButton({ path }) {
  const dispatch = useDispatch();

  return (
    <Button
      title="Download"
      variant="text"
      size="base"
      icon={<icons.Download className="h-5 w-5" />}
      onClick={() => dispatch(download(path))}
    />
  );
}

function DeleteButton({ file }) {
  const openDeleteDialog = useDeleteDialog();
  return (
    <Button
      title="Move to Trash"
      variant="text"
      size="base"
      icon={<icons.TrashOutlined className="h-5 w-5" />}
      color="danger"
      onClick={() => openDeleteDialog([file])}
    />
  );
}

function Header({ file, idx, total, onGoBack, onInfo }) {
  return (
    <div className="flex flex-row items-center justify-between px-4 py-3">
      <div className="flex flex-row sm:w-48">
        <Button
          variant="text"
          size="base"
          icon={<icons.ChevronLeftOutlined className="h-5 w-5" />}
          onClick={onGoBack}
        />
      </div>

      <div className="w-full min-w-0 px-4 sm:px-8 text-center">
        <p className="truncate text-sm font-medium">
          <TimeAgo mtime={file.mtime * 1000} format="LLLL" />
        </p>
        <p className="text-xs dark:text-zinc-400">
          {idx + 1} of {total}
        </p>
      </div>

      <div className="flex min-w-max flex-row items-center justify-end space-x-2 text-gray-800 dark:text-zinc-200 sm:w-48">
        <DownloadButton path={file.path} />
        <DeleteButton file={file} />
        <Button
          className="hidden sm:block"
          variant="text"
          size="base"
          icon={<icons.InformationCircleOutlined className="h-5 w-5" />}
          onClick={onInfo}
        />
      </div>
    </div>
  );
}

export default Header;
