import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { performDownload } from '../../store/actions/files';
import { openDialog } from '../../store/actions/ui';

import { Dialogs, TRASH_FOLDER_NAME } from '../../constants';
import * as icons from '../../icons';

import Button from '../ui/Button';
import { getCurrentPath } from '../../store/reducers/ui';

function singleFileActions({ id, path, trashed, dispatch }) {
  if (trashed) {
    return [
      {
        name: 'Delete Immediately',
        icon: <icons.TrashOutlined className="w-4 h-4" />,
        danger: true,
        onClick: () => { dispatch(openDialog(Dialogs.deleteImmediately, { fileId: id })); },
      },
    ];
  }

  return [
    {
      name: 'Download',
      icon: <icons.Download className="w-4 h-4" />,
      danger: false,
      onClick: () => { dispatch(performDownload(path)); },
    },
    {
      name: 'Rename',
      icon: <icons.ICursor className="w-4 h-4" />,
      danger: false,
      onClick: () => { dispatch(openDialog(Dialogs.rename, { fileId: id })); },
    },
    {
      name: 'Move',
      icon: <icons.Move className="w-4 h-4" />,
      danger: false,
      onClick: () => { dispatch(openDialog(Dialogs.move, { fileId: id })); },
    },
    {
      name: 'Delete',
      icon: <icons.TrashOutlined className="w-4 h-4" />,
      danger: true,
      onClick: () => { dispatch(openDialog(Dialogs.delete, { fileId: id })); },
    },
  ];
}

function multiFileActions({ trashed }) {
  if (trashed) {
    return [
      {
        name: 'Delete Immediately',
        icon: <icons.TrashOutlined className="w-4 h-4" />,
        danger: true,
        onClick: () => {},
      },
    ];
  }

  return [
    {
      name: 'Move',
      icon: <icons.Move className="w-4 h-4" />,
      danger: false,
      onClick: () => {},
    },
    {
      name: 'Delete',
      icon: <icons.TrashOutlined className="w-4 h-4" />,
      danger: true,
      onClick: () => {},
    },
  ];
}

function SidePreviewActions({ files }) {
  const dispatch = useDispatch();
  const currentPath = useSelector(getCurrentPath);
  const trashed = (currentPath.toLowerCase().startsWith(TRASH_FOLDER_NAME.toLowerCase()));

  let menu;
  if (files.length === 1) {
    const [file] = files;
    menu = singleFileActions({ id: file.id, path: file.path, trashed, dispatch });
  } else {
    menu = multiFileActions({ trashed });
  }

  return (
    <>
      {menu.map((item) => (
        <Button
          key={item.name}
          type="text"
          icon={item.icon}
          title={item.name}
          danger={item.danger}
          onClick={item.onClick}
        />
      ))}
    </>
  );
}

SidePreviewActions.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default SidePreviewActions;
