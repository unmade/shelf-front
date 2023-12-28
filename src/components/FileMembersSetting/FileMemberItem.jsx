import React from 'react';
import PropTypes from 'prop-types';

import { useListFileMembersQuery } from '../../store/sharing';

import Avatar from '../ui/Avatar';

import FileMemberAccessLevel from './FileMemberAccessLevel';

function FileMemberItem({ fileId, memberId }) {
  const { member } = useListFileMembersQuery(fileId, {
    selectFromResult: ({ data }) => ({ member: data.entities[memberId] }),
  });
  const { display_name: displayName } = member;

  return (
    <div className="py-3 flex items-center justify-between text-sm font-medium dark:text-zinc-200">
      <div className="flex items-center mr-2 min-w-0">
        <Avatar username={displayName} className="w-9 h-9 shrink-0" />
        <p className="ml-2 truncate">{displayName}</p>
      </div>
      <div>
        <FileMemberAccessLevel member={member} />
      </div>
    </div>
  );
}

FileMemberItem.propTypes = {
  fileId: PropTypes.string.isRequired,
  memberId: PropTypes.string.isRequired,
};

export default FileMemberItem;
