import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import * as icons from '../../../../icons';
import { FileShape } from '../../../../types';

import { download } from '../../../../store/files';

import {
  useCopyLinkAction,
  useDeleteAction,
  useDownloadAction,
  useFavouriteAction,
} from '../../../../hooks/file-actions';

import Button from '../../../../components/ui/Button';
import Menu from '../../../../components/ui/Menu';
import MenuItem from '../../../../components/ui/MenuItem';
import TimeAgo from '../../../../components/ui/TimeAgo';

import { useDeleteDialog } from '../../../../components/DeleteDialogProvider';

function FavouriteButton({ className, file }) {
  const { title, Icon, onClick } = useFavouriteAction([file]);

  return (
    <Button
      className={className}
      title={title}
      variant="text"
      size="base"
      icon={<Icon className="shrink-0 h-5 w-5" />}
      onClick={onClick}
    />
  );
}

function DownloadButton({ className, path }) {
  const dispatch = useDispatch();

  return (
    <Button
      className={className}
      title="Download"
      variant="text"
      size="base"
      icon={<icons.Download className="h-5 w-5" />}
      onClick={() => dispatch(download(path))}
    />
  );
}

function DeleteButton({ className, file }) {
  const openDeleteDialog = useDeleteDialog();
  return (
    <Button
      className={className}
      title="Move to Trash"
      variant="text"
      size="base"
      icon={<icons.TrashOutlined className="h-5 w-5" />}
      color="danger"
      onClick={() => openDeleteDialog([file])}
    />
  );
}

function MoreButton({ className, file }) {
  const copyLinkAction = useCopyLinkAction([file]);
  const deleteAction = useDeleteAction([file]);
  const downloadAction = useDownloadAction([file]);

  const groups = [
    {
      key: 'sharing',
      items: [downloadAction, copyLinkAction].filter((action) => action != null),
    },
    {
      key: 'deleting',
      items: [deleteAction].filter((action) => action != null),
    },
  ].filter((group) => group.items.length > 0);

  return (
    <Menu
      buttonClassName={className}
      panelClassName="min-w-[160px]"
      groups={groups}
      itemRenderer={MenuItem}
    >
      <Button
        as="div"
        variant="text"
        size="base"
        icon={<icons.MoreOutlined className="h-5 w-5" />}
      />
    </Menu>
  );
}

MoreButton.propTypes = {
  className: PropTypes.string,
  file: FileShape.isRequired,
};

MoreButton.defaultProps = {
  className: '',
};

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
        <div className="truncate text-sm font-medium">
          <TimeAgo className="hidden sm:block" mtime={file.mtime * 1000} format="LLLL" />
          <TimeAgo className="sm:hidden" mtime={file.mtime * 1000} format="LLL" />
        </div>
        <p className="text-xs dark:text-zinc-400">
          {idx + 1} of {total}
        </p>
      </div>

      <div className="flex min-w-max flex-row items-center justify-end space-x-2 text-gray-800 dark:text-zinc-200 sm:w-48">
        <FavouriteButton file={file} />
        <DownloadButton className="hidden sm:block" path={file.path} />
        <DeleteButton className="hidden sm:block" file={file} />
        <Button
          className="hidden sm:block"
          variant="text"
          size="base"
          icon={<icons.InformationCircleOutlined className="h-5 w-5" />}
          onClick={onInfo}
        />
        <MoreButton className="sm:hidden" file={file} />
      </div>
    </div>
  );
}

export default Header;
