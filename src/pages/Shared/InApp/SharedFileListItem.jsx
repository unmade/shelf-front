import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectGetCurrentAccountResult } from '../../../store/accounts';
import { selectSharedFileById } from '../../../store/sharing';

import { MediaType } from '../../../constants';

import FileIcon from '../../../components/FileIcon';
import FileLink from '../../../components/FileLink';

function SharedFileListItem({ fileId }) {
  const { t } = useTranslation('sharedInApp');

  const account = useSelector(selectGetCurrentAccountResult);
  const item = useSelector((state) => selectSharedFileById(state, fileId));
  const { name, path, mediatype } = item;

  return (
    <div className="group even:ring-gray-50 even:bg-gray-50 even:dark:bg-zinc-700/30 px-12 h-[72px] flex items-center w-full rounded-xl">
      {/* file icon and name */}
      <div className="md:w-3/5 lg:w-2/3 flex items-center space-x-3 text-gray-900 dark:text-zinc-100 w-full">
        <FileIcon className="h-12 w-12" mediatype={mediatype} shared />
        <FileLink path={item.path} preview={item.mediatype !== MediaType.FOLDER}>
          <div>
            <p>{name}</p>
            <p className="text-xs text-gray-600 dark:text-zinc-400">{path}</p>
          </div>
        </FileLink>
      </div>

      <div className="flex items-center text-center space-x-4 md:w-2/5 lg:w-1/3">
        {/* members */}
        <div className="w-36 flex items-center justify-end -space-x-2 text-right text-gray-600 dark:text-zinc-300">
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
        <div className="w-28 text-right">
          <div className="text-gray-600 dark:text-zinc-300">@{item.owner.username}</div>
        </div>
      </div>
    </div>
  );
}

SharedFileListItem.propTypes = {
  fileId: PropTypes.string.isRequired,
};

export default SharedFileListItem;
