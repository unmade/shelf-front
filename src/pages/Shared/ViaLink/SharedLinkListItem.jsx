import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import useSharedLink from '../../../hooks/shared-link';

import { selectFileSharedViaLinkById } from '../../../store/sharing';

import { MediaType } from '../../../constants';
import * as icons from '../../../icons';
import * as routes from '../../../routes';

import Button from '../../../components/ui/Button';

import FileLink from '../../../components/FileLink';
import { useCopyLinkDialog } from '../../../components/CopyLinkDialogProvider';
import CopyToClipboardButton from '../../../components/CopyToClipboardButton';
import Thumbnail from '../../../components/Thumbnail';
import TimeAgo from '../../../components/ui/TimeAgo';

function SharedLinkListItem({ fileId }) {
  const item = useSelector((state) => selectFileSharedViaLinkById(state, fileId));
  const { name, path, token } = item;
  const sharedLink = useSharedLink({ token, filename: name });
  const parentPath = routes.parent(path);
  const sharedAt = new Date(item.sharedAt).getTime();

  const openCopyLinkDialog = useCopyLinkDialog();

  return (
    <div className="show-on-hover-trigger px-12 h-[72px] flex items-center w-full dark:bg-zinc-700/30 rounded-xl">
      {/* file icon and name */}
      <div className="md:w-3/5 lg:w-3/4 flex text-gray-900 dark:text-zinc-100 w-full">
        <div className="flex w-full items-center space-x-3">
          <Thumbnail className="h-12 w-12" file={item} />
          <FileLink path={item.path} preview={item.mediatype !== MediaType.FOLDER}>
            <div>
              <p>{name}</p>
              {parentPath !== '.' && (
                <p className="text-xs text-gray-600 dark:text-zinc-400">{parentPath}</p>
              )}
            </div>
          </FileLink>
        </div>
        <div className="ml-2 flex items-center space-x-4">
          <CopyToClipboardButton
            className="show-on-hover-target"
            text={sharedLink}
            disabled={sharedLink == null}
          />
          <div className="flex items-center">
            <Button
              variant="text"
              icon={<icons.MoreOutlined className="w-4 h-4" />}
              onClick={() => openCopyLinkDialog(item)}
            />
          </div>
        </div>
      </div>

      <div className="ml-6 flex items-center text-left space-x-4 md:w-2/5 lg:w-1/4">
        <div className="w-48">
          <TimeAgo mtime={sharedAt} />
        </div>
      </div>
    </div>
  );
}

SharedLinkListItem.propTypes = {
  fileId: PropTypes.string.isRequired,
};

export default SharedLinkListItem;
