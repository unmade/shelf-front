import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectGetCurrentAccountResult } from '../../../store/accounts';
import { selectSharedFileById } from '../../../store/sharing';

import { MediaType } from '../../../constants';
import * as icons from '../../../icons';
import * as routes from '../../../routes';

import Button from '../../../components/ui/Button';

import FileLink from '../../../components/FileLink';
import { useFileMembersDialog } from '../../../components/FileMembersDialogProvider';
import Thumbnail from '../../../components/Thumbnail';

function SharedFileListItem({ fileId }) {
  const { t } = useTranslation('sharedInApp');

  const account = useSelector(selectGetCurrentAccountResult);
  const item = useSelector((state) => selectSharedFileById(state, fileId));
  const { name, path } = item;
  const parentPath = routes.parent(path);

  const openFileMembersDialog = useFileMembersDialog();

  return (
    <div className="group even:ring-gray-50 even:bg-gray-50 even:dark:bg-zinc-700/30 px-12 h-[72px] flex items-center w-full rounded-xl">
      {/* file icon and name */}
      <div className=" flex text-gray-900 dark:text-zinc-100 w-full">
        <div className="flex w-full min-w-0 items-center space-x-3">
          <Thumbnail className="w-12 h-12" file={item} />
          <FileLink path={item.path} preview={item.mediatype !== MediaType.FOLDER}>
            <div>
              <p>{name}</p>
              {parentPath !== '.' && (
                <p className="text-xs text-gray-600 dark:text-zinc-400">{parentPath}</p>
              )}
            </div>
          </FileLink>
        </div>
        <div className="flex items-center">
          <Button
            variant="text"
            icon={<icons.MoreOutlined className="w-4 h-4" />}
            onClick={() => {
              openFileMembersDialog(fileId);
            }}
          />
        </div>
      </div>

      <div className="ml-6 hidden md:flex items-center space-x-4">
        {/* members */}
        <div className="w-32 flex items-center justify-start text-gray-600 dark:text-zinc-300">
          {!item.members?.length === 1 && item.members[0].username === account.username ? (
            <p>{t('colMembers.userIsTheOnlyMember', { defaultValue: 'Only you' })}</p>
          ) : (
            <p>
              {t('colMembers.membersCount', {
                defaultValue: '{{ count }} member(s)',
                count: item.members?.length ?? 0,
              })}
            </p>
          )}
        </div>

        {/* owner */}
        <div className="w-36">
          <div className="text-gray-600 truncate dark:text-zinc-300">
            @{item.owner != null && item.owner.username}
          </div>
        </div>
      </div>
    </div>
  );
}

SharedFileListItem.propTypes = {
  fileId: PropTypes.string.isRequired,
};

export default SharedFileListItem;
