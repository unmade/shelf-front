import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('sharedLinkSetting');

  const item = useSelector((state) => selectFileSharedViaLinkById(state, fileId));
  const { name, path, token } = item;
  const sharedLink = useSharedLink({ token, filename: name });
  const parentPath = routes.parent(path);
  const createdAt = new Date(item.created_at).getTime();

  const { openDialog: openCopyLinkDialog } = useCopyLinkDialog();

  return (
    <div className="group/row flex h-[72px] w-full items-center rounded-xl px-12 even:bg-gray-50 even:ring-gray-50 even:dark:bg-zinc-700/30">
      {/* file icon and name */}
      <div className="flex w-full text-gray-900 dark:text-zinc-100 md:w-3/4">
        <div className="flex w-full min-w-0 items-center space-x-3">
          <Thumbnail className="h-12 w-12" file={item} />
          <span className="truncate">
            <FileLink path={item.mediatype === MediaType.FOLDER ? item.path : parentPath}>
              <div>
                <p className="truncate">{name}</p>
                {parentPath !== '.' && (
                  <p className="truncate text-xs text-gray-600 dark:text-zinc-400">{parentPath}</p>
                )}
              </div>
            </FileLink>
          </span>
        </div>
        <div className="ml-2 flex items-center space-x-4">
          <div className="min-w-max">
            <CopyToClipboardButton
              className="hidden md:group-hover/row:flex"
              title={t('copyToClipboardBtn.title', { defaultValue: 'Copy to clipboard' })}
              value={sharedLink}
              disabled={sharedLink == null}
            >
              {t('copyToClipboardBtn.text', { defaultValue: 'Copy link' })}
            </CopyToClipboardButton>
          </div>
          <div className="flex items-center">
            <Button
              variant="text"
              icon={<icons.MoreOutlined className="h-4 w-4" />}
              onClick={() => openCopyLinkDialog(item)}
            />
          </div>
        </div>
      </div>

      <div className="ml-6 hidden items-center space-x-4 text-left md:flex md:w-1/4">
        <div className="w-48">
          <TimeAgo value={createdAt} />
        </div>
      </div>
    </div>
  );
}

SharedLinkListItem.propTypes = {
  fileId: PropTypes.string.isRequired,
};

export default SharedLinkListItem;
