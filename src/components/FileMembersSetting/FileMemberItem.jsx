import React from 'react';
import PropTypes from 'prop-types';

import { useListFileMembersQuery } from 'store/sharing';

import Avatar from 'components/ui/Avatar';

import FileMemberAccessLevel from './FileMemberAccessLevel';

function FileMemberItem({ fileId, memberId }) {
  const { member } = useListFileMembersQuery(fileId, {
    selectFromResult: ({ data }) => ({ member: data.entities[memberId] }),
  });
  const { display_name: displayName } = member;

  return (
    <div className="flex items-center justify-between py-3 text-sm font-medium dark:text-zinc-200">
      <div className="mr-2 flex min-w-0 items-center">
        <Avatar username={displayName} className="size-9" />
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
